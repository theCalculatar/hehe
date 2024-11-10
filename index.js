const app = require('./app')

//test connection
app.get("", (_, res) => {
  res.send("<p>connection sharp!</p>");
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running at port httpa://localhost:${port}`);
});

