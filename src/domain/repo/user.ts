import { DB } from '../model';
import BaseRepository from './base';
import { FilterQuery } from 'mongoose';

export default class UserRepository extends BaseRepository {
  public readonly model: DB['User'];
  constructor(db: DB) {
    super(db);
    this.model = db.User;
  }

  public async getByCondition(filter: FilterQuery<any>) {
    const users = await this.model
      .find(<any>{
        ...filter
      })
      .select('email');

    return users;
  }
}
