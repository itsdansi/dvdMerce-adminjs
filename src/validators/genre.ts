import {Request, Response, NextFunction} from "express";
import {GenreSchema} from "./schema/genre";
import {validate} from "../utils/requestValidator";
import {ObjectSchema} from "joi";

export async function validateGenereSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, GenreSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
