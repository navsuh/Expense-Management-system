// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const changepasswordSchema = {
  $id: 'Changepassword',
  type: 'object',
  additionalProperties: false,
    required: ['currentPassword', 'newPassword', 'email', 'confirmedPassword'],
  properties: {
    //...changepasswordSchema.properties
    currentPassword: { type: 'string' },
    newPassword: { type: 'string' },
    confirmedPassword: { type: 'string' },
    email: { type: 'string',format: 'email' },
  }
}
export const changepasswordValidator = getValidator(changepasswordSchema, dataValidator)
export const changepasswordResolver = resolve({})

export const changepasswordExternalResolver = resolve({})

// Schema for creating new data
export const changepasswordDataSchema = {
  $id: 'ChangepasswordData',
  type: 'object',
  additionalProperties: false,
  required: ['currentPassword', 'newPassword', 'email', 'confirmedPassword'],
  properties: {
    ...changepasswordSchema.properties
  }
}
export const changepasswordDataValidator = getValidator(changepasswordDataSchema, dataValidator)
export const changepasswordDataResolver = resolve({})

