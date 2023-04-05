import express, {Request, Response, NextFunction, Router} from "express";
import RatingController from "../controllers/rating.controller";
import {validateRatingSchema} from "../validators/rating";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/", RatingController.getAllRatings);
router.post("/", verifyToken, validateRatingSchema, RatingController.createRating);
router.get("/:id", RatingController.getRatingById);
router.patch(
  "/:id",
  verifyToken,
  validateRatingSchema,
  RatingController.updateRatingById
);
export default router;
