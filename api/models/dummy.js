"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DummySchema = new Schema({
  phoneNo: { type: String },
  status: { type: String },
  // system generated
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Dummy", DummySchema);
