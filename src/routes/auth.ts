import express, {Request, Response, NextFunction, Router} from "express";
import {validateLoginSchema, validateRegisterSchema} from "../validators/auth";
// import createError, {HttpError} from "http-errors";
import user from "../controllers/auth.controller";
// import auth from "../middlewares/auth";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/register", validateRegisterSchema, user.register);
// login
router.post("/login", validateLoginSchema, user.login);

export default router;
