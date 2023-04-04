import Joi from "joi";

/**
 * CreateMovie Schema
 */
export const createMovieSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  plot: Joi.string(),
  genreId: Joi.number().required(),
  imageUrl: Joi.string().uri(),
  releaseDate: Joi.date(),
});

/**
 * updateMovie Schema
 */
export const updateMovieSchema = Joi.object({
  title: Joi.string().min(3).max(20),
  plot: Joi.string(),
  genreId: Joi.number(),
  imageUrl: Joi.string().uri(),
  releaseDate: Joi.date(),
});
