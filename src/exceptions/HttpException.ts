class HttpException extends Error {
  status: number;
  code: number | undefined;
  message: string;
  constructor(status: number, message: string, code?: number) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

export default HttpException;
