import { body, V } from './custom';

export const register = [
  body('*', [V.emptyStringAsNull]),
  body('email', 'Email', [
    V.required,
    V.maxLength(100),
    V.isEmail
  ]),
  body('name', [V.required, V.maxLength(100)]),
  body('password', [V.required, V.maxLength(50)])
];

export const login = [
  body('*', [V.emptyStringAsNull]),
  body('email', 'Email', [
    V.required,
    V.maxLength(100),
    V.isEmail
  ]),
  body('password', [V.required, V.maxLength(50)])
];
