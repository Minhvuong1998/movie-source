import BaseController from './base';
import { NextFunction, Request, Response } from 'express';
import mongoDB, { DB } from '../config/mongoDB';
import { repository } from '../domain';
import mapper from '../mapper';

class AuthController extends BaseController {
  protected readonly userRepo: repository.authRepo;

  constructor(db: DB) {
    super(db);
    this.userRepo = new repository.authRepo(db);

    this.login = this.nextWrapper(this.login);
    this.register = this.nextWrapper(this.register);
  }

  public login = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const user = await this.userRepo.login(
      mapper.auth.login(req)
    );

    this.OK(res, user);
  };

  public register = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const user = await this.userRepo.register(
      mapper.auth.register(req)
    );

    this.CREATED(res, user);
  };
}

export default new AuthController(mongoDB);
