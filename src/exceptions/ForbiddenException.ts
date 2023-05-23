import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class ForbiddenException extends HttpException {
  constructor(msg?: string) {
    super(statusCodes.FORBIDDEN, msg || "Forbidden");
  }
}

export default ForbiddenException;
