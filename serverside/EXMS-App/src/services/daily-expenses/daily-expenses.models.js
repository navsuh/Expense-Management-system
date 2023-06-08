import Joi from 'joi'
// import ObjectId  from 'joi-objectid';
// const JoiObjectId = ObjectId(Joi);
const attr = {
    households:Joi.string().required(),
    expensetypes:Joi.string().required(),
    description:Joi.string().min(6).max(80).required(),
    paidThrough:Joi.string().min(3).max(50).required(),
    paidBy:Joi.string().min(3).max(50).required(),
    paymentDetails: Joi.object({
        amount: Joi.number().min(0).required(),
        date: Joi.string().required(),
        method: Joi.string().required()
      }).required()
}
export const dailyExpenseSchema = Joi.object(attr)


