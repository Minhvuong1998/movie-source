import { pick, get } from 'lodash';
import { Request } from 'express';
import { types } from '../factory';

export const search = (req: Request) =>
  <types.Movie.SearchParamsMovie>(
    pick(req.query, ['title', 'sortField', 'sortOrder'])
  );

export const form = (req: Request) =>
  <types.Movie.Form>{
    ...pick(req.body, [
      'title',
      'poster_image',
      'backdrop_image',
      'rating',
      'language',
      'genres',
      'popularity'
    ]),
    poster_image: get(
      req,
      'files.poster_image[0].buffer',
      null
    ),
    backdrop_image: get(
      req,
      'files.backdrop_image[0].buffer',
      null
    )
  };
