import {Request, Response, NextFunction} from "express";
import * as jwt from "../utils/jwt";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";
// import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken";
// import {PrismaClient} from "@prisma/client";
// const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: any;
}

const secret = process.env.ACCESS_TOKEN_SECRET;

export async function getCurrentUserId(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    // const decodedToken = jwt.verify(token, secret as string) as JwtPayload;
    // return decodedToken.userId;

    const user = await jwt.verifyAccessToken(token);
    req.user = user;
    // console.log({user});

    next(user);
  } catch (err) {
    console.log(err);

    console.error(err as VerifyErrors);
    return null;
  }
}
