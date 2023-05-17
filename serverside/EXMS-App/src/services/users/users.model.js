import Joi from 'joi'  

export const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    userName: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
    role: Joi.string().min(5).max(50)
  });

  export const userSchemaPatch = Joi.object({
    firstName: Joi.string().min(5).max(50),
    lastName: Joi.string().min(5).max(50),
    email: Joi.string().email(),
    phone: Joi.string().length(10),
    userName: Joi.string().min(5).max(50),
    password: Joi.string().min(8).max(255),
    role: Joi.string().min(5).max(50)
  });