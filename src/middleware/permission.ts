import { statics } from '../factory';
import { NextFunction, Request, Response } from 'express';
import { FORBIDDEN } from 'http-status';

const Authority = statics.User.Authority;

const FullAccess = [Authority.ADMIN, Authority.USER];

export const authList = {
  fullAccess: 'FullAccess',
  admin: 'admin',
  user: 'user'
};

export const permissions = {
  [authList.fullAccess]: FullAccess,
  [authList.admin]: [Authority.ADMIN],
  [authList.user]: [Authority.USER]
};

export default (apiName: string) => {
  const apiPermission = permissions[apiName];
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (apiPermission.indexOf(req.user!.authority!) >= 0) {
      next();
    } else {
      res.status(FORBIDDEN).json({
        message: statics.message.notAccess
      });
    }
  };
};
