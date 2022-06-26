import { ICommonAttributes, ICommonSearch } from './common';

export interface IMovieAttributes
  extends ICommonAttributes {
  title: string;
  poster_image: string;
  backdrop_image: string;
  rating: number;
  language?: Language;
  genres: Genres;
  popularity: number;
}

export enum Language {
  VN = 0,
  ENG = 1
}

export enum Genres {
  Action = 0,
  Comedy = 1,
  Drama = 2,
  Fantasy = 3,
  Horror = 4,
  Mystery = 5,
  Romance = 6,
  Thriller = 7
}

export enum Popularity {
  P = 'P',
  C13 = 'C13',
  C16 = 'C16',
  C18 = 'C18'
}

export enum SortField {
  releasedate = 0,
  alphabetical = 1,
  rating = 2
}

export enum SortOrder {
  asc = 1,
  desc = -1
}

export interface ISearchParamsMovie extends ICommonSearch {
  title?: string;
  sortField?: SortField | string;
  sortOrder?: SortOrder | string;
}

export interface IFormMovie {
  title: string;
  poster_image: Buffer;
  backdrop_image: Buffer;
  rating: number;
  language: Language;
  genres: Genres;
  popularity: number;
}
