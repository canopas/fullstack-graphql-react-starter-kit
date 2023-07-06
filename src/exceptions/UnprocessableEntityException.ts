import { statusCodes } from "../config/const.config";
import HttpException from "./HttpException";

class UnprocessableEntityException extends HttpException {
  constructor(msg?: string, code?: string) {
    super(
      statusCodes.UNPROCESSABLE_ENTITY,
      msg || "Unprocessable entity",
      code,
    );
  }
}

export default UnprocessableEntityException;
