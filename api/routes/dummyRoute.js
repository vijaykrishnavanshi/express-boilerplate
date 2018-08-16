"use strict";

/*
 * This file contails all the routes that are related to 
 * credit scoring of the user. 
*/
const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const validations = require("./validations");
const { DummyControllers } = require("../controllers");
const { logger } = require("../../utils");

router
  .get("/get", validate(validations.checkGet), (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.query);
    DummyControllers.get(req.query)
      .then(response => {
        logger.info(response);
        if (!response) {
          res.status(500).send("Something went wrong");
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(403).json(err);
      });
  })
  .post("/post", validate(validations.checkPost), (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    DummyControllers.post(req.body)
      .then(response => {
        logger.info(response);
        if (!response) {
          res.status(500).send("Something went wrong");
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(403).json(err);
      });
  });

module.exports = router;
