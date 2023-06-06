import Joi from 'joi'
const attrs = {
  name: Joi.string().min(3).max(50).required(),
  addressLine1: Joi.string().min(3).max(50).required(),
  addressLine2: Joi.string().min(3).max(50).required(),
  area: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(50).required(),
  state: Joi.string().min(3).max(50).required(),
  zipcode: Joi.number().min(4).required(),

}
export const householdSchema = Joi.object(attrs)
