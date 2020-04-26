function handleResponse(res, { statusCode, data, message }) {
  const response = {
    success: true,
    message: message,
    data: data,
  };
  return res.status(statusCode).json(response);
}

module.exports = handleResponse;
