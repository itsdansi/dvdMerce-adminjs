import {Router} from "express";
import RatingController from "../controllers/rating.controller";
import {validateRatingSchema} from "../validators/rating";
import verifyToken from "../middlewares/auth";
const router: Router = Router();

router.get("/ratings", RatingController.getAllRatings);
router.post("/rating", verifyToken, validateRatingSchema, RatingController.createRating);
router.get("/rating/:id", RatingController.getRatingById);
router.patch(
  "/rating/:id",
  verifyToken,
  validateRatingSchema,
  RatingController.updateRatingById
);
export default router;
