import ErrorResponse from "../helpers/ErrorResponse.js";

export default function (err, req, res, next) {
  let error = { ...err };

  error.message = err.message;

  // winston.log('error', err.message);
  console.log(err.message.red);

  /* === Logging level ===
   *  error
   *  warn
   *  info
   *  verbose
   *  debug
   *  silly
   * */

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found!`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    // Constructed the Duplicate message
    const duplicates = Object.entries(err.keyValue).map(([id, value]) => ({ id, value }));
    let message = "Resource with ";
    duplicates.forEach(duplicate => {
      message += `${duplicate.id}: ${duplicate.value}, `;
    })
    message += `already exists. `;
    error = new ErrorResponse(message, 409);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .send({ success: false, error: error.message || "Server Error" });
};
