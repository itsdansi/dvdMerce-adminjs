import {Request, Response, NextFunction} from "express";
// import DvdService from "../services/movie.services";
import DvdService from "../services/dvd.services";

import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";
import {getCurrentUserId} from "../middlewares/getCurrentUserId";

interface AuthRequest extends Request {
  user?: any;
}

class DvdController {
  /**
   * Controller function to fetch all dvds
   *
   * @param req ]
   * @param res
   * @param next
   */
  static getAllDvds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dvds = await DvdService.getAllDvds();
      res.status(200).json({
        success: true,
        message: "Dvds fetched successfully!",
        data: dvds,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get a single dvd by Id
   *
   * @param req
   * @param res
   * @param next
   */

  static getDvdById = async (req: Request, res: Response, next: NextFunction) => {
    const dvdId = parseInt(req.params.id);

    try {
      const dvd = await DvdService.getDvdById(dvdId);

      if (!dvd) {
        throw createError(404, `Dvd with ID ${dvdId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Dvd fetched successfully!",
        data: dvd,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get all Dvd of a movie
   *
   * @param req
   * @param res
   * @param next
   */

  static getDvdByMovieId = async (req: Request, res: Response, next: NextFunction) => {
    const movieId = parseInt(req.params.id);

    try {
      const dvd = await DvdService.getDvdByMovieId(movieId);

      if (!dvd) {
        throw createError(404, `Dvd having movieId ${movieId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Dvd fetched successfully!",
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
  static createDvd = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {title, desc, sku, length, size, price, movieId} = req.body;
      const currentUser = await getCurrentUserId(req, res, () => {});
      const userId = req.user.id;

      const dvd = await DvdService.createDvd({
        title,
        desc,
        sku,
        length,
        size,
        price,
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
        message: "Dvd created successfully!",
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
  static updateDvdById = async (req: Request, res: Response, next: NextFunction) => {
    const dvdId = parseInt(req.params.id);
    const updatePayload = req.body;

    try {
      const dvd = await DvdService.updateDvdById(dvdId, updatePayload);

      if (!dvd) {
        throw createError(404, `Dvd with ID ${dvdId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Dvd updated successfully!",
        data: dvd,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Dvd with ID ${dvdId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };

  /**
   * Controller function to delete a dvd
   *
   * @param req
   * @param res
   * @param next
   */
  static deleteDvd = async (req: Request, res: Response, next: NextFunction) => {
    const dvdId = parseInt(req.params.id);

    try {
      const dvd = await DvdService.deleteDvd(dvdId);

      if (!dvd) {
        throw createError(404, `Dvd with ID ${dvdId} not found`);
      }

      res.status(204).json({
        success: true,
        code: 204,
        message: `Dvd  with ID ${dvdId} deleted successfully!`,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Dvd with ID ${dvdId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };
}

export default DvdController;
