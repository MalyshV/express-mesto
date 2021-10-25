const Card = require('../models/card');
const ServerError = require('../errors/server-err'); // 500
const BadRequestError = require('../errors/bad-request-err'); // 400
const NotFoundError = require('../errors/not-found-err'); // 404
const NotAllowedError = require('../errors/not-allowed-err'); // 403

const OK_CODE_200 = 200;

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK_CODE_200).send({ data: cards }))
    .catch(() => {
      next(new ServerError('Ошибка сервера'));
    });
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CODE_200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotFoundError('Переданы некорректные данные при создании карточки');
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (card) {
        if (card.owner._id.toString() !== req.user._id) {
          throw new NotAllowedError('Вы можете удалять только свои карточки');
        }

        Card.findByIdAndDelete(cardId)
          .then((data) => {
            res.send(data);
          });
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

const likeCard = (req, res, next) => {
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
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

const dislikeCard = (req, res, next) => {
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
        next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      }
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
