require('dotenv').config();
const jwt = require('jsonwebtoken');
const ErrorS = require('../errors/ErrorS');

// const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  // достаём авторизационный заголовок
  // const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    throw new ErrorS('Необходима авторизация', 401);
  }
  // извлечём токен
  const token = req.headers.authorization.replace('Bearer ', '');
  // верифицируем токен
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new ErrorS('Необходима авторизация', 401);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = { auth };
