import { RequestHandler, Request, Response, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { checkSchema, validationResult } from 'express-validator';
import userValidateSchema from 'src/validations/request/userSchema';
import UserModel from 'src/models/user';
import { checkObjectId } from 'src/middlewares/validators';

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
  // Transform cars property in array
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.cars == undefined)
      req.body.cars = [];
    else {
      if (!Array.isArray(req.body.cars)) {
        req.body.cars = [req.body.cars];
      }
    }
    next();
  },
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
  checkObjectId,
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
export const user_update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Update user with id: ${req.params.id}`);
}

/**
 * Delete User
 */
export const user_delete: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Delete user with id: ${req.params.id}`);
}