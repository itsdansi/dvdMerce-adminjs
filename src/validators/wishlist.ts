import {Request, Response, NextFunction} from "express";
// import {createMovieSchema, updateMovieSchema} from "./schema/movie";
import {wishlistSchema} from "./schema/wishlist";
import {validate} from "../utils/requestValidator";

export async function validateWishlistSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, wishlistSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
