import {PrismaClient, User} from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import * as jwt from "../utils/jwt";
import {CreateUserDto, LoginUserDto, UpdatePasswordDto} from "../dtos/auth.dto";

dotenv.config();

const prisma = new PrismaClient();

interface UserData {
  email: string;
  password: string;
  name: string;
  [key: string]: any;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface UpdatePasswordPayload {}

class AuthService {
  public static async register(data: CreateUserDto): Promise<Omit<UserData, "password">> {
    const {email} = data;
    data.password = bcrypt.hashSync(data.password, 8);
    const user = await prisma.user.create({
      data,
    });
    const {password, ...rest} = user;

    return rest;
  }

  static async login(
    data: LoginPayload
  ): Promise<{user: Omit<User, "password">; accessToken: string}> {
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
    const {password: _, ...userWithoutPassword} = user; // Used destructuring and renaming to remove the password field
    const accessToken = await jwt.signAccessToken(userWithoutPassword);
    return {user: userWithoutPassword, accessToken};
  }
}

export default AuthService;
