// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const dailyExpensesSchema = {
  $id: 'DailyExpenses',
  type: 'object',
  additionalProperties: false,
  required: ['_id','households',"expensetypes","paymentDetails","description","paidThrough","paidBy"], //expensetypes
  properties: {
    _id: ObjectIdSchema(),
    households:{type:"object"},
    expensetypes:{type:"object"},
    description:{type:"string"},
    paidThrough:{type:"string"},
    paidBy:{type:"string"},
    paymentDetails: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        date: { type: 'string', format: 'date' },
        method: { type: 'string' }
      }
    }
  }
}
export const dailyExpensesValidator = getValidator(dailyExpensesSchema, dataValidator)
export const dailyExpensesResolver = resolve({})

export const dailyExpensesExternalResolver = resolve({})

// Schema for creating new data
export const dailyExpensesDataSchema = {
  $id: 'DailyExpensesData',
  type: 'object',
  additionalProperties: false,
  required: ['households',"expensetypes","paymentDetails","description","paidThrough","paidBy"],
  properties: {
    ...dailyExpensesSchema.properties
  }
}
export const dailyExpensesDataValidator = getValidator(dailyExpensesDataSchema, dataValidator)
export const dailyExpensesDataResolver = resolve({})

// Schema for updating existing data
export const dailyExpensesPatchSchema = {
  $id: 'DailyExpensesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...dailyExpensesSchema.properties
  }
}
export const dailyExpensesPatchValidator = getValidator(dailyExpensesPatchSchema, dataValidator)
export const dailyExpensesPatchResolver = resolve({})

// Schema for allowed query properties
export const dailyExpensesQuerySchema = {
  $id: 'DailyExpensesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(dailyExpensesSchema.properties)
  }
}
export const dailyExpensesQueryValidator = getValidator(dailyExpensesQuerySchema, queryValidator)
export const dailyExpensesQueryResolver = resolve({})
