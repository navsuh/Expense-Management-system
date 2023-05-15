// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const householdsSchema = {
  $id: 'Households',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'name',"addressLine1","addressLine2","area","city","state","zipcode"],
  properties: {
    _id: ObjectIdSchema(),
    name: { type: 'string' },
    addressLine1: {type:"string"},
    addressLine2: {type:"string"},
    area: {type:"string"},
    city: {type:"string"},
    state: {type:"string"},
    zipcode: {type:"number"},
  }
}
export const householdsValidator = getValidator(householdsSchema, dataValidator)
export const householdsResolver = resolve({})

export const householdsExternalResolver = resolve({})

// Schema for creating new data
export const householdsDataSchema = {
  $id: 'HouseholdsData',
  type: 'object',
  additionalProperties: false,
  required: [ 'name',"addressLine1","addressLine2","area","city","state","zipcode"],
  properties: {
    ...householdsSchema.properties
  }
}
export const householdsDataValidator = getValidator(householdsDataSchema, dataValidator)
export const householdsDataResolver = resolve({})

// Schema for updating existing data
export const householdsPatchSchema = {
  $id: 'HouseholdsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...householdsSchema.properties
  }
}
export const householdsPatchValidator = getValidator(householdsPatchSchema, dataValidator)
export const householdsPatchResolver = resolve({})

// Schema for allowed query properties
export const householdsQuerySchema = {
  $id: 'HouseholdsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(householdsSchema.properties)
  }
}
export const householdsQueryValidator = getValidator(householdsQuerySchema, queryValidator)
export const householdsQueryResolver = resolve({})
