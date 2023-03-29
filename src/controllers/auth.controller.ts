import {Request, Response, NextFunction} from "express";
import AuthService from "../services/auth.services";
import createError, {HttpError} from "http-errors";
import {Prisma} from "@prisma/client";

// const [register, login, all] = AuthService

class AuthController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.register(req.body);

      console.log(user);

      res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: HttpError | any) {
      const prismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ? error : undefined;

      if (prismaError && prismaError.code == "P2002") {
        next(createError(409, "Email already taken!"));
      } else {
        next(createError(500, "Internal Server Error"));
      }
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AuthService.login(req.body);
      res.status(200).json({
        status: true,
        message: "Account login successful",
        data,
      });
    } catch (error: any) {
      next(createError(error.statusCode, error.message));
    }
  };

  static all = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await AuthService.all();
      res.status(200).json({
        status: true,
        message: "All users",
        data: users,
      });
    } catch (error: any) {
      next(createError(error.statusCode, error.message));
    }
  };
}

export default AuthController;
