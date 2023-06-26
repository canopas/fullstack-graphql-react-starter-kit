import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class ForbiddenException extends HttpException {
  constructor(msg?: string, code?: string) {
    super(statusCodes.FORBIDDEN, msg || "Forbidden", code);
  }
}

export default ForbiddenException;
