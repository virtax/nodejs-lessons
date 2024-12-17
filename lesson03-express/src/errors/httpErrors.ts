export class HTTPError extends Error {
  statusCode: number;
}

export class BadRequestError extends HTTPError {
  constructor(...args) {
    super(...args);
    this.statusCode = 400;
  }
}

export class NotFoundError extends HTTPError {
  constructor(...args) {
    super(...args);
    this.statusCode = 404;
  }

}