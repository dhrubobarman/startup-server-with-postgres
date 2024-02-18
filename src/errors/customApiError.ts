import { StatusCodes } from "http-status-codes";

export abstract class CustomAPIError extends Error {
  abstract readonly statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
  }
}
