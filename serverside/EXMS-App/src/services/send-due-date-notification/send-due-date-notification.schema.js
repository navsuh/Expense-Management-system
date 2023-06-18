// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const sendDueDateNotificationSchema = {
  $id: 'SendDueDateNotification',
  type: 'object',
  additionalProperties: false,
  required: [ '_id',
  'households',
  'frequency',
  'amount',
  'dueDate',
  'expensetypes',
  'paymentDetails',
  'description',
  'paidThrough',
  'paidBy'],
  properties: {
    _id: ObjectIdSchema(),
    households: ObjectIdSchema(),
    frequency: { type: 'string' },
    dueDate: { type: 'string',format:"date" },
    expensetypes: ObjectIdSchema(),
    amount: { type: 'number'},
    description: { type: 'string' },
    paidThrough: { type: 'string' },
    paidBy: { type: 'string' },

    paymentDetails: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        date: { type: 'string' ,  format:"date"},
        method: { type: 'string' }
      }
    }
  }
}
export const sendDueDateNotificationValidator = getValidator(sendDueDateNotificationSchema, dataValidator)
export const sendDueDateNotificationResolver = resolve({})

export const sendDueDateNotificationExternalResolver = resolve({})

// Schema for creating new data
export const sendDueDateNotificationDataSchema = {
  $id: 'SendDueDateNotificationData',
  type: 'object',
  additionalProperties: false,
  required: ['households',
  'frequency',
  'amount',
  'dueDate',
  'expensetypes',
  'paymentDetails',
  'description',
  'paidThrough',
  'paidBy'],
  properties: {
    ...sendDueDateNotificationSchema.properties
  }
}
export const sendDueDateNotificationDataValidator = getValidator(
  sendDueDateNotificationDataSchema,
  dataValidator
)
export const sendDueDateNotificationDataResolver = resolve({})

// Schema for updating existing data
// export const sendDueDateNotificationPatchSchema = {
//   $id: 'SendDueDateNotificationPatch',
//   type: 'object',
//   additionalProperties: false,
//   required: [],
//   properties: {
//     ...sendDueDateNotificationSchema.properties
//   }
// }
// export const sendDueDateNotificationPatchValidator = getValidator(
//   sendDueDateNotificationPatchSchema,
//   dataValidator
// )
// export const sendDueDateNotificationPatchResolver = resolve({})

// Schema for allowed query properties
// export const sendDueDateNotificationQuerySchema = {
//   $id: 'SendDueDateNotificationQuery',
//   type: 'object',
//   additionalProperties: false,
//   properties: {
//     ...querySyntax(sendDueDateNotificationSchema.properties)
//   }
// }
// export const sendDueDateNotificationQueryValidator = getValidator(
//   sendDueDateNotificationQuerySchema,
//   queryValidator
// )
// export const sendDueDateNotificationQueryResolver = resolve({})
