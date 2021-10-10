const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(routes);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log("Express is running");
})
