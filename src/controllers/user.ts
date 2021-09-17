import { RequestHandler, Request, Response, NextFunction } from 'express';
import UserModel from 'src/models/user';

const user_list: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  UserModel.find({}).select("name cars").exec((err, users) => {
    if (err) res.send(err);
    else res.json(users);
  })
}

const user_create: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send("New user created");
}

const user_read: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  UserModel.findById(req.params.id, {}, null, (err, user) => {
    if (err) res.send(err);
    else res.json(user);
  })
}

const user_update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Update user with id: ${req.params.id}`);
}

const user_delete: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Delete user with id: ${req.params.id}`);
}

export {
  user_list,
  user_create,
  user_read,
  user_update,
  user_delete
}