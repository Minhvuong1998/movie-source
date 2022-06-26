import NotFoundError from './notFound';
import ArgumentError from './argument';
import UnauthorizedError from './unauthorized';

export class NotFound extends NotFoundError {}

export class Argument extends ArgumentError {}

export class Unauthorized extends UnauthorizedError {}
