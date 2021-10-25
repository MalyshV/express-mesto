const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const escape = require('escape-html');
const rateLimit = require('express-rate-limit');
const errors = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotAllowedError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(errors());
app.use(limiter);
app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);

// eslint-disable-next-line no-unused-vars
app.all('*', auth, (req) => {
  throw new NotAllowedError('Необходимо пройти авторизацию');
});

escape('<script>alert("hacked")</script>');

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
