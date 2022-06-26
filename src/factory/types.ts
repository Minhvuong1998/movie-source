import * as UserFactory from './main/user';
import * as MovieFactory from './main/movie';

export namespace User {
  export import attributes = UserFactory.IUserAttributes;
  // export import searchParams = UserFactory.ISearchParams;
}

export namespace Auth {
  // export import paramsLogin = UserFactory.TParamsLogin;
  export import LoginData = UserFactory.ILoginData;
  export import LoginParams = UserFactory.ILogin;
  export import RegisterParams = UserFactory.IRegister;
}

export namespace Movie {
  export import attributes = MovieFactory.IMovieAttributes;
  export import SearchParamsMovie = MovieFactory.ISearchParamsMovie;
  export import Form = MovieFactory.IFormMovie;
}
