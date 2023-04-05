import {Request, Response, NextFunction} from "express";
import {createDvdSchema, updateDvdSchema} from "./schema/dvd";
import {validate} from "../utils/requestValidator";

export async function validateCreateDvdSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, createDvdSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateUpdateDvdSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, updateDvdSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
