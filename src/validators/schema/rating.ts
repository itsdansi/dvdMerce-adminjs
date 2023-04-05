import Joi from "joi";

/**
 * Rating Schema
 */
export const ratingSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  movieId: Joi.number().required(),
});
