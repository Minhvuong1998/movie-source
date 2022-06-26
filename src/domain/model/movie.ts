import { Schema, Document, Mongoose } from 'mongoose';
import { types, statics } from '../../factory';
import { timestamp } from './common';

export default (mongoose: Mongoose) => {
  const UserSchema = new mongoose.Schema(
    {
      title: {
        type: Schema.Types.String,
        required: true
      },
      poster_image: {
        type: Schema.Types.String,
        required: true
      },
      backdrop_image: {
        type: Schema.Types.String,
        required: true
      },
      rating: {
        type: Schema.Types.Number,
        required: true
      },
      language: {
        type: Schema.Types.Number,
        required: false,
        default: statics.Movie.Language.VN
      },
      genres: {
        type: Schema.Types.Number,
        required: true
      },
      popularity: {
        type: Schema.Types.String,
        required: true
      }
    },
    {
      toJSON: {
        virtuals: true
      },
      id: false,
      versionKey: false
    }
  ).plugin(timestamp);

  return mongoose.model<Document & types.Movie.attributes>(
    'movie',
    UserSchema,
    'movie'
  );
};
