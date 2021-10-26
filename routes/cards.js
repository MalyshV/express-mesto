const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
// const auth = require('../middlewares/auth');

const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex(), // cardId????????
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex(), // cardId????????
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex(), // cardId????????
  }),
}), dislikeCard);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(isUrl).required(),
  }),
}), postCard);

module.exports = router;
