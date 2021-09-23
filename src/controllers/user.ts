import { RequestHandler, Request, Response, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { checkSchema, validationResult } from 'express-validator';
import userValidateSchema from 'src/validations/request/userSchema';
import UserModel from 'src/models/user';
// Middlewares
import { checkParams } from 'src/middlewares/validators';
import { transformCars, checkCars } from 'src/middlewares/user';

/**
 * Read All Users
 */
export const users_read: RequestHandlerParams = (req: Request, res: Response, next: NextFunction) => {
  UserModel.find().exec((err, users) => {
    if (err) next(err);
    else res.json(users);
  })
}

/**
 * Create User
 */
export const user_create: RequestHandlerParams[] = [
  transformCars,
  checkCars,
  checkSchema(userValidateSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    else {
      UserModel.findOne({ "name": req.body.name }).exec((err, user) => {
        if (err) next(err);
        else if (user) {
          res.status(400).json({
            errors: [{ msg: "The user has been created previously." }]
          })
        }
        else {
          const userInstance = new UserModel({
            name: req.body.name, money: req.body.money,
            cars: req.body.cars
          });
          console.log("userInstance", userInstance);
          userInstance.save(async (err) => {
            if (err) next(err);
            else {
              try {
                await userInstance.populate('cars');
                res.json(userInstance);
              } catch (err) {
                next(err);
              }
            }
          })
        }
      })
    }
  }
]

/**
 * Read User
 */
export const user_read: RequestHandlerParams[] = [
  checkParams,
  (req: Request, res: Response, next: NextFunction) => {
    UserModel.findById(req.params.id).populate('cars').exec((err, user) => {
      if (err) next(err);
      else if (!user) res.status(404).json({ errors: [{ msg: "User not found." }] });
      else res.json(user);
    })
  }
];

/**
 * Update User
 */
export const user_update: RequestHandlerParams[] = [
  transformCars,
  checkSchema(userValidateSchema),
  checkCars,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    else {
      const userInstance = new UserModel({
        _id: req.params.id,
        name: req.body.name,
        money: req.body.money,
        cars: req.body.cars,
      });
      UserModel.findByIdAndUpdate(req.params.id, userInstance, { new: true }).populate("cars").exec((err, user) => {
        if (err) next(err);
        else if (!user) res.status(404).json({ errors: [{ msg: "User not found." }] });
        else res.json(user);
      });
    }
  }
]

/**
 * Delete User
 */
export const user_delete: RequestHandlerParams[] = [
  checkParams,
  (req: Request, res: Response, next: NextFunction) => {
    UserModel.findByIdAndRemove(req.params.id).exec((err, user) => {
      if (err) next(err);
      else if (!user) res.status(404).json({ errors: [{ msg: "User not found." }] });
      else res.end();
    })
  }
];