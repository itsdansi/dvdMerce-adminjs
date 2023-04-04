import {Request, Response, NextFunction} from "express";
import {LoginSchema, RegisterSchema} from "./schema/auth";
import {validate} from "../utils/requestValidator";

export async function validateLoginSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, LoginSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}
export async function validateRegisterSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {body} = req;
    await validate(body, RegisterSchema as any);
    next();
  } catch (error) {
    next(error);
  }
}

// export async function validateResetPasswordLinkSchema(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const {body} = req;
//     await validate(body, ResetPasswordLinkSchema);
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

// export async function validateResetPasswordSchema(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const {body} = req;
//     await validate(body, ResetPasswordSchema);
//     next();
//   } catch (error) {
//     next(error);
//   }
// }
