// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const forgotPasswordSchema = {
  $id: 'ForgotPassword',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'email'],
  properties: {
    _id: ObjectIdSchema(),
    email: { type: 'string' }
  }
}
export const forgotPasswordValidator = getValidator(forgotPasswordSchema, dataValidator)
export const forgotPasswordResolver = resolve({})

export const forgotPasswordExternalResolver = resolve({})

// Schema for creating new data
export const forgotPasswordDataSchema = {
  $id: 'ForgotPasswordData',
  type: 'object',
  additionalProperties: false,
  required: ['email'],
  properties: {
    ...forgotPasswordSchema.properties
  }
}
export const forgotPasswordDataValidator = getValidator(forgotPasswordDataSchema, dataValidator)
export const forgotPasswordDataResolver = resolve({})

// Schema for updating existing data
export const forgotPasswordPatchSchema = {
  $id: 'ForgotPasswordPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...forgotPasswordSchema.properties
  }
}
export const forgotPasswordPatchValidator = getValidator(forgotPasswordPatchSchema, dataValidator)
export const forgotPasswordPatchResolver = resolve({})

// Schema for allowed query properties
export const forgotPasswordQuerySchema = {
  $id: 'ForgotPasswordQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(forgotPasswordSchema.properties)
  }
}
export const forgotPasswordQueryValidator = getValidator(forgotPasswordQuerySchema, queryValidator)
export const forgotPasswordQueryResolver = resolve({})
