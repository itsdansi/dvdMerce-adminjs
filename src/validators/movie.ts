import {Request, Response, NextFunction} from "express";
import {createMovieSchema, updateMovieSchema} from "./schema/movie";
import {validate} from "../utils/requestValidator";

export async function validateCreateMovieSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, createMovieSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateUpdateSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, updateMovieSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
