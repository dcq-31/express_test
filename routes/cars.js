const express = require('express');
const DATA = require('./../data');

const router = express.Router();
const { cars } = DATA;

router.get('/', (req, res, next) => {
  res.json(cars);
})

router.get('/:index', (req, res, next) => {
  const car = cars.find((_value, _index) => _index == req.params.index);
  if (car) res.json(car);
  else res.send('Carro no encontrado.');
})


module.exports = router;
