import {Request, Response, NextFunction} from "express";
import MovieService from "../services/movie.services";
import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";
import {getCurrentUserId} from "../middlewares/getCurrentUserId";

interface AuthRequest extends Request {
  user?: any;
}

class MovieController {
  /**
   * Controller function to fetch all movies
   *
   * @param req
   * @param res
   * @param next
   */
  static getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movies = await MovieService.getAllMovies();
      res.status(200).json({
        success: true,
        message: "Movies fetched successfully!",
        data: movies,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get a single movie by Id
   *
   * @param req
   * @param res
   * @param next
   */

  static getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    const movieId = parseInt(req.params.id);

    try {
      const movie = await MovieService.getMovieById(movieId);

      if (!movie) {
        throw createError(404, `Movie with ID ${movieId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Movie fetched successfully!",
        data: movie,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get a single movie by Id
   *
   * @param req
   * @param res
   * @param next
   */

  static getMovieByGenreId = async (req: Request, res: Response, next: NextFunction) => {
    const genreId = parseInt(req.params.id);

    try {
      const movie = await MovieService.getMovieByGenreId(genreId);

      if (!movie) {
        throw createError(404, `Movie having genreId ${genreId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Movie fetched successfully!",
        data: movie,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to create a new movie
   *
   * @param req
   * @param res
   * @param next
   */
  static createMovie = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {title, plot, genreId, imageUrl, releaseDate} = req.body;
      // getting current userID
      const currentUser = await getCurrentUserId(req, res, () => {});
      const userId = req.user.id;

      const movie = await MovieService.createMovie({
        title,
        plot,
        imageUrl,
        releaseDate,
        genre: {
          connect: {id: genreId},
        },
        user: {
          connect: {
            id: userId,
          },
        },
      });

      res.status(201).json({
        success: true,
        message: "Movie created successfully!",
        data: movie,
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
   * Controller function to update a movie details
   *
   * @param req
   * @param res
   * @param next
   */
  static updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    const movieId = parseInt(req.params.id);
    const updatePayload = req.body;

    try {
      const movie = await MovieService.updateMovieById(movieId, updatePayload);

      if (!movie) {
        throw createError(404, `Movie with ID ${movieId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Movie updated successfully!",
        data: movie,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Movie with ID ${movieId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };

  /**
   * Controller function to delete a movie
   *
   * @param req
   * @param res
   * @param next
   */
  static deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    const movieId = parseInt(req.params.id);

    try {
      const movie = await MovieService.deleteMovie(movieId);

      if (!movie) {
        throw createError(404, `Movie with ID ${movieId} not found`);
      }

      res.status(200).json({
        success: true,
        message: `Movie  with ID ${movieId} deleted successfully!`,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Movie with ID ${movieId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };
}

export default MovieController;
