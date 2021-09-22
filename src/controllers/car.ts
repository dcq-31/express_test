import { RequestHandler, Request, Response, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { checkSchema, validationResult } from 'express-validator';
import carValidateSchema from 'src/validations/request/carSchema';
import CarModel from 'src/models/car';

export const cars_read: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  CarModel.find({}, (err, cars) => {
    if (err) next(err);
    else res.json(cars);
  })
};

export const car_create: RequestHandlerParams[] = [
  checkSchema(carValidateSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    else {
      CarModel.findOne({ "model": req.body.model }).exec((err, car) => {
        if (err) next(err);
        else if (car) {
          res.status(400).json({
            errors: [{ msg: "The car has been created previously." }]
          })
        }
        else {
          const car_instance = new CarModel({
            model: req.body.model, cost: req.body.cost, qty: req.body.qty
          });
          console.log(car_instance);
          car_instance.save(err => {
            if (err) res.json({ errors: err });
            else res.json(car_instance);
          })
        }
      })
    }
  }
];

export const car_read: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  CarModel.findById(req.params.id, undefined, undefined, (err, car) => {
    if (err) next(err);
    else res.json(car);
  })
};

export const car_update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Update car with id: ${req.params.id}`);
}

export const car_delete: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Delete car with id: ${req.params.id}`);
}