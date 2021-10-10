const router = require('express').Router();
const getUsers = require('../controllers/users');

router.get('/', getUsers);

router.get('/users/:userId', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});


module.exports = router;