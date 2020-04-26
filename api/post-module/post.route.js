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
const asyncHandler = require("../common/async.handler");
const responseHandler = require("../common/response.handler");
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

router.route("/create").post(
  validate(validation.createPost),
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    const post = await PostController.create(req.body);
    if (!post) {
      throw new Error("Something went wrong");
    }
    const response = {};
    response.statusCode = 200;
    response.message = "Success";
    response.data = post;
    return responseHandler(res, response);
  })
);

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

router.route("/update/:postId").put(
  validate(validation.updatePost),
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    const post = await PostController.update(req.params, req.body);
    if (!post) {
      throw new Error("Something went wrong !!");
    }
    const response = {};
    response.statusCode = 200;
    response.message = "Success";
    response.data = post;
    return responseHandler(res, response);
  })
);

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

router.route("/posts/:postId").get(
  validate(validation.getPost),
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    const post = await PostController.get(req.params);
    if (!post) {
      throw new Error("Something went wrong");
    }
    const response = {};
    response.statusCode = 200;
    response.message = "Success";
    response.data = post;
    return responseHandler(res, response);
  })
);

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

router.route("/delete/:postId").delete(
  validate(validation.deletePost),
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    const post = await PostController.delete(req.body);
    if (!post) {
      throw new Error("Something went wrong");
    }
    const response = {};
    response.statusCode = 200;
    response.message = "Success";
    response.data = post;
    return responseHandler(res, response);
  })
);

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

router.route("/posts").get(
  validate(validation.getPostList),
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    const posts = await PostController.getList(req.body);
    if (!posts) {
      throw new Error("Something went wrong");
    }
    const response = {};
    response.statusCode = 200;
    response.message = "Success";
    response.data = {
      postList: posts,
    };
    return responseHandler(res, response);
  })
);

module.exports = router;
