import { pick } from 'lodash';
import { Request } from 'express';
import { types } from '../factory';

export const login = (req: Request) =>
  <types.Auth.LoginParams>(
    pick(req.body, ['email', 'password'])
  );

export const register = (req: Request) =>
  <types.Auth.RegisterParams>{
    ...pick(req.body, ['email', 'password', 'name'])
  };
