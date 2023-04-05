import Joi from "joi";

/**
 * Create Crew Schema
 */
export const createCrewSchema = Joi.object({
  role: Joi.string().min(2).max(30).required(),
  characterName: Joi.string().min(2).max(30).required(),
  artistId: Joi.number().required(),
  movieId: Joi.number().required(),
});

/**
 * Update Crew Schema
 */
export const updateCrewSchema = Joi.object({
  role: Joi.string().min(2).max(30),
  characterName: Joi.string().min(2).max(30),
  artistId: Joi.number(),
  movieId: Joi.number(),
});
