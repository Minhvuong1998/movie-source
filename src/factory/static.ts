import * as userFactory from './main/user';
import * as movieFactory from './main/movie';
import * as commonFactory from './main/common';

export const messageValidate = {
  required: ($0: string) => `${$0} is required.`,
  maxlength: ($0: string, $1: number) =>
    `${$0} is too long. Please input maximums of ${$1} characters.`,
  uploadFileType: ($0: string, $1: string) =>
    `${$0} is not in ${$1} format.`,
  isNumber: ($0: string) => `${$0} is must be a number.`,
  intBetween: ($0: string, $1: number, $2: number) =>
    `${$0} must be a number between ${$1} and ${$2}`,
  valueOf: ($0: string) =>
    `${$0} is not exists in list value.`,
  isEmail: ($0: string) => `${$0} is invalid.`
};

export const message = {
  notFound: (url: string) => `${url} not found.`,
  loginFailure: 'Email or password is incorrect',
  notAccess: 'Url has no access.',
  unauthorized: 'Unauthorized error.',
  systemError: 'System error.',
  expiredToken: `Token is expired.`
};

export namespace User {
  export import Authority = userFactory.Authority;
}

export namespace Movie {
  export import Language = movieFactory.Language;
  export import Genres = movieFactory.Genres;
  export import Popularity = movieFactory.Popularity;
  export import SortField = movieFactory.SortField;
  export import SortOrder = movieFactory.SortOrder;
}

export namespace Common {
  export import OffsetLimit = commonFactory.OffsetLimit;
}
