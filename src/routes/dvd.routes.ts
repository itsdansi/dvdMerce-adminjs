import express, {Request, Response, NextFunction, Router} from "express";
import DvdController from "../controllers/dvd.controller";
import {validateCreateDvdSchema, validateUpdateDvdSchema} from "../validators/dvd";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/", DvdController.getAllDvds);
router.post("/", verifyToken, isAdmin, validateCreateDvdSchema, DvdController.createDvd);
router.get("/:id", DvdController.getDvdById);
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateUpdateDvdSchema,
  DvdController.updateDvdById
);
router.delete("/:id", verifyToken, isAdmin, DvdController.deleteDvd);

export default router;
