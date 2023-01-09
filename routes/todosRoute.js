const { Router } = require('express');
const { getTodo, saveTodo } = require('../controller/todosController');


const router = Router();
router.get('/', getTodo);
router.post("/save", saveTodo);

// router.post("/update", updateToDo);

// router.post("/delete", deleteToDo);

module.exports = router;
