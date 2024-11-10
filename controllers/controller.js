//load .env variables
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");
const pool = new Pool();

//gets todos
const getTodos = async (_, response) => {
  try {
    const results = await pool.query("select * from todo");
    response.send(results.rows);
  } catch (error) {
    console.log(error);
    response.status(500).json({ err: "server error" });
  }
};

const deleteTodos = async (req, response, next) => {
  const { todoID } = req.params;

  if (isNaN(Number(todoID)))
    return response.status(400).json({ err: `bad request` });
  try {
    const results = await pool.query(
      "DELETE FROM todo WHERE id=$1 RETURNING *",
      [todoID]
    );
    if (results.rowCount == 0)
      return response
        .status(404)
        .json({ err: `todo id(${todoID}) does not exist` });

    return response.send(results.rows[0]);
  } catch (error) {
    return response.status(500).json({ err: "server error" });
  }
};

const updateTodos = async (req, response, next) => {
  const { todoID } = req.params;
  const { task, description, status, priority } = req.body;

  if (isNaN(Number(todoID)) || !task || !description || !status || !priority)
    return response.status(400).json({ err: `bad request` });
  try {
    const results = await pool.query(
      "UPDATE todo SET task=$2,description=$3,status=$4,priority=$5 WHERE id=$1 RETURNING *",
      [todoID, task, description, status, priority]
    );
    if (results.rowCount == 0)
      return response
        .status(404)
        .json({ err: `todo id(${todoID}) does not exist` });

    return response.send(results.rows[0]);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ err: "server error" });
  }
};

const addTodos = async (req, response, next) => {
  const { task, description, status, priority } = req.body;

  if (!task || !description || !status || !priority)
    return response.status(400).json({ err: `bad request` });
  try {
    const results = await pool.query(
      "INSERT INTO todo(task,description,status,priority) VALUES($1, $2, $3, $4) RETURNING *",
      [task, description, status, priority]
    );

    return response.send(results.rows[0]);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ err: "server error" });
  }
};
module.exports = { getTodos, deleteTodos, updateTodos, addTodos };
