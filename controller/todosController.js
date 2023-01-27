const ToDo = require('../models/todosModel');
const mongoose = require('mongoose');
const { response } = require('../server');



//------CRUD for ToDos------//


//get all todos
const getTodos = async (req, res) => {
  const todos = await ToDo.find({}).sort({ createdAt: -1 }) //descending order -1
  res.status(200).json(todos)
}

// get a single todo
const getTodo = async (req, res) => {
  const { id } = req.params
  //check if id that we got is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //then return error
    return res.status(404).json({ error: 'No such ToDo' })
  }
  const todo = await ToDo.findById(id)
  if (!todo) {
    return res.status(404).json({ error: 'No such todo found' })
  }
  res.status(200).json(todo)
}

// create a new todo
const createTodo = async (req, res) => {
  const { text, completed } = req.body


  let emptyFields = []

  if (!text) {
    emptyFields.push('text')

  }
  if (!completed) {
    emptyFields.push('completed')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  //add doc to db
  try {
    const todo = await ToDo.create({ text, completed })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//delete a todo
const deleteToDo = async (req, res) => {
  const { id } = req.params
  //check if id that we got is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //then return error
    return res.status(404).json({ error: 'No such ToDo' })
  }
  const todo = await ToDo.findOneAndDelete({ _id: id })
  if (!todo) {
    return res.status(404).json({ error: 'No such todo found' })
  }
  res.status(200).json(todo)
}


//update a todo
const updateToDo = async (req, res) => {
  const { id } = req.params
  //check if id that we got is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //then return error
    return res.status(404).json({ error: 'No such ToDo' })
  }
  const todo = await ToDo.findOneAndUpdate({ _id: id }, {
    ...req.body
  })
  if (!todo) {
    return res.status(404).json({ error: 'No such todo found' })
  }
  res.status(200).json(todo)
}



module.exports = {
  createTodo,
  getTodos,
  getTodo,
  deleteToDo,
  updateToDo
}
