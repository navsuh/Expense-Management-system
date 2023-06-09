// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { periodicExpenseSchema } from './periodic-expenses.models.js'
import validate from 'feathers-validate-joi'
import {periodicexpense} from "./hook/createperiodicexpensehook.js"
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  periodicExpensesDataValidator,
  periodicExpensesPatchValidator,
  periodicExpensesQueryValidator,
  periodicExpensesResolver,
  periodicExpensesExternalResolver,
  periodicExpensesDataResolver,
  periodicExpensesPatchResolver,
  periodicExpensesQueryResolver
} from './periodic-expenses.schema.js'
import { PeriodicExpensesService, getOptions } from './periodic-expenses.class.js'
import { periodicExpensesPath, periodicExpensesMethods } from './periodic-expenses.shared.js'
import {getAllPeriodicExpenses} from "./hook/getPeriodicExpense.js"
export * from './periodic-expenses.class.js'
export * from './periodic-expenses.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const periodicExpenses = (app) => {
  // Register our service on the Feathers application
  app.use(periodicExpensesPath, new PeriodicExpensesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: periodicExpensesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(periodicExpensesPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(periodicExpensesExternalResolver),
        schemaHooks.resolveResult(periodicExpensesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(periodicExpensesQueryValidator),
        schemaHooks.resolveQuery(periodicExpensesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        validate.form(periodicExpenseSchema,{abortEarly:false}),
        periodicexpense(),
        schemaHooks.validateData(periodicExpensesDataValidator),
        schemaHooks.resolveData(periodicExpensesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(periodicExpensesPatchValidator),
        schemaHooks.resolveData(periodicExpensesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      find:[getAllPeriodicExpenses()]
    },
    error: {
      all: []
    }
  })
}
