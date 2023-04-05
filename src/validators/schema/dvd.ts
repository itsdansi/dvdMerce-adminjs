import Joi from "joi";

/**
 * CreateDvd Schema
 */
export const createDvdSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  desc: Joi.string(),
  sku: Joi.number().required(),
  length: Joi.string().required(),
  size: Joi.string().required(),
  price: Joi.number().required(),
  movieId: Joi.number().required(),
  // userId: Joi.number().required(),
  status: Joi.boolean(),
});

/**
 * updateDvd Schema
 */
export const updateDvdSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  desc: Joi.string(),
  sku: Joi.number(),
  length: Joi.string(),
  size: Joi.string(),
  price: Joi.number(),
  movieId: Joi.number(),
  // userId: Joi.number(),
  status: Joi.boolean(),
});
