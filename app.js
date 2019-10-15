const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./queries');
require('dotenv/config');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//postgres routes
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

// app.use('/post', (req, res) => {
//   console.log('middleware is running');
//   res.send('We are here');
// });

//routes
app.get('/', (req, res) => {
  res.send('Default route');
});

//get all todos
app.get('/todos', async (req, res) => {
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
