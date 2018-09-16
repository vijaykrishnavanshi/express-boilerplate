/*
 *
 * This file will have all the user management related functions
 * 
 */
const Post = require("./post");
const dotenv = require("dotenv");
const _post = {};

dotenv.config();

_post.create = function(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData.body || !payloadData.title) {
      reject(new Error("Please pass body and title."));
    } else {
      // Hash Password
      const post = new Post(payloadData);
      post
        .save()
        .then(postSaved => {
          resolve(postSaved);
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

_post.update = function(params, payloadData) {
  return new Promise((resolve, reject) => {
    if (!params.postId) {
      reject(new Error("Please pass id for updating the post."));
    } else {
      // Hash Password
      const criteria = {
        _id: params.postId
      };
      const projection = {};
      const option = {};
      Post.findOne(criteria, projection, option)
        .exec()
        .then(post => {
          post.title = payloadData.title || post.title || "";
          post.body = payloadData.body || post.body || "";
          return post.save();
        })
        .then(postSaved => {
          postSaved = postSaved.toObject();
          resolve(postSaved);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

_post.get = function(params) {
  return new Promise((resolve, reject) => {
    if (!params.postId) {
      reject(new Error("Please pass id for getting the post."));
    } else {
      // Hash Password
      const criteria = {
        _id: params.postId
      };
      const projection = {
        title: 1,
        body: 1
      };
      const option = {
        lean: true
      };
      Post.findOne(criteria, projection, option)
        .exec()
        .then(postFetched => {
          resolve(postFetched);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

_post.delete = function(params) {
  return new Promise((resolve, reject) => {
    if (!params.postId) {
      reject(new Error("Please pass id for deleting the post."));
    } else {
      const criteria = {
        _id: params.postId
      };
      Post.findOneAndRemove(criteria)
        .exec()
        .then(postFetched => {
          resolve(postFetched);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

_post.getList = function() {
  return new Promise((resolve, reject) => {
    const criteria = {};
    const projection = {};
    const option = {};
    Post.find(criteria, projection, option)
      .exec()
      .then(postFetched => {
        resolve(postFetched);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = _post;
