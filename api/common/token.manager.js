const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const _tokenManager = {};

_tokenManager.signToken = async function signToken(data) {
  // Assign jwt token
  const secret = process.env.SECRET || "Development";
  const token = jwt.sign(data, secret, {
    expiresIn: process.env.TIME_TO_EXPIRE || "15m", // expires in 15 minutes
  });
  if (!token) {
    throw new Error("Unable to sign token !!");
  }
  return token;
};

_tokenManager.signOTPToken = async function signOTPToken(data) {
  // Assign jwt token
  const secret = process.env.SECRET || "Development";
  const token = jwt.sign(data, secret, {
    expiresIn: "15m", // expires in 15 minutes
  });
  if (!token) {
    throw new Error("Unable to sign token !!");
  }
  return token;
};

_tokenManager.verifyToken = async function verifyToken(token) {
  // Assign jwt token
  const secret = process.env.SECRET || "Development";
  return jwt.verify(token, secret);
};

module.exports = _tokenManager;
