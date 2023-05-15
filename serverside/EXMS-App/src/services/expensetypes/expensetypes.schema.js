// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const expenseTypesSchema = {
  $id: 'ExpenseTypes',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'name'],
  properties: {
    _id: ObjectIdSchema(),
    name: { type: 'string' }
  }
}
export const expenseTypesValidator = getValidator(expenseTypesSchema, dataValidator)
export const expenseTypesResolver = resolve({})

export const expenseTypesExternalResolver = resolve({})

// Schema for creating new data
export const expenseTypesDataSchema = {
  $id: 'ExpenseTypesData',
  type: 'object',
  additionalProperties: false,
  required: ['name'],
  properties: {
    ...expenseTypesSchema.properties
  }
}
export const expenseTypesDataValidator = getValidator(expenseTypesDataSchema, dataValidator)
export const expenseTypesDataResolver = resolve({})

// Schema for updating existing data
export const expenseTypesPatchSchema = {
  $id: 'ExpenseTypesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...expenseTypesSchema.properties
  }
}
export const expenseTypesPatchValidator = getValidator(expenseTypesPatchSchema, dataValidator)
export const expenseTypesPatchResolver = resolve({})

// Schema for allowed query properties
export const expenseTypesQuerySchema = {
  $id: 'ExpenseTypesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(expenseTypesSchema.properties)
  }
}
export const expenseTypesQueryValidator = getValidator(expenseTypesQuerySchema, queryValidator)
export const expenseTypesQueryResolver = resolve({})
