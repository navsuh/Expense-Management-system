import Joi from 'joi'
// import ObjectId  from 'joi-objectid';
// const JoiObjectId = ObjectId(Joi);

export const periodicExpenseSchema = Joi.object({
  households:Joi.string().min(3).max(100).required(),
  expensetypes:Joi.string().min(3).max(100).required(),
  frequency:Joi.string().min(3).max(50).required(),
  amount:Joi.number().min(0).required(),
  dueDate: Joi.string().required(),
  description:Joi.string().min(5).max(100).required(),
  paidThrough:Joi.string().min(3).max(50).required(),
  paidBy:Joi.string().min(3).max(50).required(),
  paymentDetails: Joi.object({
      amount: Joi.number().min(0).required(),
      date: Joi.string().required(),
      method: Joi.string().required()
    }).required()
})

export const updateperiodicExpenseSchema = Joi.object({
  households:Joi.string().min(5).max(100),
  expensetypes:Joi.string().min(5).max(100),
  frequency:Joi.string().min(3).max(50),
  amount:Joi.number().min(0),
  dueDate: Joi.string(),
  description:Joi.string().min(5).max(100),
  paidThrough:Joi.string().min(3).max(50),
  paidBy:Joi.string().min(3).max(50),
  paymentDetails: Joi.object({
      amount: Joi.number().min(0),
      date: Joi.string(),
      method: Joi.string()
    })
})

