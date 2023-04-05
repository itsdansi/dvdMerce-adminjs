import {Request, Response, NextFunction} from "express";
import {createCrewSchema, updateCrewSchema} from "./schema/movie_crew";
import {validate} from "../utils/requestValidator";

export async function validateCreateCrew(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, createCrewSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateUpdateCrew(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, updateCrewSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
