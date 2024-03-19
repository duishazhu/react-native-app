export default class RequestError extends Error {
  constructor(code, ...params) {
    super(...params);
    this.code = code;
  }
}
