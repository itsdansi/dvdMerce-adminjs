import Joi from "joi";

/**
 * CreateGenre Schema
 */
export const GenreSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
});
