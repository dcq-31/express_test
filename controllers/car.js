const CarSchema = require('./../models/car');

exports.car_list = (req, res, next) => {
  CarSchema.find({}, (err, cars) => {
    if (err) res.send(err);
    else res.json(cars);
  })
}

exports.car_create = (req, res, next) => {
  res.send("New car created");
}

exports.car_read = (req, res, next) => {
  CarSchema.findById(req.params.id, (err, car) => {
    if (err) res.send(err);
    else res.json(car);
  })
}

exports.car_update = (req, res, next) => {
  res.send(`Update car with id: ${req.params.id}`);
}

exports.car_delete = (req, res, next) => {
  res.send(`Delete car with id: ${req.params.id}`);
}