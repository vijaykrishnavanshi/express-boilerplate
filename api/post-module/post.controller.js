/*
 *
 * This file will have all the user management related functions
 * 
 */
const Post = require("./post");
const dotenv = require("dotenv");
const _post = {};

dotenv.config();

_post.create = async function create(payloadData) {
  if (!payloadData.body || !payloadData.title) {
    throw new Error("Please pass body and title.");
  }
  // Hash Password
  const post = new Post(payloadData);
  const postSaved = await post.save();
  return postSaved.toObject();
};

_post.update = async function update({ postId }, { title, body }) {
  if (!postId) {
    throw new Error("Please pass id for updating the post.");
  }
  // Hash Password
  const criteria = {
    _id: postId
  };
  const projection = {};
  const option = {};
  const post = await Post.findOne(criteria, projection, option).exec();
  post.title = title || post.title || "";
  post.body = body || post.body || "";
  const postSaved = await post.save();
  return postSaved.toObject();
};

_post.get = async function get({ postId }) {
  if (!postId) {
    throw new Error("Please pass id for getting the post.");
  }
  // Hash Password
  const criteria = {
    _id: postId
  };
  const projection = {
    title: 1,
    body: 1
  };
  const option = {
    lean: true
  };
  const post = await Post.findOne(criteria, projection, option).exec();
  return post;
};

_post.delete = async ({ postId }) => {
  if (!postId) {
    throw new Error("Please pass id for deleting the post.");
  }
  const criteria = {
    _id: postId
  };
  return Post.findOneAndRemove(criteria).exec();
};

_post.getList = async () => {
  const criteria = {};
  const projection = {};
  const option = {
    lean: true
  };
  return Post.find(criteria, projection, option).exec();
};

module.exports = _post;
