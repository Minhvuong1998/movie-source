import { BAD_REQUEST } from 'http-status';

export default class ArgumentError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = BAD_REQUEST;
  }
}
