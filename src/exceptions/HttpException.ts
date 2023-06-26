import { GraphQLError } from "graphql";

class HttpException extends GraphQLError {
  status: number;
  message: string;
  extensions: {};
  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.extensions = { code: code };
  }
}

export default HttpException;
