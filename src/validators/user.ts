import {Request, Response, NextFunction} from "express";
import {UpdateAdminStatus} from "./schema/user";
import {validate} from "../utils/requestValidator";

export async function validateUpdateAdminStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, UpdateAdminStatus as any);
    next();
  } catch (error) {
    next(error);
  }
}
