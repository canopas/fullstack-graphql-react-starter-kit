import { statusCodes } from "../config/const.config";
import HttpException from "./HttpException";

class BadRequestException extends HttpException {
  constructor(msg?: string, code?: number) {
    super(statusCodes.BAD_REQUEST, msg || "Bad request", code);
  }
}

export default BadRequestException;
