import {Request, Response, NextFunction} from "express";
import RatingService from "../services/rating.service";

import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";
import {getCurrentUserId} from "../middlewares/getCurrentUserId";

interface AuthRequest extends Request {
  user?: any;
}

class RatingController {
  /**
   * Controller function to fetch all ratings
   *
   * @param req
   * @param res
   * @param next
   */
  static getAllRatings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dvds = await RatingService.getAllRatings();
      res.status(200).json({
        success: true,
        message: "Rating fetched successfully!",
        data: dvds,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get a single rating by Id
   *
   * @param req
   * @param res
   * @param next
   */

  static getRatingById = async (req: Request, res: Response, next: NextFunction) => {
    const ratingId = parseInt(req.params.id);

    try {
      const dvd = await RatingService.getRatingById(ratingId);

      if (!dvd) {
        throw createError(404, `Rating with ID ${ratingId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Rating fetched successfully!",
        data: dvd,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to create a new dvd
   *
   * @param req
   * @param res
   * @param next
   */
  static createRating = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {rating, movieId} = req.body;
      const currentUser = await getCurrentUserId(req, res, () => {});
      const userId = req.user.id;

      const dvd = await RatingService.createRating({
        rating,
        movie: {
          connect: {id: movieId},
        },
        user: {
          connect: {
            id: userId,
          },
        },
      });

      res.status(201).json({
        success: true,
        message: "Rating created successfully!",
        data: dvd,
      });
    } catch (error: HttpError | any) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        next(createError(error.code, error.message));
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        next(createError("400", "Invalid input data!"));
      } else {
        // Handle other types of errors
        next(
          createError(error.statusCode ?? 500, error.message ?? "Inter Server Error!")
        );
      }
    }
  };

  /**
   * Controller function to update a dvd details
   *
   * @param req
   * @param res
   * @param next
   */
  static updateRatingById = async (req: Request, res: Response, next: NextFunction) => {
    const ratingId = parseInt(req.params.id);
    const updatePayload = req.body;

    try {
      const rating = await RatingService.updateRatingById(ratingId, updatePayload);

      if (!rating) {
        throw createError(404, `Rating with ID ${ratingId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Rating updated successfully!",
        data: rating,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Rating with ID ${ratingId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };
}

export default RatingController;
