//load .env variables
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");
const pool = new Pool();

module.exports = {
  async getTodos() {
    try {
      const results = await pool.query("select * from todo");
      return results.rows;
    } catch (error) {
      throw new Error("Database error while retrieving todos");//needs testing
    }
  },
  async postTodo({ task, description, status, priority }) {
    try {
      const results = await pool.query(
        "INSERT INTO todo(task,description,status,priority) VALUES($1, $2, $3, $4) RETURNING *",
        [task, description, status, priority]
      );
      return results.rows[0];
    } catch (error) {
      throw new Error("error while adding todo");//needs testing
    }
  },
  async deleteTodo(todoID) {
    try {
      const results = await pool.query(
        "DELETE FROM todo WHERE id=$1 RETURNING *",
        [todoID]
      );
      return results.rows[0] || null; //if todo with id does not exists return null
    } catch (error) {
      throw new Error("error while deleting todo");//needs testing
    }
  },
  async updateTodo({ id, task, description, status, priority }) {
    try {
      const results = await pool.query(
        "UPDATE todo SET task=$2,description=$3,status=$4,priority=$5 WHERE id=$1 RETURNING *",
        [id, task, description, status, priority]
      );
      return results.rows[0] || null; //if todo with id does not exists return null
    } catch (error) {
      throw new Error("error while updating todo");//needs testing
    }
  },
};
