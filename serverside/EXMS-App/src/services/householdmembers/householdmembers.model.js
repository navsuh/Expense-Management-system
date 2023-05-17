import Joi from 'joi'  

export const householdmembersSchema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    userName: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
    households:Joi.string().min(5).max(50).required()
    // role: Joi.string().min(5).max(50)
  });
