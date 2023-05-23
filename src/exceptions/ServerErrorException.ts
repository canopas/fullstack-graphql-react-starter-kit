import HttpException from "./HttpException";
import { statusCodes } from "../config/const.config";

class ServerErrorException extends HttpException {
  constructor(msg?: string) {
    super(statusCodes.SERVER_ERROR, msg || "Internal server error");
  }
}

export default ServerErrorException;
