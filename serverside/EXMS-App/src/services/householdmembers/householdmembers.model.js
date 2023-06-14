import Joi from 'joi'  

export const householdmembersSchema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    userName: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(8).max(1052).required(),
    householdName:Joi.string().required(),
    role: Joi.string().min(5).max(50).required(),
    householdId: Joi.string(),
    primaryuserId: Joi.string(),
  });

  export const updatehouseholdmembersSchema = Joi.object({
    firstName: Joi.string().min(5).max(50),
    lastName: Joi.string().min(5).max(50),
  
    phone: Joi.string().length(10),
    userName: Joi.string().min(5).max(50),
    householdName:Joi.string(),
    memberUserId:Joi.string(),
    primaryuserId:Joi.string(),
    householdId:Joi.string(),



  });
