"use strict";

/*
 * This file imports all the required controllers
 */

const express = require("express");
const app = express();

const UserRoute = require("./user-module/user.route");
const PostRoute = require("./post-module/post.route");

app.use(UserRoute);
app.use(PostRoute);

module.exports = app;
