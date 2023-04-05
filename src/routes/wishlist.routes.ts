import express, {Router} from "express";
import WishlistController from "../controllers/wishlist.controller";
import {validateWishlistSchema} from "../validators/wishlist";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/", verifyToken, WishlistController.getAllWishlists);
router.get("/admin", verifyToken, isAdmin, WishlistController.getAllWishlistsForAdmin);
router.post("/", verifyToken, validateWishlistSchema, WishlistController.createWishlist);
router.get("/:id", verifyToken, WishlistController.getWishlistById);
router.delete("/:id", verifyToken, WishlistController.deleteWishlist);
export default router;
