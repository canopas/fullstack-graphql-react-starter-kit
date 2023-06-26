import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class UnauthorizedException extends HttpException {
  constructor(msg?: string, code?: string) {
    super(statusCodes.UNAUTHORIZED, msg || "User unauthorized", code);
  }
}

export default UnauthorizedException;
