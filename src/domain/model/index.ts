import User from './user';
import Movie from './movie';

import { Mongoose } from 'mongoose';

export type DB = ReturnType<typeof initialize>;

export const initialize = (mongoose: Mongoose) => {
  const model = {
    User: User(mongoose),
    Movie: Movie(mongoose)
  };

  return {
    ...model,
    mongoose
  };
};
