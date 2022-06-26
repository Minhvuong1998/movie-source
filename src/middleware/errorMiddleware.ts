import { NextFunction, Request, Response } from 'express';
import {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} from 'http-status';
import { UNAUTHORIZED } from 'http-status';
import { statics } from '../factory';

export default (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const reponse = {
    status: INTERNAL_SERVER_ERROR,
    message: err.message
  };
  switch (err.status) {
    case UNAUTHORIZED:
      reponse.status = UNAUTHORIZED;
      reponse.message = err.message;
      break;
    case BAD_REQUEST:
      reponse.status = BAD_REQUEST;
      reponse.message = [err.message];
      break;
    case NOT_FOUND:
      reponse.status = NOT_FOUND;
      reponse.message = statics.message.notFound(req.url);
      break;
  }

  res.status(reponse.status).json({
    message: reponse.message
  });
};
