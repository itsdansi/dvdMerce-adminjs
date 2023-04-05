import Joi from "joi";

/**
 * UpdateAdminStatus Schema
 */
export const UpdateAdminStatus = Joi.object({
  isAdmin: Joi.boolean().required(),
});
