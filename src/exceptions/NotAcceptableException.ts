import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class NotAcceptableException extends HttpException {
  constructor(msg?: string) {
    super(statusCodes.NOT_ACCEPTABLE, msg || "Not acceptable");
  }
}

export default NotAcceptableException;
