import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class UnauthorizedException extends HttpException {
  constructor(msg?: string) {
    super(statusCodes.UNAUTHORIZED, msg || "User unauthorized");
  }
}

export default UnauthorizedException;
