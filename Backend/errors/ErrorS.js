
class ErrorS extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
  getStatusCode = () => {
    return this.statusCode;
  }
}

module.exports = ErrorS;
