import {Router} from "express";
import GenreController from "../controllers/genre.controller";
import {validateGenereSchema} from "../validators/genre";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = Router();

router.get("/genres", GenreController.getAllGenres);
router.post(
  "/genre",
  verifyToken,
  isAdmin,
  validateGenereSchema,
  GenreController.createGenre
);
router.get("/genre/:id", GenreController.getGenreById);
router.patch(
  "/genre/:id",
  verifyToken,
  isAdmin,
  validateGenereSchema,
  GenreController.updateGenre
);
router.delete("/genre/:id", verifyToken, isAdmin, GenreController.deleteGenre);

export default router;
