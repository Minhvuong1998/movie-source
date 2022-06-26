import authRepository from './repo/auth';
import movieRepository from './repo/movie';
import userRepository from './repo/user';

export class authRepo extends authRepository {}

export class movieRepo extends movieRepository {}

export class userRepo extends userRepository {}
