// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  householdsMembersDataValidator,
  householdsMembersPatchValidator,
  householdsMembersQueryValidator,
  householdsMembersResolver,
  householdsMembersExternalResolver,
  householdsMembersDataResolver,
  householdsMembersPatchResolver,
  householdsMembersQueryResolver
} from './households-members.schema.js'
import { HouseholdsMembersService, getOptions } from './households-members.class.js'
import { householdsMembersPath, householdsMembersMethods } from './households-members.shared.js'

export * from './households-members.class.js'
export * from './households-members.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const householdsMembers = (app) => {
  // Register our service on the Feathers application
  app.use(householdsMembersPath, new HouseholdsMembersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: householdsMembersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(householdsMembersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(householdsMembersExternalResolver),
        schemaHooks.resolveResult(householdsMembersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(householdsMembersQueryValidator),
        schemaHooks.resolveQuery(householdsMembersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(householdsMembersDataValidator),
        schemaHooks.resolveData(householdsMembersDataResolver)
      ],
      patch: [
        schemaHooks.validateData(householdsMembersPatchValidator),
        schemaHooks.resolveData(householdsMembersPatchResolver)
      ],
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
