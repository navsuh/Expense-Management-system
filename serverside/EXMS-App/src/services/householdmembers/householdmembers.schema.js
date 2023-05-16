// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const householdMembersSchema = {
  $id: 'HouseholdMembers',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'text'],
  properties: {
    _id: ObjectIdSchema(),
    text: { type: 'string' }
  }
}
export const householdMembersValidator = getValidator(householdMembersSchema, dataValidator)
export const householdMembersResolver = resolve({})

export const householdMembersExternalResolver = resolve({})

// Schema for creating new data
export const householdMembersDataSchema = {
  $id: 'HouseholdMembersData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...householdMembersSchema.properties
  }
}
export const householdMembersDataValidator = getValidator(householdMembersDataSchema, dataValidator)
export const householdMembersDataResolver = resolve({})

// Schema for updating existing data
export const householdMembersPatchSchema = {
  $id: 'HouseholdMembersPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...householdMembersSchema.properties
  }
}
export const householdMembersPatchValidator = getValidator(householdMembersPatchSchema, dataValidator)
export const householdMembersPatchResolver = resolve({})

// Schema for allowed query properties
export const householdMembersQuerySchema = {
  $id: 'HouseholdMembersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(householdMembersSchema.properties)
  }
}
export const householdMembersQueryValidator = getValidator(householdMembersQuerySchema, queryValidator)
export const householdMembersQueryResolver = resolve({})
