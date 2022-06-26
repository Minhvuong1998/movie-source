import { NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';
import { statics } from '../factory';

export default (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(NOT_FOUND).json({
    status: NOT_FOUND,
    message: statics.message.notFound(req.url)
  });
};
