import { statusCodes } from "../config/const.config";
import HttpException from "./HttpException";

class BadRequestException extends HttpException {
  constructor(msg?: string, code?: string) {
    super(statusCodes.BAD_REQUEST, msg ?? "Bad request", code);
  }
}

export default BadRequestException;
