const TodoModel = require('../models/todosModel');

// const mongoose = require('mongoose');

module.exports.getTodo = async (req, res) => {
  const todos = await TodoModel.find();
  res.send(todos);
};


module.exports.saveTodo = (req, res) => {
  const { text } = req.body;
  TodoModel
    .create({ text })
    .then((data) => {
      console.log("added successfully");
      console.log("HEY IM FROM THE DATA!", data);
      res.send(data);
    })
    .catch((err) => console.log(err));
};
