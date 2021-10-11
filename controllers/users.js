const User = require('../models/user');

const ERROR_CODE_500 = 500;
const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const OK_CODE_200 = 200;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' }));
};

module.exports.getUser = (req, res) => {
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

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.status(OK_CODE_200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateProfile = (req, res) => {
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

module.exports.updateAvatar = (req, res) => {
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
