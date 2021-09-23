import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { RequestHandlerParams } from 'express-serve-static-core';

export const transformCars: RequestHandlerParams = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.cars == undefined)
    req.body.cars = [];
  else {
    if (!Array.isArray(req.body.cars)) {
      req.body.cars = [req.body.cars];
    }
  }
  next();
}

export const checkCars: RequestHandlerParams = (req: Request, res: Response, next: NextFunction) => {
  for (const element of req.body.cars) {
    if (!Types.ObjectId.isValid(element)) {
      res.status(404).json({ errors: [{ msg: "Some cars are not found." }] });
      return;
    }
  }
  next();
}