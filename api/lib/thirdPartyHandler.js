const { logger } = require("../../utils");
const request = require("request-promise-native");
const _thirdParty = {};

_thirdParty.dummyService = function dummyService(token, phoneNo) {
  return new Promise((resolve, reject) => {
    const options = {
      uri: process.env.NOTIFY_SERVICE || "http://localhost:3001/",
      method: "GET",
      qs: {
        token: token, // -> uri + '?access_token=xxxxx%20xxxxx'
        phoneNo: phoneNo
      },
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true // Automatically parses the JSON string in the response
    };
    request(options)
      .then(function(response) {
        logger.info(response);
        resolve(response);
      })
      .catch(function(err) {
        logger.info(err);
        reject(err);
      });
  });
};

module.exports = _thirdParty;
