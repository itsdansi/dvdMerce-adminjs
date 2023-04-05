import express, {Request, Response, NextFunction, Router} from "express";
import ArtistController from "../controllers/artist.controller";
import {validateArtistSchema} from "../validators/artist";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = Router();

router.get("/", ArtistController.getAllArtists);
router.post(
  "/",
  verifyToken,
  isAdmin,
  validateArtistSchema,
  ArtistController.createArtist
);
router.get("/:id", ArtistController.getArtistById);
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateArtistSchema,
  ArtistController.updateArtist
);
router.delete("/:id", verifyToken, isAdmin, ArtistController.deleteArtist);

export default router;
