import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import * as jwt from "../utils/jwt";

dotenv.config();

const prisma = new PrismaClient();

interface UserData {
  email: string;
  password: string;
  name: string;
  [key: string]: any;
}

interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  public static async register(data: UserData): Promise<UserData> {
    // console.log("----------------> from auth service");

    const {email} = data;
    data.password = bcrypt.hashSync(data.password, 8);
    const user = await prisma.user.create({
      data,
    });
    // console.log("----------------> from ");

    // data.accessToken = await jwt.signAccessToken(user);
    return data;
  }

  static async login(
    data: LoginData
  ): Promise<{user: Omit<UserData, "password">; accessToken: string}> {
    const {email, password} = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw createError.NotFound("User don't exists!");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      throw createError.Unauthorized("Invalid credentials!");
    }
    // delete user.password;
    const accessToken = await jwt.signAccessToken(user);
    return {user, accessToken};
  }

  static async all(): Promise<UserData[] | any> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}

export default AuthService;
