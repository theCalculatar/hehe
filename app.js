const express = require("express");
const app = express();
const cors = require("cors");


const router = require("./routes/userRoutes");

app.use(cors())
app.use(express.json());
app.use("/api/todos", router);

module.exports = app




