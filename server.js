"use strict";

/*
 * This file handles the configuration of the server
*/

const dotenv = require("dotenv");
const app = require("./app"); // Recieved an express app instance
const logger = require("./utils/logger");

dotenv.config();

// Here you set the PORT and IP of the server
const port = process.env.PORT || 8001;
const ip = process.env.IP || "127.0.0.1";

app.listen(port, ip, function(error) {
  if (error) {
    logger.error("Unable to listen for connections", error);
    throw error;
  }
  logger.info(`Server on http://${ip}:${port}`);
});
