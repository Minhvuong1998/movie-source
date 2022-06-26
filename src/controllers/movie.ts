import BaseController from './base';
import { NextFunction, Request, Response } from 'express';
import mongoDB, { DB } from '../config/mongoDB';
import { repository } from '../domain';
import mapper from '../mapper';
import { emailService } from '../utils';
import { statics } from '../factory';

class MovieController extends BaseController {
  protected readonly movieRepo: repository.movieRepo;
  protected readonly userRepo: repository.userRepo;

  constructor(db: DB) {
    super(db);
    this.movieRepo = new repository.movieRepo(db);
    this.userRepo = new repository.userRepo(db);

    this.search = this.nextWrapper(this.search);
    this.create = this.nextWrapper(this.create);
    this.update = this.nextWrapper(this.update);
    this.searchId = this.nextWrapper(this.searchId);
    this.delete = this.nextWrapper(this.delete);
  }

  public search = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const movies = await this.movieRepo.search({
      ...mapper.movie.search(req),
      ...this.getOffsetLimit(req)
    });

    this.OK(res, movies);
  };

  public create = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const movie = await this.movieRepo.create(
      mapper.movie.form(req),
      req.user!
    );
    const users = await this.userRepo
      .getByCondition({
        authority: {
          $ne: statics.User.Authority.ADMIN
        },
        deleted_at: null,
        deleted_by: null
      })
      .then((users) => users.map((user) => user.email));

    emailService.sendMail({
      bcc: users,
      subject: 'Notication !!!',
      text: `Movie ${movie.title} is released!`
    });

    this.CREATED(res, {
      _id: movie._id
    });
  };

  public update = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    await this.movieRepo.update(
      req.params.id,
      mapper.movie.form(req),
      req.user!
    );

    this.NO_CONTENT(res);
  };

  public searchId = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const movie = await this.movieRepo.searchId(
      req.params.id
    );

    this.OK(res, movie);
  };

  public delete = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    await this.movieRepo.delete(req.params.id, req.user!);

    this.NO_CONTENT(res);
  };
}

export default new MovieController(mongoDB);
