import Joi from 'joi'
// import ObjectId  from 'joi-objectid';
// const JoiObjectId = ObjectId(Joi);
 
export const dailyExpenseSchema = Joi.object({
  households:Joi.string().required(),
  expensetypes:Joi.string().required(),
  description:Joi.string().min(6).max(80).required(),
  paidThrough:Joi.string().min(3).max(50).required(),
  paidBy:Joi.string().min(3).max(50).required(),
  paymentDetails: Joi.object({
      amount: Joi.number().min(0).required(),
      date: Joi.string().required(),
      method: Joi.string().min(3).max(50).required()
    }).required()
})

export const dailyPatchExpenseSchema = Joi.object({
  households:Joi.string(),
  expensetypes:Joi.string(),
  description:Joi.string().min(6).max(80),
  paidThrough:Joi.string().min(3).max(50),
  paidBy:Joi.string().min(3).max(50),
  paymentDetails: Joi.object({
      amount: Joi.number().min(0),
      date: Joi.string(),
      method: Joi.string()
    })
})

