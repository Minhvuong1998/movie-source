import { Schema, Document, Mongoose } from 'mongoose';
import { types, statics } from '../../factory';
import { timestamp } from './common';

export default (mongoose: Mongoose) => {
  const UserSchema = new mongoose.Schema(
    {
      email: {
        type: Schema.Types.String,
        required: true
      },
      name: {
        type: Schema.Types.String,
        required: true
      },
      password: {
        type: Schema.Types.String,
        required: true
      },
      authority: {
        type: Schema.Types.Number,
        required: false,
        enum: [
          statics.User.Authority.USER,
          statics.User.Authority.ADMIN
        ],
        default: statics.User.Authority.USER
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

  return mongoose.model<Document & types.User.attributes>(
    'user',
    UserSchema,
    'user'
  );
};
