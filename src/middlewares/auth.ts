import * as jwt from "../utils/jwt";
import createError, {HttpError} from "http-errors";
import {Request, Response, NextFunction} from "express";

interface AuthRequest extends Request {
  user?: any;
}

const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized("Access token is required"));
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createError.Unauthorized());
  }

  try {
    const user = await jwt.verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error: HttpError | any) {
    next(createError.Unauthorized(error.message));
  }
};

export default auth;
