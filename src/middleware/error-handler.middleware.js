export const ErrorHandlerMiddleware = (err, _, res, __) => {
  if (err.isException) {
    return res.status(err.statusCode).send({
      name: err.name,
      message: err.message,
    });
  }


  res.status(500).send({
    message: "Internal Server Error",
  });
};
