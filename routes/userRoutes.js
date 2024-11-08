const {addTodos, deleteTodos, updateTodos, getTodos} = require('../controllers/controller.js')
const express = require('express')
const router = express.Router()

// ROUTER: gets all todos
router.get("/", getTodos);

// ROUTER: adds single todo
router.post("/", addTodos);

// ROUTER: delete todo given ID
router.delete("/:todoID", deleteTodos);

// ROUTER: update todo gievn ID
router.put("/:todoID", deleteTodos);

module.exports = router