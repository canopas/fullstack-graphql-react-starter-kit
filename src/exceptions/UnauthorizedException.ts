import HttpException from "./HttpException";
import { errorCodes, statusCodes } from "../config/const.config";

class UnauthorizedException extends HttpException {
  constructor(msg?: string, code?: string) {
    super(
      statusCodes.UNAUTHORIZED,
      msg ?? "User is not authorized",
      errorCodes.UNAUTHORIZED_ERROR,
    );
  }
}

export default UnauthorizedException;
