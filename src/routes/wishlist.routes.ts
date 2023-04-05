import express, {Router} from "express";
import WishlistController from "../controllers/wishlist.controller";
import {validateWishlistSchema} from "../validators/wishlist";
import verifyToken, {isAdmin} from "../middlewares/auth";
const router: Router = express.Router();

router.get("/wishlists", verifyToken, WishlistController.getAllWishlists);
router.get(
  "/admin/wishlists",
  verifyToken,
  isAdmin,
  WishlistController.getAllWishlistsForAdmin
);
router.post(
  "/wishlist",
  verifyToken,
  validateWishlistSchema,
  WishlistController.createWishlist
);
router.get("/wishlist/:id", verifyToken, WishlistController.getWishlistById);
router.delete("/wishlist/:id", verifyToken, WishlistController.deleteWishlist);
export default router;
