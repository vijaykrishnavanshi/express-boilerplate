"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  address: { type: String, default: "" },

  resetToken: { type: String, default: "" },

  // system generated
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
