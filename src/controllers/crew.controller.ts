import {Request, Response, NextFunction} from "express";
import CrewService from "../services/crew.services";
import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";

interface AuthRequest extends Request {
  user?: any;
}

class CrewController {
  /**
   * Controller function to fetch all crew members
   *
   * @param req
   * @param res
   * @param next
   */
  static getAllArtists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const crews = await CrewService.getAllCrews();
      res.status(200).json({
        success: true,
        message: "Crew fetched successfully!",
        data: crews,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to fetch all crew members of a specific movie
   *
   * @param req
   * @param res
   * @param next
   */
  static getCrewsbyMovieId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movieId = parseInt(req.params.id);
      const crews = await CrewService.getCrewsbyMovieId(movieId);
      console.log(crews);

      if (!crews) {
        throw createError(404, `Crew of movieId ${movieId} not found!`);
      }
      res.status(200).json({
        success: true,
        message: "Crew fetched successfully!",
        data: crews,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get a single crew member by Id
   *
   * @param req
   * @param res
   * @param next
   */

  static getArtistById = async (req: Request, res: Response, next: NextFunction) => {
    const crewId = parseInt(req.params.id);

    try {
      const crew = await CrewService.getCrewById(crewId);

      if (!crew) {
        throw createError(404, `Crew with ID ${crewId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Crew fetched successfully!",
        data: crew,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to create a new artist
   *
   * @param req
   * @param res
   * @param next
   */
  static createCrew = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {role, characterName, artistId, movieId} = req.body;
      // getting current userID
      const userId = req.user.id;

      const crew = await CrewService.createCrew({
        role,
        characterName,
        artist: {
          connect: {
            id: artistId,
          },
        },
        movie: {
          connect: {
            id: movieId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      });

      res.status(201).json({
        success: true,
        message: "Crew created successfully!",
        data: crew,
      });
    } catch (error: HttpError | any) {
      //   console.log(error);
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
   * Controller function to update a artist details
   *
   * @param req
   * @param res
   * @param next
   */
  static updateCrew = async (req: Request, res: Response, next: NextFunction) => {
    const crewId = parseInt(req.params.id);
    const updatePayload = req.body;

    try {
      const crew = await CrewService.updateCrewById(crewId, updatePayload);

      if (!crew) {
        throw createError(404, `Crew member with ID ${crewId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Crew member updated successfully!",
        data: crew,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Crew member with ID ${crewId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };

  /**
   * Controller function to delete a crew
   *
   * @param req
   * @param res
   * @param next
   */
  static deleteCrew = async (req: Request, res: Response, next: NextFunction) => {
    const crewId = parseInt(req.params.id);

    try {
      const crew = await CrewService.deleteCrew(crewId);

      if (!crew) {
        throw createError(404, `Crew Member with ID ${crewId} not found`);
      }

      res.status(200).json({
        success: true,
        message: `Crew Member  with ID ${crewId} deleted successfully!`,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Crew Member with ID ${crewId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };
}

export default CrewController;
