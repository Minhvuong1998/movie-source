import { ICommonAttributes } from './common';

export interface IUserAttributes extends ICommonAttributes {
  email: string;
  name: string;
  password: string;
  authority: number;
}

export interface ILoginData {
  email: string;
  name: string;
  authority: number;
  _id: string;
}

export enum Authority {
  ADMIN = 0,
  USER = 1
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  name: string;
}
