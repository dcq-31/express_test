import { RequestHandler, Request, Response, NextFunction } from 'express';
import CarModel from 'src/models/car';

const car_list: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  CarModel.find({}, (err, cars) => {
    if (err) res.send(err);
    else res.json(cars);
  })
};

const car_create: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send("New car created");
};

const car_read: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  CarModel.findById(req.params.id, {}, null, (err, car) => {
    if (err) res.send(err);
    else res.json(car);
  })
};

const car_update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Update car with id: ${req.params.id}`);
}

const car_delete: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Delete car with id: ${req.params.id}`);
}

export {
  car_list,
  car_create,
  car_read,
  car_update,
  car_delete
}