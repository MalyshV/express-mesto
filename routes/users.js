const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
// const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex(), // userId????????
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(isUrl).required(),
  }),
}), updateAvatar);

module.exports = router;
