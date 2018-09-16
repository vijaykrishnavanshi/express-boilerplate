"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  body: { type: String, required: true, default: "" },

  // system generated
  authoredBy: { type: Schema.ObjectId, default: null },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);
