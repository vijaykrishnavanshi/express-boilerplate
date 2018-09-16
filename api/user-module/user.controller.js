/*
 *
 * This file will have all the user management related functions
 * 
 */
const User = require("./user");
const utils = require("../../utils");
const TokenManager = require("../common/token.manager");
const dotenv = require("dotenv");
const crypto = require("crypto");
const _user = {};

dotenv.config();

_user.signup = function(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData.email || !payloadData.password) {
      reject(new Error("Please pass username and password."));
    } else {
      // Hash Password
      var data = {};
      payloadData.password = utils.helpers.hash(payloadData.password);
      const user = new User(payloadData);
      user
        .save()
        .then(user => {
          if (!user) {
            reject(new Error("User not created !!"));
          } else {
            // Assign jwt token
            data["id"] = user._id.toString();
            data["email"] = user.email;
            data["name"] = user.name;
            return TokenManager.signToken(data);
          }
        })
        .then(token => {
          data["token"] = token;
          resolve({
            token: token,
            id: data["id"]
          });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

_user.login = function(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData.email || !payloadData.password) {
      reject(new Error("Please send email and password."));
    } else {
      // Hash Password
      const data = {};
      payloadData.password = utils.helpers.hash(payloadData.password);
      const criteria = {
        email: payloadData.email,
        password: payloadData.password
      };
      const projection = {
        password: 0
      };
      const option = {
        lean: true
      };
      User.findOne(criteria, projection, option)
        .then(user => {
          if (!user) {
            return reject(new Error("Email or Password not matched !!"));
          }
          data["id"] = user._id.toString();
          data["email"] = user.email;
          data["name"] = user.name;
          return TokenManager.signToken(data);
        })
        .then(token => {
          // return the information including token as JSON
          resolve({
            token: token,
            id: data["id"]
          });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

// Get Particular User Profile
_user.getProfile = function(userData) {
  return new Promise((resolve, reject) => {
    const criteria = {
      _id: userData._id
    };
    const projection = {
      _id: 0,
      password: 0,
      created: 0
    };
    const option = {
      lean: true
    };
    User.findOne(criteria, projection, option)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// Get Particular User Profile
_user.updateProfile = function updateProfile(userData, payloadData) {
  return new Promise((resolve, reject) => {
    const criteria = {
      _id: userData._id
    };
    const projection = {
      password: 0
    };
    const option = {};
    User.findOne(criteria, projection, option)
      .then(user => {
        user.name = payloadData.name || user.name || "";
        user.address = payloadData.address || user.address || "";
        return user.save();
      })
      .then(data => {
        data = data.toObject();
        if (data.password) delete data.password;
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//Forgot Password
_user.forgotPassword = function(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData || !payloadData.email) {
      reject(new Error("Please enter the email address"));
    } else {
      const criteria = {
        email: payloadData.email
      };
      const projection = {};
      const option = {};
      User.findOne(criteria, projection, option)
        .then(data => {
          if (!data) {
            throw new Error("No user found");
          } else {
            const buffer = crypto.randomBytes(20);
            data.resetToken = buffer.toString("hex");
            return data.save().then(data => {
              const userData = {
                name: data.name,
                email: data.email,
                resetToken: data.resetToken
              };
              return userData;
            });
          }
        })
        .then(userData => {
          return TokenManager.signToken(userData);
        })
        .then(token => {
          resolve({
            success: true,
            token: token
          });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

_user.verifyToken = function(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData || !payloadData.token) {
      reject(new Error("Please enter the token"));
    } else {
      TokenManager.verifyToken(payloadData.token)
        .then(decodedData => {
          const criteria = {
            email: decodedData.email,
            resetToken: decodedData.resetToken
          };
          const projection = {
            email: 1,
            name: 1,
            resetToken: 1
          };
          const option = {
            lean: true
          };
          return User.findOne(criteria, projection, option);
        })
        .then(data => {
          if (!data) {
            throw new Error("No User Found");
          } else {
            const dataToSend = {
              name: data.name || "",
              email: data.email || "",
              token: payloadData.token
            };
            return dataToSend;
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

// Change Password of the User
_user.changePassword = function changePassword(payloadData) {
  return new Promise((resolve, reject) => {
    TokenManager.verifyToken(payloadData.token)
      .then(decodedData => {
        const criteria = {
          email: decodedData.email,
          resetToken: decodedData.resetToken
        };
        const projection = {
          email: 1,
          name: 1,
          resetToken: 1,
          password: 1
        };
        const option = {};
        return User.findOne(criteria, projection, option);
      })
      .then(data => {
        if (!data) {
          reject(new Error("User Not Found"));
        } else {
          data.resetToken = "";
          data.password = utils.helpers.hash(payloadData.password);
          return data.save();
        }
      })
      .then(() => {
        resolve({ status: "Successfully changed password !!" });
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = _user;
