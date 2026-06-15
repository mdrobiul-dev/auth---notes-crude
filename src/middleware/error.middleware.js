import AppError from "../errors/AppError.js";

const errorMiddlewares = (err, req, res, next) => {
  let error = err;

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    error = new AppError(
      `inavalid duplicate value : ${value} please enter another one`,
      400,
    );
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new AppError(message, 400);
  }

  if (err.name === "CastError") {
    error = new AppError(`invalid path : ${err.path} : ${err.value}`, 400);
  }

  console.log("ERROR", err);

  return res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorMiddlewares;
