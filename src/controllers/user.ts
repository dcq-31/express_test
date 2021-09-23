import { RequestHandler, Request, Response, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { checkSchema, validationResult } from 'express-validator';
import userValidateSchema from 'src/validations/request/userSchema';
import UserModel from 'src/models/user';

export const users_read: RequestHandlerParams = (req: Request, res: Response, next: NextFunction) => {
  UserModel.find().exec((err, users) => {
    if (err) next(err);
    else res.json(users);
  })
}

export const user_create: RequestHandlerParams[] = [
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
            name: req.body.name, money: req.body.money
          });
          console.log(userInstance);
          userInstance.save(err => {
            if (err) res.json({ errors: err });
            else res.json(userInstance);
          })
        }
      })
    }
  }
]

export const user_read: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  UserModel.findById(req.params.id, {}, null, (err, user) => {
    if (err) res.send(err);
    else res.json(user);
  })
}

export const user_update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Update user with id: ${req.params.id}`);
}

export const user_delete: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Delete user with id: ${req.params.id}`);
}