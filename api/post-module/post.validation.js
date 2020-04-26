"use strict";

/*
 * This file contains code for validation of request params
 */

const Joi = require("joi");

const strictChecking = {
  allowUnknownBody: false,
  allowUnknownHeaders: true,
  allowUnknownQuery: false,
  allowUnknownParams: false,
  allowUnknownCookies: false,
};

const createPost = {
  options: strictChecking,
  body: {
    title: Joi.string().required(),
    body: Joi.string().required(),
  },
};

const updatePost = {
  options: strictChecking,
  params: {
    postId: Joi.string().required(),
  },
  body: {
    title: Joi.string().required(),
    body: Joi.string().required(),
  },
};

const getPost = {
  options: strictChecking,
  params: {
    postId: Joi.string().required(),
  },
};

const deletePost = {
  options: strictChecking,
  params: {
    postId: Joi.string().required(),
  },
};

const getPostList = {
  options: strictChecking,
  query: {},
};

module.exports = {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getPostList,
};
