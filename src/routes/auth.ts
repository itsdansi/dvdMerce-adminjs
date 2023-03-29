import express, {Request, Response, NextFunction, Router} from "express";
// import createError, {HttpError} from "http-errors";
import user from "../controllers/auth.controller";
import auth from "../middlewares/auth";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/register", user.register);
// login
router.post("/login", user.login);
// all users
router.get("/all", auth, user.all);

export default router;
