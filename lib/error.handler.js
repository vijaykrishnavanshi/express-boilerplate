const logger = require("../utils/logger");
const uuidv1 = require("uuid/v1");

// eslint-disable-next-line
function handleError(error, req, res, next) {
  const requestId = uuidv1();
  logger.error(requestId, error.message);

  const responseData = {
    success: false,
    message: error.message,
    requestId: requestId,
  };
  if (error.code) {
    res.status(error.code);
  } else {
    responseData.message = `Something went wrong! ${requestId}`;
    res.status(500);
  }
  return res.json(responseData);
}

module.exports = handleError;
