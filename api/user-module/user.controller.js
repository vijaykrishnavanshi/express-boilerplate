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

_user.signup = async function (payloadData) {
  if (!payloadData.email || !payloadData.password) {
    throw new Error("Please pass username and password.");
  }
  // Hash Password
  payloadData.password = utils.helpers.hash(payloadData.password);
  const user = new User(payloadData);
  const savedUser = await user.save();
  if (!savedUser) {
    throw new Error("User not created !!");
  }

  const data = {};
  // Assign jwt token
  data["id"] = savedUser._id.toString();
  data["email"] = user.email;
  data["name"] = user.name;
  const token = await TokenManager.signToken(data);

  return {
    token: token,
    id: savedUser.id,
  };
};

_user.login = async function (payloadData) {
  if (!payloadData.email || !payloadData.password) {
    throw new Error("Please send email and password.");
  }
  // Hash Password
  payloadData.password = utils.helpers.hash(payloadData.password);
  const criteria = {
    email: payloadData.email,
    password: payloadData.password,
  };
  const projection = {
    password: 0,
  };
  const option = {
    lean: true,
  };
  const user = await User.findOne(criteria, projection, option);
  if (!user) {
    throw new Error("Email or Password not matched !!");
  }
  const data = {};
  data["id"] = user._id.toString();
  data["email"] = user.email;
  data["name"] = user.name;
  const token = await TokenManager.signToken(data);
  // return the information including token as JSON
  return {
    token: token,
    id: user.id,
  };
};

// Get Particular User Profile
_user.getProfile = async function (userData) {
  if (!userData || !userData._id) {
    throw new Error("No User Found!");
  }
  const criteria = {
    _id: userData._id,
  };
  const projection = {
    _id: 0,
    password: 0,
    created: 0,
  };
  const option = {
    lean: true,
  };
  const user = await User.findOne(criteria, projection, option);
  return user;
};

// Get Particular User Profile
_user.updateProfile = async function updateProfile(userData, payloadData) {
  const criteria = {
    _id: userData._id,
  };
  const projection = {
    password: 0,
  };
  const option = {};
  const user = await User.findOne(criteria, projection, option);
  user.name = payloadData.name || user.name || "";
  user.address = payloadData.address || user.address || "";
  let savedUser = await user.save();
  savedUser = savedUser.toObject();
  if (savedUser.password) delete savedUser.password;
  return savedUser;
};

//Forgot Password
_user.forgotPassword = async function (payloadData) {
  if (!payloadData || !payloadData.email) {
    throw new Error("Please enter the email address");
  }
  const criteria = {
    email: payloadData.email,
  };
  const projection = {};
  const option = {};
  const user = await User.findOne(criteria, projection, option);
  if (!user) {
    throw new Error("No user found");
  }
  const buffer = crypto.randomBytes(20);
  user.resetToken = buffer.toString("hex");
  const userData = await user.save().then((data) => {
    return {
      name: data.name,
      email: data.email,
      resetToken: data.resetToken,
    };
  });
  const token = await TokenManager.signToken(userData);
  return {
    success: true,
    token: token,
  };
};

_user.verifyToken = async function (payloadData) {
  if (!payloadData || !payloadData.token) {
    throw new Error("Please enter the token");
  }
  const decodedData = await TokenManager.verifyToken(payloadData.token);
  const criteria = {
    email: decodedData.email,
    resetToken: decodedData.resetToken,
  };
  const projection = {
    email: 1,
    name: 1,
    resetToken: 1,
  };
  const option = {
    lean: true,
  };
  const user = await User.findOne(criteria, projection, option);
  if (!user) {
    throw new Error("No User Found");
  }
  const dataToSend = {
    name: user.name || "",
    email: user.email || "",
    token: payloadData.token,
  };
  return dataToSend;
};

// Change Password of the User
_user.changePassword = async function changePassword(payloadData) {
  const decodedData = await TokenManager.verifyToken(payloadData.token);
  const criteria = {
    email: decodedData.email,
    resetToken: decodedData.resetToken,
  };
  const projection = {
    email: 1,
    name: 1,
    resetToken: 1,
    password: 1,
  };
  const option = {};
  const user = await User.findOne(criteria, projection, option);
  if (!user) {
    throw new Error("User Not Found");
  }
  user.resetToken = "";
  user.password = utils.helpers.hash(payloadData.password);
  const savedUser = await savedUser.save();
  return savedUser.toObject();
};

module.exports = _user;
