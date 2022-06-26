import { Types } from 'mongoose';

export interface ICommonAttributes {
  id: any;
  created_at?: Date | null;
  created_by?: Types.ObjectId | null;
  updated_at?: Date | null;
  updated_by?: Types.ObjectId | null;
  deleted_at?: Date | null;
  deleted_by?: Types.ObjectId | null;
}

export interface ICommonSearch {
  offset?: string | number;
  limit?: string | number;
}

export enum OffsetLimit {
  offset = 0,
  limit = 20
}
