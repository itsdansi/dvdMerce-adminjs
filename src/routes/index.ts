import {Request, Response, NextFunction, Router} from "express";
import authRoute from "./auth.routes";
import genreRoute from "./genre.routes";
import movieRoute from "./movie.routes";
import createError, {HttpError} from "http-errors";

const router: Router = Router();

router.use("/auth", authRoute);
router.use("/genre", genreRoute);
router.use("/movie", movieRoute);

router.use(async (req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound("Route not Found"));
});

// error handling function for routes
router.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    code: err.statusCode,
    message: err.message,
  });
});

export default router;
