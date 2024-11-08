//load .env variables
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");
const pool = new Pool();

//gets todos
const getTodos = async (request, response) => {
  try {
    const results = await pool.query("select * from albums");
    response.send(results.rows);
  } catch (error) {
    response.status(500).json({ err: "server error" });
  }
};

const deleteTodos = (res, req, next) => {};

const updateTodos = (res, req, next) => {};
const addTodos = (res, req, next) => {};
module.exports = { getTodos, deleteTodos, updateTodos, addTodos };
