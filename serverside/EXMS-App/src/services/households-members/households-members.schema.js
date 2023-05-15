// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const householdsMembersSchema = {
  $id: 'HouseholdsMembers',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'text'],
  properties: {
    _id: ObjectIdSchema(),
    text: { type: 'string' }
  }
}
export const householdsMembersValidator = getValidator(householdsMembersSchema, dataValidator)
export const householdsMembersResolver = resolve({})

export const householdsMembersExternalResolver = resolve({})

// Schema for creating new data
export const householdsMembersDataSchema = {
  $id: 'HouseholdsMembersData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...householdsMembersSchema.properties
  }
}
export const householdsMembersDataValidator = getValidator(householdsMembersDataSchema, dataValidator)
export const householdsMembersDataResolver = resolve({})

// Schema for updating existing data
export const householdsMembersPatchSchema = {
  $id: 'HouseholdsMembersPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...householdsMembersSchema.properties
  }
}
export const householdsMembersPatchValidator = getValidator(householdsMembersPatchSchema, dataValidator)
export const householdsMembersPatchResolver = resolve({})

// Schema for allowed query properties
export const householdsMembersQuerySchema = {
  $id: 'HouseholdsMembersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(householdsMembersSchema.properties)
  }
}
export const householdsMembersQueryValidator = getValidator(householdsMembersQuerySchema, queryValidator)
export const householdsMembersQueryResolver = resolve({})
