const express = require('express');
const { createTodo, getTodos,
  getTodo, deleteToDo, updateToDo } = require('../controller/todosController');



const router = express.Router();
// GET all todos
router.get('/', getTodos)

//GET a single ToDo
router.get('/:id', getTodo)

//POST a new ToDo
router.post('/', createTodo)

//DELETE a new ToDo
router.delete('/:id', deleteToDo)

//UPDATE a new ToDo
//router.patch
router.put('/:id', updateToDo)


module.exports = router;
