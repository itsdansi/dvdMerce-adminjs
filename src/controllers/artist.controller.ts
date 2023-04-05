import {Request, Response, NextFunction} from "express";
import ArtistService from "../services/artist.service";
import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";

interface AuthRequest extends Request {
  user?: any;
}

class ArtistController {
  /**
   * Controller function to fetch all artists
   *
   * @param req
   * @param res
   * @param next
   */
  static getAllArtists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artists = await ArtistService.getAllArtists();
      res.status(200).json({
        success: true,
        message: "Artists fetched successfully!",
        data: artists,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get a single artists by Id
   *
   * @param req
   * @param res
   * @param next
   */

  static getArtistById = async (req: Request, res: Response, next: NextFunction) => {
    const artistId = parseInt(req.params.id);

    try {
      const artist = await ArtistService.getArtistById(artistId);

      if (!artist) {
        throw createError(404, `Artist with ID ${artistId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Artist fetched successfully!",
        data: artist,
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
  static createArtist = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {firstName, lastName, awards, dob, dod} = req.body;
      // getting current userID
      const userId = req.user.id;
      const parseDob = new Date(Date.parse(dob));
      const parseDod = new Date(Date.parse(dob));

      const artist = await ArtistService.createArtist({
        firstName,
        lastName,
        awards,
        user: {
          connect: {
            id: userId,
          },
        },
        dob: parseDob,
        dod: parseDod,
      });

      res.status(201).json({
        success: true,
        message: "Artist created successfully!",
        data: artist,
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
   * Controller function to update a artist details
   *
   * @param req
   * @param res
   * @param next
   */
  static updateArtist = async (req: Request, res: Response, next: NextFunction) => {
    const artistId = parseInt(req.params.id);
    const updatePayload = req.body;

    try {
      const artist = await ArtistService.updateArtistById(artistId, updatePayload);

      if (!artist) {
        throw createError(404, `Artist with ID ${artistId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Artist updated successfully!",
        data: artist,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Artist with ID ${artistId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };

  /**
   * Controller function to delete a artist
   *
   * @param req
   * @param res
   * @param next
   */
  static deleteArtist = async (req: Request, res: Response, next: NextFunction) => {
    const artistId = parseInt(req.params.id);

    try {
      const artist = await ArtistService.deleteArtist(artistId);

      if (!artist) {
        throw createError(404, `Artist with ID ${artistId} not found`);
      }

      res.status(200).json({
        success: true,
        message: `Artist  with ID ${artistId} deleted successfully!`,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Artist with ID ${artistId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };
}

export default ArtistController;
