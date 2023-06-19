import Joi from 'joi'  

export const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    userName: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
    role: Joi.string().min(5).max(50),
    isActive:Joi.boolean()
  });

  export const userSchemaPatch = Joi.object({
    _id:Joi.string(),
    firstName: Joi.string().min(5).max(50),
    lastName: Joi.string().min(5).max(50),
    phone: Joi.string().length(10),
    userName: Joi.string().min(5).max(50),
    password: Joi.string().min(8).max(255),
    isActive:Joi.boolean(),
    lastLoggedIn:Joi.string(),
    updatedBy:Joi.string(),
    updatedAt:Joi.string(),
  });