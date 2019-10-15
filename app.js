const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');

//middleware
app.use(bodyParser.json());

// app.use('/post', (req, res) => {
//   console.log('middleware is running');
//   res.send('We are here');
// });

//routes
app.get('/', (req, res) => {
  res.send('Default route');
});

//get all todos
app.get('/todo', async (req, res) => {
  try {
    let result = await TodoModel.find().exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//post new todo
app.post('/todo', async (req, res) => {
  try {
    let todo = new TodoModel(req.body);
    let result = await todo.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//database
mongoose.connect(
  process.env.DB_CONNECTION,
  {useUnifiedTopology: true, useNewUrlParser: true},
  () => console.log('Connected to MongoDB')
);

const TodoModel = mongoose.model('todo', {
  title: String,
  description: String,
  date: {
    type: Date,
    default: Date.now
  }
});

//listen
app.listen(5000, () => {
  console.log('App running on port 5000');
});
