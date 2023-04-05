import {Router} from "express";
import CrewController from "../controllers/crew.controller";
import {validateCreateCrew, validateUpdateCrew} from "../validators/movie_crew";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = Router();

router.get("/", CrewController.getAllArtists);
router.post("/", verifyToken, isAdmin, validateCreateCrew, CrewController.createCrew);
router.get("/movie/:id", CrewController.getCrewsbyMovieId);
router.get("/:id", CrewController.getArtistById);
router.patch("/:id", verifyToken, isAdmin, validateUpdateCrew, CrewController.updateCrew);
router.delete("/:id", verifyToken, isAdmin, CrewController.deleteCrew);

export default router;
