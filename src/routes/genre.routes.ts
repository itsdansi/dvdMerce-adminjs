import express, {Request, Response, NextFunction, Router} from "express";
import GenreController from "../controllers/genre.controller";
import {validateGenereSchema} from "../validators/genre";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/", GenreController.getAllGenres);
router.post("/", verifyToken, isAdmin, validateGenereSchema, GenreController.createGenre);
router.get("/:id", GenreController.getGenreById);
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateGenereSchema,
  GenreController.updateGenre
);
router.delete("/:id", verifyToken, isAdmin, GenreController.deleteGenre);

export default router;
