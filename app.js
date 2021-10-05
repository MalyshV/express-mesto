const express = require('express');

const PORT = 3000;
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});


app.listen(PORT, () => {
  console.log("Express is running");
})
