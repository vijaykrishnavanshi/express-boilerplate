"use strict";

/*
 * This file contails all the routes that are related to 
 * auth of the user. 
*/
const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const validation = require("./post.validation");
const PostController = require("./post.controller");
const { logger } = require("../../utils");

/**
 * @api {post} /create Create [POST]
 * @apiGroup Post
 * @apiDescription This api is to create post by the user.
 * @apiParam {String} title Title of the post.
 * @apiParam {String} body Body of the post.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Created",
 *        "data": {
 *          "title": "<title>",
 *          "body": "<body>",
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

router.route("/create").post(validate(validation.createPost), (req, res) => {
  // send only the data that is required by the controller
  const response = {
    success: false,
    message: "",
    data: {}
  };
  logger.info(req.body);
  PostController.create(req.body)
    .then(post => {
      if (!post) {
        response.success = false;
        response.message = "Something went wrong";
        return res.status(500).json(response);
      } else {
        response.success = true;
        response.message = "Success";
        response.data = post;
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

/**
 * @api {put} /update/<postId> Update [PUT]
 * @apiGroup Post
 * @apiDescription This api is to update post by the user.
 * @apiParam {String} postId ID of the post.
 * @apiParam {String} title Title of the post.
 * @apiParam {String} body Body of the post.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Created",
 *        "data": {
 *          "title": "<title>",
 *          "body": "<body>",
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

router
  .route("/update/:postId")
  .put(validate(validation.updatePost), (req, res) => {
    // send only the data that is required by the controller
    const response = {
      success: false,
      message: "",
      data: {}
    };
    PostController.update(req.params, req.body)
      .then(post => {
        if (!post) {
          response.success = false;
          response.message = "Something went wrong";
          return res.status(500).json(response);
        } else {
          response.success = true;
          response.message = "Success";
          response.data = post;
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

/**
 * @api {get} /posts/<postId> Get One Post [GET]
 * @apiGroup Post
 * @apiDescription This api is to get single post by the user.
 * @apiParam {String} postId ID of the post.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Created",
 *        "data": {
 *          "title": "<title>",
 *          "body": "<body>",
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

router.route("/posts/:postId").get(validate(validation.getPost), (req, res) => {
  // send only the data that is required by the controller
  const response = {
    success: false,
    message: "",
    data: {}
  };
  PostController.get(req.params)
    .then(post => {
      if (!post) {
        response.success = false;
        response.message = "Something went wrong";
        return res.status(500).json(response);
      } else {
        response.success = true;
        response.message = "Success";
        response.data = post;
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

/**
 * @api {delete} /delete/<postId> Delete Post [DELETE]
 * @apiGroup Post
 * @apiDescription This api is to update post by the user.
 * @apiParam {String} postId ID of the post.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Created",
 *        "data": {
 *          "status": "true"
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

router
  .route("/delete/:postId")
  .delete(validate(validation.deletePost), (req, res) => {
    // send only the data that is required by the controller
    const response = {
      success: false,
      message: "",
      data: {}
    };
    logger.info(req.body);
    PostController.delete(req.body)
      .then(post => {
        if (!post) {
          response.success = false;
          response.message = "Something went wrong";
          return res.status(500).json(response);
        } else {
          response.success = true;
          response.message = "Success";
          response.data = post;
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

/**
 * @api {get} /posts Get Multiple Posts [GET]
 * @apiGroup Post
 * @apiDescription This api is to get multiple posts.
 * @apiParam {String} postId ID of the post.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Created",
 *        "data": {
 *          postList: [{
 *            "postId": "<postId>",
 *            "title": "<title>",
 *            "body": "<body>"
 *          }]
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

router.route("/posts").get(validate(validation.getPostList), (req, res) => {
  // send only the data that is required by the controller
  const response = {
    success: false,
    message: "",
    data: {}
  };
  logger.info(req.body);
  PostController.getList(req.body)
    .then(post => {
      if (!post) {
        response.success = false;
        response.message = "Something went wrong";
        return res.status(500).json(response);
      } else {
        response.success = true;
        response.message = "Success";
        response.data = {
          postList: post
        };
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
