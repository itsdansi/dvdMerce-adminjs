import express, {Request, Response, NextFunction, Router} from "express";
import MovieController from "../controllers/movie.controller";
import {validateCreateMovieSchema, validateUpdateSchema} from "../validators/movie";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/", MovieController.getAllMovies);
router.post(
  "/",
  verifyToken,
  isAdmin,
  validateCreateMovieSchema,
  MovieController.createMovie
);
router.get("/:id", MovieController.getMovieById);
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateUpdateSchema,
  MovieController.updateMovie
);
router.delete("/:id", verifyToken, isAdmin, MovieController.deleteMovie);

export default router;
