const User = require('../models/user');
// const bcrypt = require('bcryptjs');

const ERROR_CODE_500 = 500;
const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const OK_CODE_200 = 200;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные _id' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
    });
};

/* const createUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => User.create({
        email: req.body.email,
        password: hash,
      }))
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send(err));
  }; */

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.status(OK_CODE_200).send({ data: user });
      }
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь с указанным _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.status(OK_CODE_200).send({ data: user });
      }
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь с указанным _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
