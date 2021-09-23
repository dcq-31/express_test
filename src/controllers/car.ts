import { RequestHandler, Request, Response, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { checkSchema, validationResult } from 'express-validator';
import carValidateSchema from 'src/validations/request/carSchema';
import CarModel from 'src/models/car';
import { checkObjectId } from 'src/middlewares/validators';

/**
 * Read All Cars
 */
export const cars_read: RequestHandlerParams = (req: Request, res: Response, next: NextFunction) => {
  CarModel.find().exec((err, cars) => {
    if (err) next(err);
    else res.json(cars);
  })
};

/**
 * Create Car
 */
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
          const carInstance = new CarModel({
            model: req.body.model, cost: req.body.cost
          });
          carInstance.save(err => {
            if (err) next(err);
            else res.json(carInstance);
          })
        }
      })
    }
  }
];

/**
 * Read Car
 */
export const car_read: RequestHandlerParams[] = [
  checkObjectId,
  (req: Request, res: Response, next: NextFunction) => {
    CarModel.findById(req.params.id).exec((err, car) => {
      if (err) next(err);
      else if (!car) res.status(404).json({ errors: [{ msg: "Car not found." }] });
      else res.json(car);
    });
  }
];


/**
 * Update Car
 */
export const car_update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Update car with id: ${req.params.id}`);
}

/**
 * Delete Car
 */
export const car_delete: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Delete car with id: ${req.params.id}`);
}