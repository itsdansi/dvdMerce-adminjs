import Joi from "joi";

/**
 * Artist Schema
 */
export const artistSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  awards: Joi.string(),
  dob: Joi.date(),
  dod: Joi.date(),
});
