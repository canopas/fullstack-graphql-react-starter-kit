import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class NotFoundException extends HttpException {
  constructor(msg?: string, code?: string) {
    super(statusCodes.NOT_FOUND, msg ?? "Not found", code);
  }
}

export default NotFoundException;
