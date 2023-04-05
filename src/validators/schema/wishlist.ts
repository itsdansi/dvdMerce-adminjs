import Joi from "joi";

/**
 * Wishlist Schema
 */
export const wishlistSchema = Joi.object({
  userId: Joi.number().required(),
  dvdId: Joi.number().required(),
});
