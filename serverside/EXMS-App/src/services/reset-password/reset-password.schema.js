// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const resetPasswordSchema = {
  $id: 'ResetPassword',
  type: 'object',
  additionalProperties: false,
  required: ['newPassword', 'confirmedPassword'],
  properties: {
    
    newPassword: { type: 'string' },
    confirmedPassword: { type: 'string' },
    email: { type: 'string',format: 'email' }
  }
}
export const resetPasswordValidator = getValidator(resetPasswordSchema, dataValidator)
export const resetPasswordResolver = resolve({})

export const resetPasswordExternalResolver = resolve({})

// Schema for creating new data
export const resetPasswordDataSchema = {
  $id: 'ResetPasswordData',
  type: 'object',
  additionalProperties: false,
  required: ['newPassword', 'confirmedPassword'],
  properties: {
    ...resetPasswordSchema.properties
  }
}
export const resetPasswordDataValidator = getValidator(resetPasswordDataSchema, dataValidator)
export const resetPasswordDataResolver = resolve({})

// Schema for updating existing data
// export const resetPasswordPatchSchema = {
//   $id: 'ResetPasswordPatch',
//   type: 'object',
//   additionalProperties: false,
//   required: ['newPassword', 'confirmedPassword'],
//   properties: {
//     ...resetPasswordSchema.properties
//   }
// }
// export const resetPasswordPatchValidator = getValidator(resetPasswordPatchSchema, dataValidator)
// export const resetPasswordPatchResolver = resolve({})

// Schema for allowed query properties
// export const resetPasswordQuerySchema = {
//   $id: 'ResetPasswordQuery',
//   type: 'object',
//   additionalProperties: false,
//   properties: {
//     ...querySyntax(resetPasswordSchema.properties)
//   }
// }
// export const resetPasswordQueryValidator = getValidator(resetPasswordQuerySchema, queryValidator)
// export const resetPasswordQueryResolver = resolve({})
