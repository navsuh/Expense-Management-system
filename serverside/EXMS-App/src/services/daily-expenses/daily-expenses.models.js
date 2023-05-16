import Joi from 'joi'
// import ObjectId  from 'joi-objectid';
// const JoiObjectId = ObjectId(Joi);
const attr = {
    households:Joi.string().min(3).max(100).required(),
    expensetypes:Joi.string().min(3).max(100).required(),
    description:Joi.string().min(5).max(100).required(),
    paidThrough:Joi.string().min(3).max(50).required(),
    paidBy:Joi.string().min(3).max(50).required(),
    paymentDetails: Joi.object({
        amount: Joi.number().min(0).required(),
        date: Joi.string().required(),
        method: Joi.string().required()
      }).required()
}
export const dailyExpenseSchema = Joi.object(attr)


