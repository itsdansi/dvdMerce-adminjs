import express, {Request, Response, NextFunction, Router} from "express";
import DvdController from "../controllers/dvd.controller";
import {validateCreateDvdSchema, validateUpdateDvdSchema} from "../validators/dvd";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/dvds", DvdController.getAllDvds);
router.post(
  "/dvd",
  verifyToken,
  isAdmin,
  validateCreateDvdSchema,
  DvdController.createDvd
);
router.get("/dvds/movie/:id", DvdController.getDvdByMovieId);
router.get("/dvd/:id", DvdController.getDvdById);
router.patch(
  "/dvd/:id",
  verifyToken,
  isAdmin,
  validateUpdateDvdSchema,
  DvdController.updateDvdById
);
router.delete("/dvd/:id", verifyToken, isAdmin, DvdController.deleteDvd);

export default router;
