// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const periodicExpensesSchema = {
  $id: 'PeriodicExpenses',
  type: 'object',
  additionalProperties: false,
  required: ['_id','households',"frequency","amount","dueDate","paymentdetails","description","paidThrough","paidBy",],  // expensetypesid 
  properties: {
    _id: ObjectIdSchema(),
    households:{type:"object"},
    frequency: { type: 'string' },
    dueDate:{type :"object"},
    amount:{type:"number"},
    description:{type:"string"},
    paidThrough:{type:"string"},
    paidBy:{type:"string"},

    paymentDetails: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        // date: { type: 'string', format: 'date' },
        method: { type: 'string' }
      }
    }
  }
}
export const periodicExpensesValidator = getValidator(periodicExpensesSchema, dataValidator)
export const periodicExpensesResolver = resolve({})

export const periodicExpensesExternalResolver = resolve({})

// Schema for creating new data
export const periodicExpensesDataSchema = {
  $id: 'PeriodicExpensesData',
  type: 'object',
  additionalProperties: false,
  required: ['households',"frequency","amount","dueDate", "paymentDetails","description","paidThrough","paidBy"],
  properties: {
    ...periodicExpensesSchema.properties
  }
}
export const periodicExpensesDataValidator = getValidator(periodicExpensesDataSchema, dataValidator)
export const periodicExpensesDataResolver = resolve({})

// Schema for updating existing data
export const periodicExpensesPatchSchema = {
  $id: 'PeriodicExpensesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...periodicExpensesSchema.properties
  }
}
export const periodicExpensesPatchValidator = getValidator(periodicExpensesPatchSchema, dataValidator)
export const periodicExpensesPatchResolver = resolve({})

// Schema for allowed query properties
export const periodicExpensesQuerySchema = {
  $id: 'PeriodicExpensesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(periodicExpensesSchema.properties)
  }
}
export const periodicExpensesQueryValidator = getValidator(periodicExpensesQuerySchema, queryValidator)
export const periodicExpensesQueryResolver = resolve({})
