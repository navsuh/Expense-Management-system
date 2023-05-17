import Joi from 'joi'
const attrs = {
  email: Joi.string().email().required(),
}

export const forgotPasswordsSchema = Joi.object(attrs)
