// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { passwordHash } from '@feathersjs/authentication-local'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const usersSchema = {
  $id: 'Users',
  type: 'object',
  additionalProperties: false,
  required: ['_id','firstName','lastName', 'email','phone','userName','password'],
  properties: {
    _id: ObjectIdSchema(),
    firstName:{ type: 'string' },
    lastName:{ type: 'string' },
    email: { type: 'string',format: 'email' },
    phone:{ type: 'string' },
    userName:{ type: 'string' },
    password: { type: 'string' },
    role:{ type: 'string' },
    lastLoggedIn:{
      type: "string",
    format: "date-time",
    // default: (new Date()).toISOString()
  },
    isActive:{type:'boolean'},
    updatedBy:ObjectIdSchema(),
    updatedAt:{ type: "string",
    format: "date-time"}

  }
}
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve({})

export const usersExternalResolver = resolve({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new data
export const usersDataSchema = {
  $id: 'UsersData',
  type: 'object',
  additionalProperties: false,
  required: ['firstName','lastName', 'email','phone','userName','password'],
  properties: {
    ...usersSchema.properties
  }
}
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing data
export const usersPatchSchema = {
  $id: 'UsersPatch',
  type: 'object',
  additionalProperties: false,
  required: ['updatedBy','updatedAt'],
  properties: {
    ...usersSchema.properties
  }
}
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const usersQuerySchema = {
  $id: 'UsersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(usersSchema.properties)
  }
}
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id
    }

    return value
  }
})
