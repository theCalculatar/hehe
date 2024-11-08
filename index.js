const express = require("express");
const router = require('./routes/userRoutes')
const app = express();
const bodyPart = require('body-parser')


app.use(express.json());
app.use('/api/todos', router);

app.get('',(req,res)=>{
    res.send('<p>mhh</p>')
})

const port = 3001;


app.listen(port, () => {
  console.log(`Server running at port httpa://localhost:${port}`);
});
