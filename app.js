const express = require("express");
const app = express();

const router = require("./routes/userRoutes");


app.use(express.json());
app.use("/api/todos", router);

module.exports = app




