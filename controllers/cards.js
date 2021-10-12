const Card = require('../models/card');

const ERROR_CODE_500 = 500;
const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const OK_CODE_200 = 200;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_CODE_200).send({ data: cards }))
    .catch(() => {
      res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

const postCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CODE_200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_404).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        res.status(OK_CODE_200).send({ data: card });
      } else {
        res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при удалении карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(OK_CODE_200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      if (err.message === 'NotValidId') {
        return res.status(ERROR_CODE_404).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(OK_CODE_200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      if (err.message === 'NotValidId') {
        return res.status(ERROR_CODE_404).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
