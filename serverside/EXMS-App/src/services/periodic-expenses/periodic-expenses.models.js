import Joi from 'joi'
import ObjectId  from 'joi-objectid';

const JoiObjectId = ObjectId(Joi);
const attr = {
    householdsId:JoiObjectId().required(),
    frequency:Joi.string().min(3).max(50).required(),
    amount:Joi.number().min(0).required(),
    dueDate: Joi.object({
        day: Joi.number().required(),
        month: Joi.number().required(),
        year: Joi.number().required()
      }).required(),
    expensetypesId:JoiObjectId().required(),
    description:Joi.string().min(5).max(100).required(),
    paidThrough:Joi.string().min(3).max(50).required(),
    paidBy:Joi.string().min(3).max(50).required(),
    paymentDetails: Joi.object({
        amount: Joi.number().min(0).required(),
        date: Joi.string().required(),
        method: Joi.string().required()
      }).required()
}
export const periodicExpenseSchema = Joi.object(attr)


