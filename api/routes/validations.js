"use strict";

/*
 * This file contains code for validation of request params 
*/

const Joi = require("joi");

const checkGet = {
  query: {
    status: Joi.boolean().required()
  }
};

const checkPost = {
  body: {
    phoneNo: Joi.boolean().required(),
    status: Joi.boolean().required()
  }
};

module.exports = {
  checkGet,
  checkPost
};
