// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import validate from 'feathers-validate-joi'
import { expenseTypeSchema } from './expensetypes.model.js'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  expenseTypesDataValidator,
  expenseTypesPatchValidator,
  expenseTypesQueryValidator,
  expenseTypesResolver,
  expenseTypesExternalResolver,
  expenseTypesDataResolver,
  expenseTypesPatchResolver,
  expenseTypesQueryResolver
} from './expensetypes.schema.js'
import { ExpenseTypesService, getOptions } from './expensetypes.class.js'
import { expenseTypesPath, expenseTypesMethods } from './expensetypes.shared.js'



export * from './expensetypes.class.js'
export * from './expensetypes.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const expenseTypes = (app) => {
  // Register our service on the Feathers application
  app.use(expenseTypesPath, new ExpenseTypesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: expenseTypesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(expenseTypesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(expenseTypesExternalResolver),
        schemaHooks.resolveResult(expenseTypesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(expenseTypesQueryValidator),
        schemaHooks.resolveQuery(expenseTypesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        validate.form(expenseTypeSchema, { abortEarly: false }),
        schemaHooks.validateData(expenseTypesDataValidator),
        schemaHooks.resolveData(expenseTypesDataResolver)
        
      ],
      patch: [
        validate.form(expenseTypeSchema, { abortEarly: false }),
        schemaHooks.validateData(expenseTypesPatchValidator),
        schemaHooks.resolveData(expenseTypesPatchResolver)
        
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
