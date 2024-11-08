const express = require("express");
const app = express();
const PORT = 3000;

// This middleware will log the request and
// allow it to proceed to the next handler
app.use('/lee', function (req, res, next) {
  console.log("Middleware called",req,req);
  next();
});

// Requests will reach this route after
// passing through the middleware
app.get("/user", function (req, res) {
  console.log("/user request called");
  res.send("Welcome to GeeksforGeeks");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Server listening on PORT ${PORT}`);
});
