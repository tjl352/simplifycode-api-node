const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');

//middleware
app.use('/post', () => {
  console.log('middleware is running');
});

//routes
app.get('/', (req, res) => {
  res.send('We are on home');
});

app.get('/post', (req, res) => {
  res.send('We are on post');
});

//database
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () =>
  console.log('Connected to database...')
);

//port
app.listen(5000);
