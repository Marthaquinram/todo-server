const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })


module.exports = mongoose.model('Todo', todoSchema);
