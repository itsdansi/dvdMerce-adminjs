import {Router} from "express";
import CrewController from "../controllers/crew.controller";
import {validateCreateCrew, validateUpdateCrew} from "../validators/movie_crew";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = Router();

router.get("/crews/", CrewController.getAllArtists);
router.post("/crew", verifyToken, isAdmin, validateCreateCrew, CrewController.createCrew);
router.get("/crews/movie/:id", CrewController.getCrewsbyMovieId);
router.get("/crew/:id", CrewController.getCrewById);
router.patch(
  "/crews/:id",
  verifyToken,
  isAdmin,
  validateUpdateCrew,
  CrewController.updateCrew
);
router.delete("/crews/:id", verifyToken, isAdmin, CrewController.deleteCrew);

export default router;
