const express = require('express');
const mongoose = require('mongoose');
const router_user = require('./routes/user');
const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Include routes
app.use(router_user);

// Conect to mongoDB
const mongoDB_url = 'mongodb://localhost:27017/admin';
mongoose.connect(mongoDB_url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('open', () => console.log('Conection success'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('My Express Example!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});