const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.log(err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res.status();
    })
    .catch((err) => {
      console.log(err);
    });
};

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getUsers, getUser, createUser };
