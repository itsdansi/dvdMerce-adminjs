import express, {Request, Response, NextFunction, Router} from "express";
import auth from "./auth";
import createError, {HttpError} from "http-errors";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use("/auth", auth);

router.use(async (req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound("Route not Found"));
});

router.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    code: err.statusCode,
    message: err.message,
  });
});

export default router;
