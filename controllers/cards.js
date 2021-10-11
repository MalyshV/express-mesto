const Card = require('../models/card');

const ERROR_CODE_500 = 500;
const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { userId } = req.params;

  Card.findByIdAndRemove(userId)
    .then((card) => res.send({ data: card }))
    .catch(() => {
      res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для снятии лайка' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};
