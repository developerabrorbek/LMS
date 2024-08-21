export const ErrorHandlerMiddleware = (err, _, res, __) => {
  if (err.isException) {
    return res.status(err.statusCode).send({
      name: err.name,
      message: err.message,
    });
  }

  console.log(err)

  res.status(500).send({
    message: "Internal Server Error",
  });
};
