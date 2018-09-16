const dotenv = require("dotenv");
dotenv.config();

// load up the user model
var TokenManager = require("../api/common/token.manager");
var User = require("../api/user-module/user");

const getToken = function(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    // Handle token presented as URI param
    return req.query.token;
  } else if (req.cookies && req.cookies.token) {
    // Handle token presented as a cookie parameter
    return req.cookies.token;
  }
  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized)
  // to the client for this request
  return null;
};

const _auth = {};

_auth.common = function(req, res, next) {
  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorised access",
      data: {}
    });
  } else {
    TokenManager.verifyToken(token)
      .then(decoded => {
        const criteria = {
          _id: decoded.id
        };
        const projection = {
          password: 0
        };
        const option = {
          lean: true
        };
        return User.findOne(criteria, projection, option);
      })
      .then(user => {
        if (!user) {
          throw new Error("No User Found");
        } else {
          user.token = token;
          req.user = user;
          next();
        }
      })
      .catch(error => {
        res.status(401).json({
          success: false,
          message: error.message,
          data: {}
        });
      });
  }
};

module.exports = _auth;
