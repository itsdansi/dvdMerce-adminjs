import {Request, Response, NextFunction} from "express";
// import UserService from "../services/artist.service";\
import UserService from "../services/user.service";
import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";

interface AuthRequest extends Request {
  user?: any;
}

class UserController {
  /**
   * Controller function to update a adminStaus of a user
   *
   * @param req
   * @param res
   * @param next
   */

  static updateAdminStatus = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user.id;
    const updatePayload = JSON.parse(req.body.isAdmin);

    console.log({userId});
    console.log({updatePayload});

    try {
      const user = await UserService.updateAdminStatus(userId, updatePayload);

      if (!user) {
        throw createError(404, `User with ID ${userId} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Admin status updated successfully!",
        data: user,
      });
    } catch (error: HttpError | any) {
      console.log(error);

      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2025") {
        next(createError(404, `Artist with ID ${userId} not found`));
      } else {
        next(createError(error.statusCode, error.message));
      }
    }
  };
}

export default UserController;
