import {Request, Response, NextFunction} from "express";
import WishlistService from "../services/wishlist.services";

import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";
import {getCurrentUserId} from "../middlewares/getCurrentUserId";

interface AuthRequest extends Request {
  user?: any;
}

class WishlistController {
  /**
   * Controller function to fetch all wishlist of a current
   *
   * @param req
   * @param res
   * @param next
   */
  static getAllWishlists = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currentUser = await getCurrentUserId(req, res, () => {});
      const userId = req.user.id;

      const wishlist = await WishlistService.getAllWishlists(userId);
      res.status(200).json({
        success: true,
        message: "Wishlist fetched successfully!",
        data: wishlist,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to fetch all wishlist for admin
   *
   * @param req
   * @param res
   * @param next
   */
  static getAllWishlistsForAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currentUser = await getCurrentUserId(req, res, () => {});
      const userId = req.user.id;

      const wishlist = await WishlistService.getAllWishlistsForAdmin();
      res.status(200).json({
        success: true,
        message: "Wishlist fetched successfully!",
        data: wishlist,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to get a single wishlist by Id
   *
   * @param req
   * @param res
   * @param next
   */

  static getWishlistById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const wishlistId = parseInt(req.params.id);

    try {
      // const currentUser = await getCurrentUserId(req, res, () => {});
      const userId = req.user.id;

      const wishlist = await WishlistService.getWishlistById(wishlistId, userId);

      if (!wishlist) {
        throw createError(404, `Wishlist with ID ${wishlistId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Wishlist fetched successfully!",
        data: wishlist,
      });
    } catch (error: HttpError | any) {
      next(createError(error.statusCode, error.message));
    }
  };

  /**
   * Controller function to create a new wishlist
   *
   * @param req
   * @param res
   * @param next
   */
  static createWishlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {dvdId} = req.body;
      const currentUser = await getCurrentUserId(req, res, () => {});
      const userId = req.user.id;

      const wishlist = await WishlistService.createWishlist({
        dvdId,
        userId,
      });

      res.status(201).json({
        success: true,
        message: "Wishlist created successfully!",
        data: wishlist,
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

  static deleteWishlist = async (req: Request, res: Response, next: NextFunction) => {
    const wishlistId = parseInt(req.params.id);

    try {
      const wishlist = await WishlistService.deleteWishlist(wishlistId);

      if (!wishlist) {
        throw createError(404, `Wishlist with ID ${wishlistId} not found`);
      }

      res.status(200).json({
        success: true,
        message: `Wishlist  with ID ${wishlistId} deleted successfully!`,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Wishlist with ID ${wishlistId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };

  //   /**
  //    * Controller function to update a wihslist details
  //    *
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   static updateWishlistById = async (req: Request, res: Response, next: NextFunction) => {
  //     const wishlistId = parseInt(req.params.id);
  //     const updatePayload = req.body;

  //     try {
  //       const Wishlist = await WishlistService.updateWishlistById(wishlistId, updatePayload);

  //       if (!Wishlist) {
  //         throw createError(404, `Wishlist with ID ${wishlistId} not found`);
  //       }

  //       res.status(200).json({
  //         success: true,
  //         message: "Wishlist updated successfully!",
  //         data: Wishlist,
  //       });
  //     } catch (error: HttpError | any) {
  //       const prismaError =
  //         error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

  //       if (prismaError && prismaError.code == "P2025") {
  //         next(createError(404, `Wishlist with ID ${wishlistId} not found`));
  //       } else {
  //         next(createError(error.statusCode, error.message));
  //       }
  //     }
  //   };
}

export default WishlistController;
