const router = require('express').Router();

const { getCards, postCards, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', postCards);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
