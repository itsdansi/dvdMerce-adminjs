import * as jwt from "../utils/jwt";
import createError, {HttpError} from "http-errors";
import {Request, Response, NextFunction} from "express";

interface AuthRequest extends Request {
  user?: any;
}

const verifyToken = async (
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

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (user && user.isAdmin) {
      next(); // user is an admin, so pass control to the route handler
    } else {
      return res.status(403).json({
        error: "Unauthorized user! Admin access required!.",
      });
    }
  } catch (error) {
    return res.status(403).json({
      error: "Unauthorized user! You need to be an admin to access this resource.",
    });
  }
};

export default verifyToken;
