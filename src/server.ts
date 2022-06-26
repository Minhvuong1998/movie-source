// /* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();

import 'module-alias/register';
import app from './app';
import { Request, Response } from 'express';

app.get('/check', (_req: Request, res: Response) => {
  res.send('Hello The World!');
});

app.listen(process.env.PORT || 3000);
