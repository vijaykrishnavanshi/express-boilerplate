"use strict";

/*
 * This file contails all the routes that are related to 
 * auth of the user. 
*/
const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const validation = require("./user.validation");
const UserController = require("./user.controller");
const { logger } = require("../../utils");
const auth = require("../../lib/auth");
const asyncHandler = require("../common/async.handler");
const responseHandler = require("../common/response.handler");

/**
 * @api {post} /signup Signup [POST]
 * @apiGroup Authentication
 * @apiDescription This api is used by signup the user using email.
 * @apiParam {String} email Email Id of the user.
 * @apiParam {String} password Password.
 * @apiParam {String} name Name of the user.
 * @apiParam {String} address Address of the user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Enjoy your token !!",
 *        "data": {
 *          "token": "JWT Token",
 *          "id": "User Id",
 *        }
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to signup.
 *     {
 *        "success": "false",
 *        "message": "Unable to signup",
 *        "data": {}
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *        "success": "false",
 *        "message": "Something went wrong",
 *        "data": {}
 *     }
 */

router.route("/signup").post(
  validate(validation.signup),
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    const userData = await UserController.signup(req.body);
    const response = {};
    response.statusCode = 201;
    response.data = userData;
    return responseHandler(res, response);
  })
);

/**
 * @api {post} /login Login [POST]
 * @apiGroup Authentication
 * @apiDescription This api is used by login the user using email and password.
 * @apiParam {String} email Email Id of the user.
 * @apiParam {String} password Password.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "message": "Enjoy your token !!",
 *        "data": {
 *          "token": "JWT Token",
 *          "id": "User Id",
 *        }
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to login.
 *     {
 *       "success": "false",
 *       "message": "Unable to login",
 *       "data": {}
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *       "data": {}
 *     }
 */

router.route("/login").post(
  validate(validation.login),
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    const data = await UserController.login(req.body);
    const response = {};
    response.statusCode = 200;
    response.data = data;
    return responseHandler(res, response);
  })
);

/**
 * @api {get} /profile Profile [GET]
 * @apiGroup Profile
 * @apiDescription This api is used by get the details of the logged in user.
 * @apiHeader {String} authorization Users JWT Token.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Success",
 *        "data": {
 *          "email": String,
 *          "address": String
 *        }
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to get user.
 *     {
 *       "success": "false",
 *       "message": "Unable to get user",
 *       "data": {}
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *       "data": {}
 *     }
 */
router
  .route("/profile")
  .get(validate(validation.getProfile), auth.common, (req, res) => {
    const response = {
      success: false,
      message: "",
      data: {}
    };
    // send only the data that is required by the controller
    UserController.getProfile(req.user)
      .then(userData => {
        if (!userData) {
          response.success = false;
          response.message = "Something went wrong";
          return res.status(500).json(response);
        } else {
          response.success = true;
          response.message = "Success";
          response.data = userData;
          return res.status(201).json(response);
        }
      })
      .catch(error => {
        logger.error(error);
        response.success = false;
        response.message = error.message;
        return res.status(403).json(response);
      });
  })
  /**
   * @api {post} /profile Profile [POST]
   * @apiGroup Profile
   * @apiDescription This api is used by update the details of the logged in user.
   * @apiHeader {String} authorization Users JWT Token.
   * @apiParam {String} address (optional) Address of the user.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 OK
   *     {
   *        "success": "true",
   *        "message": "Success",
   *        "data": {}
   *     }
   *
   * @apiErrorExample Error-Response 403:
   *     HTTP/1.1 403 Unable to get user.
   *     {
   *       "success": "false",
   *       "message": "Unable to get user",
   *       "data": {}
   *     }
   *
   * @apiErrorExample Error-Response 500:
   *     HTTP/1.1 500 Error on server side.
   *     {
   *       "success": "false",
   *       "message": "Something went wrong",
   *       "data": {}
   *     }
   */

  .post(validate(validation.updateProfile), auth.common, (req, res) => {
    const response = {
      success: false,
      message: "",
      data: {}
    };
    // send only the data that is required by the controller
    logger.info(req.body);
    UserController.updateProfile(req.user, req.body)
      .then(userData => {
        if (!userData) {
          response.success = false;
          response.message = "Something went wrong";
          return res.status(500).json(response);
        } else {
          response.success = true;
          response.message = "Success";
          response.data = userData;
          return res.status(201).json(response);
        }
      })
      .catch(error => {
        logger.error(error);
        response.success = false;
        response.message = error.message;
        return res.status(403).json(response);
      });
  });

