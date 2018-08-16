"use strict";

/*
 * This file will have all business logic related functions
 */
const dotenv = require("dotenv");
dotenv.config();

const Dummy = require("../models/dummy");
const { logger } = require("../../utils");

const _dummy = {};

// This controller gets the data from the database.
_dummy.get = function(queryData) {
  return new Promise((resolve, reject) => {
    const criteria = {
      status: queryData.status
    };
    const projection = {};
    const option = {
      lean: true
    };
    Dummy.find(criteria, projection, option)
      .then(dummy => {
        if (dummy) {
          return dummy;
        } else {
          throw new Error("Data not found");
        }
      })
      .then(data => {
        data = data.toObject();
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// This controller posts the data to the database.
_dummy.post = function(payloadData) {
  return new Promise((resolve, reject) => {
    logger.info(payloadData);
    const dummy = new Dummy(payloadData);
    dummy
      .save()
      .then(dataSaved => {
        resolve(dataSaved);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = _dummy;
