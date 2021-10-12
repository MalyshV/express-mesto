const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

const ERROR_CODE_404 = 404;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '616349f026923a945bb82236',
  };
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(helmet());

app.all('*', (req, res) => {
  res.status(ERROR_CODE_404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
