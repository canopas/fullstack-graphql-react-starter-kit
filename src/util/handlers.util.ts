import { errorCodes } from "../config/const.config";
import BadRequestException from "../exceptions/BadRequestException";
import ServerErrorException from "../exceptions/ServerErrorException";

export function handleErrors(error: any) {
  const message = error.errors ? error.errors[0].message : undefined;
  if (error.name === "SequelizeValidationError") {
    throw new BadRequestException(
      message || "Validation error occurred.",
      errorCodes.UNIQUE_CONSTRAINT_ERROR
    );
  } else if (error.name === "SequelizeUniqueConstraintError") {
    throw new BadRequestException(
      message || "Unique constraint violation error occurred.",
      errorCodes.UNIQUE_CONSTRAINT_ERROR
    );
  } else {
    throw new ServerErrorException(
      message || "An error occurred at server",
      errorCodes.DATABASE_ERROR
    );
  }
}
