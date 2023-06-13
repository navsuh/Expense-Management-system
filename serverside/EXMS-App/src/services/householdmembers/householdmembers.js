// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { createhouseholdmember } from './hooks/createhouseholdmember.js'
import validate from 'feathers-validate-joi'
import { householdmembersSchema } from './householdmembers.model.js'
import { updatehouseholdmembersSchema } from './householdmembers.model.js'
import { getAllHouseholdMembers } from './hooks/getAllhouseholdmember.js'
import { updatehouseholdmember } from './hooks/updatehouseholdmember.js'
import { deletehouseholdmember } from './hooks/deletehouseholdmember.js'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  householdMembersDataValidator,
  householdMembersPatchValidator,
  householdMembersQueryValidator,
  householdMembersResolver,
  householdMembersExternalResolver,
  householdMembersDataResolver,
  householdMembersPatchResolver,
  householdMembersQueryResolver
} from './householdmembers.schema.js'
import { HouseholdMembersService, getOptions } from './householdmembers.class.js'
import { householdMembersPath, householdMembersMethods } from './householdmembers.shared.js'

export * from './householdmembers.class.js'
export * from './householdmembers.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const householdMembers = (app) => {
  // Register our service on the Feathers application
  app.use(householdMembersPath, new HouseholdMembersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: householdMembersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(householdMembersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(householdMembersExternalResolver),
        schemaHooks.resolveResult(householdMembersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(householdMembersQueryValidator),
        schemaHooks.resolveQuery(householdMembersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        // validate.form(householdmembersSchema, { abortEarly: false }),
        createhouseholdmember(),
        schemaHooks.validateData(householdMembersDataValidator),
        schemaHooks.resolveData(householdMembersDataResolver)
      ],
      patch: [
        // validate.form(updatehouseholdmembersSchema, { abortEarly: false }),
        updatehouseholdmember(),
        schemaHooks.validateData(householdMembersPatchValidator),
        schemaHooks.resolveData(householdMembersPatchResolver)
      ],
      remove: [deletehouseholdmember()]
    },
    after: {
      all: [],
      find: [getAllHouseholdMembers()],
    },
    error: {
      all: []
    }
  })
}
