import Joi from 'joi'  

export const resetPasswordSchema = Joi.object({
  
    newPassword: Joi.string().min(8).max(255).required(),
    confirmedPassword: Joi.string().min(8).max(255).required(),
  });