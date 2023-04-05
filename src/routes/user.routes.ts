import {Router} from "express";
import UserController from "../controllers/user.controller";
import {validateUpdateAdminStatus} from "../validators/user";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = Router();

router.patch(
  "/",
  verifyToken,
  validateUpdateAdminStatus,
  UserController.updateAdminStatus
);
export default router;
