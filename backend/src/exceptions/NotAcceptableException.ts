import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class NotAcceptableException extends HttpException {
  constructor(msg?: string, code?: string) {
    super(statusCodes.NOT_ACCEPTABLE, msg ?? "Not acceptable", code);
  }
}

export default NotAcceptableException;
