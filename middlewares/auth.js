/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const NotExistError = require('../errors/not-exist-err'); // 401

const { JWT_SECRET = 'dev-secret' } = process.env;

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotExistError('Ошибка авторизации');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new NotExistError('Ошибка авторизации'));
  }

  req.user = payload;
  next();
};
