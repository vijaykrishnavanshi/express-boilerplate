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
  allowUnknownCookies: false
};

const signup = {
  options: strictChecking,
  body: {
    email: Joi.string()
      .lowercase()
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
      .required(),
    name: Joi.string().optional(),
    address: Joi.string().optional()
  }
};

const login = {
  options: strictChecking,
  body: {
    email: Joi.string()
      .lowercase()
      .required(),
    password: Joi.string().required()
  }
};

const getProfile = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required()
  }
};

const updateProfile = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required()
  },
  body: {
    name: Joi.string().optional(),
    address: Joi.string().optional()
  }
};

const forgotPassword = {
  options: strictChecking,
  body: {
    email: Joi.string()
      .email()
      .lowercase()
      .required()
  }
};

const verifyToken = {
  options: strictChecking,
  body: {
    token: Joi.string().required()
  }
};

const changePassword = {
  options: strictChecking,
  body: {
    token: Joi.string().required(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
      .required()
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
  forgotPassword,
  verifyToken,
  changePassword
};
