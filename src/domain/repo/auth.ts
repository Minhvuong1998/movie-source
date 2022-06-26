import { DB } from '../model';
import BaseRepository from './base';
import { statics, types, errors } from '../../factory';
import * as jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import * as crypto from 'crypto';

export default class AuthRepository extends BaseRepository {
  private readonly jwtSecret: string =
    process.env.JWT_SECRET || 'internal';
  private readonly expiresIn: string =
    process.env.JWT_EXPIRATION || '3600s';
  public readonly model: DB['User'];
  constructor(db: DB) {
    super(db);
    this.model = db.User;
  }

  public async register(params: types.Auth.RegisterParams) {
    params.password = this.hash(params.password);
    const user = await this.model.create(params);

    return {
      _id: user._id
    };
  }

  public async login(params: types.Auth.LoginParams) {
    const user = await this.model
      .findOne({ email: params.email })
      .select('email name _id password authority');
    const pass = this.hash(params.password);
    
    if (user && user.password === pass) {
      const data = pick(user.toJSON(), [
        '_id',
        'email',
        'name',
        'authority'
      ]);
      console.log(this.jwtSecret);
      const token = jwt.sign(data, this.jwtSecret, {
        expiresIn: this.expiresIn
      });

      return {
        ...data,
        token
      };
    }
    throw new errors.Argument(statics.message.loginFailure);
  }

  private hash(data: string) {
    return crypto
      .createHmac(
        'sha256',
        <string>process.env.HASH_SECRET!
      )
      .update(data)
      .digest('hex')
      .toString();
  }
}
