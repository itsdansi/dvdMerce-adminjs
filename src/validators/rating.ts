import {Request, Response, NextFunction} from "express";
// import {createMovieSchema, updateMovieSchema} from "./schema/movie";
import {ratingSchema} from "./schema/rating";
import {validate} from "../utils/requestValidator";

export async function validateRatingSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, ratingSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
