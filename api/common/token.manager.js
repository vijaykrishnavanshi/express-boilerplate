const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const _tokenManager = {};

_tokenManager.signToken = function signToken(data) {
  return new Promise((resolve, reject) => {
    // Assign jwt token
    const secret = process.env.SECRET || "Development";
    const token = jwt.sign(data, secret, {
      expiresIn: process.env.TIME_TO_EXPIRE || "15m" // expires in 15 minutes
    });
    if (!token) {
      reject(new Error("Unable to sign token !!"));
    } else {
      resolve(token);
    }
  });
};

_tokenManager.signOTPToken = function signOTPToken(data) {
  return new Promise((resolve, reject) => {
    // Assign jwt token
    const secret = process.env.SECRET || "Development";
    const token = jwt.sign(data, secret, {
      expiresIn: "15m" // expires in 15 minutes
    });
    if (!token) {
      reject(new Error("Unable to sign token !!"));
    } else {
      resolve(token);
    }
  });
};

_tokenManager.verifyToken = function verifyToken(token) {
  return new Promise((resolve, reject) => {
    // Assign jwt token
    const secret = process.env.SECRET || "Development";
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = _tokenManager;
