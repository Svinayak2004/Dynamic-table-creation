const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;

    const field = err.keyValue
      ? Object.keys(err.keyValue)[0]
      : "field";

    message = `${field} already exists in this table`;
  }

  // Validation Error
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;