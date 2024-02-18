import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./customApiError";

export class BadRequestError extends CustomAPIError {
  readonly statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
