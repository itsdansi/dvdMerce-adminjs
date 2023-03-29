import jwt, {Secret} from "jsonwebtoken";
import createError, {HttpError} from "http-errors";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret: Secret | undefined = process.env.ACCESS_TOKEN_SECRET;

interface Payload {
  [key: string]: any;
}

interface Token {
  token: string;
}

export const signAccessToken = (payload: Payload): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!accessTokenSecret) {
      reject(createError.InternalServerError());
    }
    jwt.sign(payload, accessTokenSecret as Secret, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token as any);
    });
  });
};

export const verifyAccessToken = (token: string): Promise<Payload> => {
  return new Promise((resolve, reject) => {
    if (!accessTokenSecret) {
      reject(createError.InternalServerError());
    }
    jwt.verify(token, accessTokenSecret as Secret, (err, payload) => {
      if (err) {
        const message = err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        reject(createError.Unauthorized(message) as HttpError);
      }
      resolve(payload as Payload);
    });
  });
};
