import express from 'express';
import authController from '@controllers/auth';
import { login, register } from '@validators/auth';
import errorValidator from '@middlewares/errorValidator';

const authRouter = express.Router();

authRouter.post(
  '/login',
  login,
  errorValidator,
  authController.login
);
authRouter.post(
  '/register',
  register,
  errorValidator,
  authController.register
);

export default authRouter;
