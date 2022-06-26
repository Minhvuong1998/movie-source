import { Schema, Types } from 'mongoose';
export const timestamp = (schema: Schema) => {
  schema.add({
    created_at: {
      type: Date,
      default: Date.now()
    },
    created_by: Types.ObjectId,
    updated_at: {
      type: Date,
      default: Date.now()
    },
    updated_by: Types.ObjectId,
    deleted_at: Date,
    deleted_by: Types.ObjectId
  });
};