/**
 * @api {get} /forgot-password ForgotPassword [GET]
 * @apiGroup Recovery
 * @apiDescription This api is used to reset password of the user using email.
 * @apiParam {String} email Email Id of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Success",
 *        "data": {}
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to reset password.
 *     {
 *       "success": "false",
 *       "message": "Unable to reset password",
 *       "data": {}
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *       "data": {}
 *     }
 */

router
  .route("/forgot-password")
  .post(validate(validation.forgotPassword), (req, res) => {
    const response = {
      success: false,
      message: "",
      data: {}
    };
    // send only the data that is required by the controller
    logger.info(req.query);
    UserController.forgotPassword(req.query)
      .then(userData => {
        if (!userData) {
          response.success = false;
          response.message = "Something went wrong !!";
          return res.status(500).json(response);
        } else {
          response.success = true;
          response.message = "Success";
          response.data = userData;
          return res.status(201).json(response);
        }
      })
      .catch(error => {
        logger.error(error);
        response.success = false;
        response.message = error.message;
        return res.status(403).json(response);
      });
  });
/**
 * @api {post} /verify-token VerifyToken [POST]
 * @apiGroup Recovery
 * @apiDescription This api is used by the frontend to verify the recieved user token.
 * @apiParam {String} token Token recieved by the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Success",
 *        "data": {
 *          "email": "String",
 *          "name": "String",
 *          "token": "String"
 *        }
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Token not verified.
 *     {
 *       "success": "false",
 *       "message": "Token not verified",
 *       "data": {}
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *       "data": {}
 *     }
 */
router
  .route("/verify-token")
  .post(validate(validation.verifyToken), (req, res) => {
    const response = {
      success: false,
      message: "",
      data: {}
    };
    // send only the data that is required by the controller
    logger.info(req.body);
    UserController.verifyToken(req.body)
      .then(userData => {
        if (!userData) {
          response.success = false;
          response.message = "Something went wrong !!";
          return res.status(500).json(response);
        } else {
          response.success = true;
          response.message = "Success";
          response.data = userData;
          return res.status(201).json(response);
        }
      })
      .catch(error => {
        logger.error(error);
        response.success = false;
        response.message = error.message;
        return res.status(403).json(response);
      });
  });

/**
 * @api {post} /change-password ChangePassword [POST]
 * @apiGroup Recovery
 * @apiDescription This api is used by the frontend to change the password of the user using the token and password.
 * @apiParam {String} token Token recieved by the user.
 * @apiParam {String} password Password set by the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Success"
 *        "data": {}
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to change password.
 *     {
 *       "success": "false",
 *       "message": "Unable to change password",
 *       "data": {}
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *       "data": {}
 *     }
 */
router
  .route("/change-password")
  .post(validate(validation.changePassword), (req, res) => {
    const response = {
      success: false,
      message: "",
      data: {}
    };
    // send only the data that is required by the controller
    logger.info(req.body);
    UserController.changePassword(req.body)
      .then(userData => {
        if (!userData) {
          response.success = false;
          response.message = "Something went wrong !!";
          return res.status(500).json(response);
        } else {
          response.success = true;
          response.message = "Success";
          response.data = userData;
          return res.status(201).json(response);
        }
      })
      .catch(err => {
        logger.error(err);
        response.success = false;
        response.message = err.message;
        return res.status(403).json(response);
      });
  });

module.exports = router;
