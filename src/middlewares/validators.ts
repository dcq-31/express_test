import { Request, Response, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { Types } from 'mongoose';

export const checkParams: RequestHandlerParams = (req: Request, res: Response, next: NextFunction) => {
  if (!Types.ObjectId.isValid(req.params.id))
    res.status(404).json({ errors: [{ msg: "Not found." }] });
  else next();
}