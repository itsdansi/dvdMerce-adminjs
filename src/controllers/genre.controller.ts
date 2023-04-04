import {Request, Response, NextFunction} from "express";
import GenreService from "../services/genre.services";
import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";

class GenreController {
  static getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const genres = await GenreService.getAllGenres();
      res.status(200).json({
        success: true,
        message: "Genres fetched successfully!",
        data: genres,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  static getGenreById = async (req: Request, res: Response, next: NextFunction) => {
    const genreId = parseInt(req.params.id);

    try {
      const genre = await GenreService.getGenreById(genreId);

      if (!genre) {
        throw createError(404, `Genre with ID ${genreId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Genre fetched successfully!",
        data: genre,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  static createGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const genre = await GenreService.createGenre(req.body);

      res.status(201).json({
        success: true,
        message: "Genre created successfully!",
        data: genre,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  static updateGenre = async (req: Request, res: Response, next: NextFunction) => {
    const genreId = parseInt(req.params.id);
    const updatePayload = req.body;

    try {
      const genre = await GenreService.updateGenreById(genreId, updatePayload);

      if (!genre) {
        throw createError(404, `Genre with ID ${genreId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Genre updated successfully!",
        data: genre,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Genre with ID ${genreId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };

  static deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
    const genreId = parseInt(req.params.id);

    try {
      const genre = await GenreService.deleteGenre(genreId);

      if (!genre) {
        throw createError(404, `Genre with ID ${genreId} not found`);
      }

      res.status(200).json({
        success: true,
        message: `Genre  with ID ${genreId} deleted successfully!`,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Genre with ID ${genreId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };
}

export default GenreController;
