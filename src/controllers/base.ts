import { NextFunction, Request, Response } from 'express';
import { DB } from '../config/mongoDB';
import { CREATED, NO_CONTENT, OK } from 'http-status';
import { statics } from '../factory';

export default abstract class BaseController {
  protected readonly db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  protected getOffsetLimit(req: Request) {
    let offset = Number(req.query.offset);
    let limit = Number(req.query.limit);
    // limit = 10 offset = 0;
    if (isNaN(limit)) {
      limit = statics.Common.OffsetLimit.limit;
    }
    if (isNaN(offset)) {
      offset = statics.Common.OffsetLimit.offset;
    }
    offset = offset ? offset : 1;
    offset = limit * offset - limit;

    return {
      offset,
      limit
    };
  }

  protected nextWrapper(
    mainFunction: (
      req: Request,
      res: Response,
      next?: NextFunction
    ) => Promise<void>
  ) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        await mainFunction(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }

  public CREATED(res: Response, data?: any) {
    res.status(CREATED).json(data);
  }

  public NO_CONTENT(res: Response) {
    res.status(NO_CONTENT).json();
  }

  public OK(res: Response, data?: any) {
    res.status(OK).json(data);
  }
}
