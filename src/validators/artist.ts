import {Request, Response, NextFunction} from "express";
import {artistSchema} from "./schema/artist";
import {validate} from "../utils/requestValidator";

export async function validateArtistSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, artistSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
