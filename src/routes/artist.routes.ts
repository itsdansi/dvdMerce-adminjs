import express, {Request, Response, NextFunction, Router} from "express";
import ArtistController from "../controllers/artist.controller";
import {validateArtistSchema} from "../validators/artist";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = Router();

router.get("/artists", ArtistController.getAllArtists);
router.post(
  "/artist",
  verifyToken,
  isAdmin,
  validateArtistSchema,
  ArtistController.createArtist
);
router.get("/artist/:id", ArtistController.getArtistById);
router.patch(
  "/artist/:id",
  verifyToken,
  isAdmin,
  validateArtistSchema,
  ArtistController.updateArtist
);
router.delete("/artist/:id", verifyToken, isAdmin, ArtistController.deleteArtist);

export default router;
