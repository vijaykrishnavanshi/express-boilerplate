"use strict";

/*
 * This file imports all the required controllers
 */

const express = require("express");
const app = express();

const DummyRoute = require("./dummyRoute");

app.use(DummyRoute);

module.exports = app;
