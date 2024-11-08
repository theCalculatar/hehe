const express = require("express");
const bodyParser = require("body-parser");
const { Pool, Client } = require("pg");

//load .env variables
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
const port = 3001;

// const pool = new Pool();
const client = new Client();

client.connect()

// console.log(process.env.PGUSER);
app.get("", async (req, res) => {

  try {
    // const results = await pool.query('select * from albums');
    const results = await client.query('select * from albums');
    // pool.
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at port httpa://localhost:${port}`);
});
