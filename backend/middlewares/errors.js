class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.Error || "Enternal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json web Token Is Invalied. Tray Again! `;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === "TokenExpiredError") {
    const message = `json Web Token Is Expired. Try to Login Again `;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === "CastError") {
    const message = `Invalid  ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors).map(error.message).join("")
    : err.message;
  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
export default ErrorHandler;
