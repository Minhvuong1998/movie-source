import express from 'express';
import movieController from '@controllers/movie';
import errorValidator from '@middlewares/errorValidator';
import permission, {
  authList
} from '@middlewares/permission';
import { upsert } from '../validators/movie';
import multer from 'multer';
import authenticator from '../middleware/authenticator';

const storage = multer.memoryStorage();

const upload = multer({
  storage
});

const movieRouter = express.Router();

movieRouter.get('/', movieController.search);

movieRouter.get(
  '/:id([0-9a-f]{24})',
  movieController.searchId
);

movieRouter.post(
  '/',
  authenticator,
  permission(authList.admin),
  upload.fields([
    {
      name: 'poster_image',
      maxCount: 1
    },
    {
      name: 'backdrop_image',
      maxCount: 1
    }
  ]),
  upsert,
  errorValidator,
  movieController.create
);

movieRouter.put(
  '/:id([0-9a-f]{24})',
  authenticator,
  permission(authList.admin),
  upload.fields([
    {
      name: 'poster_image',
      maxCount: 1
    },
    {
      name: 'backdrop_image',
      maxCount: 1
    }
  ]),
  upsert,
  errorValidator,
  movieController.update
);

movieRouter.delete(
  '/:id([0-9a-f]{24})',
  authenticator,
  permission(authList.admin),
  movieController.delete
);

export default movieRouter;
