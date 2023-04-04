import {Router} from "express";
import {validateLoginSchema, validateRegisterSchema} from "../validators/auth";
import AuthController from "../controllers/auth.controller";

const router: Router = Router();

router.post("/register", validateRegisterSchema, AuthController.register);
router.post("/login", validateLoginSchema, AuthController.login);

export default router;
