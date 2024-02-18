/** src/middlewares/errors.ts **/

import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../errors/customApiError";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: CustomAPIError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
