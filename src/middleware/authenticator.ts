import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import { errors, statics, types } from '../factory';

export default async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    let token: any = req.headers['authorization'];
    if (token) {
      token = (<string>token!).split(' ');
      const verify = jwt.verify(
        <string>token![1],
        process.env.JWT_SECRET!
      );
      req.user = <types.Auth.LoginData>(
        pick(verify, ['name', 'email', 'authority', '_id'])
      );

      return next();
    }
    throw new errors.Unauthorized(
      statics.message.unauthorized
    );
  } catch (err) {
    if (err.TokenExpiredError === 'tokenExpiredError') {
      return next(
        new errors.Unauthorized(
          statics.message.expiredToken
        )
      );
    }
    next(err);
  }
};
