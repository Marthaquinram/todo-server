const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  text: {
    type: String,
    require: true,
  },

});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
