import express, {Request, Response, NextFunction, Router} from "express";
import MovieController from "../controllers/movie.controller";
import {validateCreateMovieSchema, validateUpdateSchema} from "../validators/movie";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/movies", MovieController.getAllMovies);
router.post(
  "/movie",
  verifyToken,
  isAdmin,
  validateCreateMovieSchema,
  MovieController.createMovie
);
router.get("/movies/genre/:id", MovieController.getMovieByGenreId);
router.get("/movie/:id", MovieController.getMovieById);
router.patch(
  "/movie/:id",
  verifyToken,
  isAdmin,
  validateUpdateSchema,
  MovieController.updateMovie
);
router.delete("/movie/:id", verifyToken, isAdmin, MovieController.deleteMovie);

export default router;
