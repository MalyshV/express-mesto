const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    // указать, что это ссылка или поставить ссылку
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: "user",
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: "user",
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);