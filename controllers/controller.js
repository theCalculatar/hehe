const { errorMonitor } = require("supertest/lib/test.js");
const todoModel = require("../model/todoModel.js");
const db = require("../model/todoModel.js");

//gets todos
const getTodos = async (_, response) => {
  try {
    const results = await db.getTodos();
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json({ err: error.message });
  }
};

const deleteTodos = async (req, response, next) => {
  const { todoID } = req.params;

  if (isNaN(Number(todoID)))
    return response.status(400).json({ err: `bad request` });
  try {
    const results = await db.deleteTodo(todoID);
    if (!results)
      return response
        .status(404)
        .json({ err: `todo id(${todoID}) does not exist` });

    return response.status(204).json(results);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ err: "server error" });
  }
};

const updateTodos = async (req, response, next) => {
  const { todoID } = req.params;
  const { task, description, status, priority } = req.body;

  if (isNaN(Number(todoID)) || !task || !description || !status || !priority)
    return response.status(400).json({ err: `bad request` });
  try {
    const results = await db.updateTodo({
      id: todoID,
      task,
      description,
      status,
      priority,
    });
    if (!results)
      return response
        .status(404)
        .json({ err: `todo id(${todoID}) does not exist` });

    return response.status(200).send(results);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ err: "server error" });
  }
};

const addTodos = async (req, response) => {
  const { task, description, status, priority } = req.body;

  if (!task || !description || !status || !priority)
    return response.status(400).json({ err: `bad request` });
  try {
    const results = await db.postTodo({
      task: task,
      description: description,
      status: status,
      priority: priority,
    });
    return response.status(201).json(results);
  } catch (error) {
    return response.status(500).json({ err: error.message });
  }
};
module.exports = { getTodos, deleteTodos, updateTodos, addTodos };
