// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { householdSchema } from './households.models.js'
import validate from 'feathers-validate-joi'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  householdsDataValidator,
  householdsPatchValidator,
  householdsQueryValidator,
  householdsResolver,
  householdsExternalResolver,
  householdsDataResolver,
  householdsPatchResolver,
  householdsQueryResolver
} from './households.schema.js'
import { HouseholdsService, getOptions } from './households.class.js'
import { householdsPath, householdsMethods } from './households.shared.js'

export * from './households.class.js'
export * from './households.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const households = (app) => {
  // Register our service on the Feathers application
  app.use(householdsPath, new HouseholdsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: householdsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(householdsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(householdsExternalResolver),
        schemaHooks.resolveResult(householdsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(householdsQueryValidator),
        schemaHooks.resolveQuery(householdsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        validate.form(householdSchema,{abortEarly:false}),
        schemaHooks.validateData(householdsDataValidator),
        schemaHooks.resolveData(householdsDataResolver)
      ],
      patch: [
        validate.form(householdSchema,{abortEarly:false}),
        schemaHooks.validateData(householdsPatchValidator),
        schemaHooks.resolveData(householdsPatchResolver)
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
