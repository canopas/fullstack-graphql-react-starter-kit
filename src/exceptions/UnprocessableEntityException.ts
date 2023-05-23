import { statusCodes } from "../config/const.config";
import HttpException from "./HttpException";

class UnprocessableEntityException extends HttpException {
  constructor(msg?: string) {
    super(statusCodes.UNPROCESSABLE_ENTITY, msg || "Unprocessable entity");
  }
}

export default UnprocessableEntityException;
