import { body, V } from './custom';
import { statics } from '../factory';

export const upsert = [
  body('*', [V.emptyStringAsNull]),
  body('title', 'Title', [V.required, V.maxLength(100)]),
  body('poster_image', 'Poster image', [
    V.fileRequired,
    V.typeFile(['png', 'jpg'])
  ]),
  body('backdrop_image', 'Backdrop image', [
    V.fileRequired,
    V.typeFile(['png', 'jpg'])
  ]),
  body('rating', 'Rating', [
    V.required,
    V.isNumber,
    V.intBetween(1, 5)
  ]),
  body('language', 'Language', [
    V.optional,
    V.valueOf(statics.Movie.Language)
  ]),
  body('genres', 'Genres', [
    V.required,
    V.valueOf(statics.Movie.Genres)
  ]),
  body('popularity', 'Gopularity', [
    V.required,
    V.valueOf(statics.Movie.Popularity)
  ])
];
