
// централизованный обработчик ошибок
const CentralizedErrorHandler = (err, req, res, next) => {
  const message = err.message;
  let statusCode = 500
  if (err.statusCode)
    statusCode = err.statusCode
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'Internal error'
        : message,
    });
  next();
};

module.exports = CentralizedErrorHandler;
