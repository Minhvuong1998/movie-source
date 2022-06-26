import { NOT_FOUND } from 'http-status';

export default class NotFoundError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = NOT_FOUND;
  }
}
