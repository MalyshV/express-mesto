/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const NotExistError = require('../errors/not-exist-err'); // 401

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotExistError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new NotExistError('Ошибка авторизации'));
  }

  req.user = payload;
  next();
};
