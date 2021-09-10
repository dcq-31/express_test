const express = require('express');
const router_cars = require('./routes/cars');

const app = express();

app.use('/cars', router_cars);

app.get('/', (req, res) => {
  res.send('My Express Example!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});