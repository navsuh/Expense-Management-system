// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import validate from 'feathers-validate-joi'
import { userSchema,userSchemaPatch } from './users.model.js'
import { Admin} from './hooks/Admin.js'
import {Primaryuser } from './hooks/primaryuser.js'
import { Memberuser } from './hooks/memberuser.js'
import { EditUser } from './hooks/editingUser.js'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  usersDataValidator,
  usersPatchValidator,
  usersQueryValidator,
  usersResolver,
  usersExternalResolver,
  usersDataResolver,
  usersPatchResolver,
  usersQueryResolver
} from './users.schema.js'
import { UsersService, getOptions } from './users.class.js'
import { usersPath, usersMethods } from './users.shared.js'


export * from './users.class.js'
export * from './users.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const users = (app) => {
  // Register our service on the Feathers application
  app.use(usersPath, new UsersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: usersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(usersPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(usersExternalResolver), schemaHooks.resolveResult(usersResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(usersQueryValidator), schemaHooks.resolveQuery(usersQueryResolver)],
      find: [],
      get: [],
      create: [validate.form(userSchema, { abortEarly: false }),
        Admin(),
        Primaryuser(),
        Memberuser(),
        schemaHooks.validateData(usersDataValidator), schemaHooks.resolveData(usersDataResolver)],
      patch: [validate.form(userSchemaPatch, { abortEarly: false }),EditUser(),schemaHooks.validateData(usersPatchValidator), schemaHooks.resolveData(usersPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
