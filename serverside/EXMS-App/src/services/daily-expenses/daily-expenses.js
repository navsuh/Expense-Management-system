// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { dailyExpenseSchema } from './daily-expenses.models.js'
import validate from 'feathers-validate-joi'
import {households} from "../../hooks/findhouseholds.js"
import {expenseTypesfunc} from "../../hooks/findexpensetypes.js"
import { households } from '../../hooks/findhouseholds.js'
import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  dailyExpensesDataValidator,
  dailyExpensesPatchValidator,
  dailyExpensesQueryValidator,
  dailyExpensesResolver,
  dailyExpensesExternalResolver,
  dailyExpensesDataResolver,
  dailyExpensesPatchResolver,
  dailyExpensesQueryResolver
} from './daily-expenses.schema.js'
import { DailyExpensesService, getOptions } from './daily-expenses.class.js'
import { dailyExpensesPath, dailyExpensesMethods } from './daily-expenses.shared.js'

export * from './daily-expenses.class.js'
export * from './daily-expenses.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const dailyExpenses = (app) => {
  // Register our service on the Feathers application
  app.use(dailyExpensesPath, new DailyExpensesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: dailyExpensesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(dailyExpensesPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(dailyExpensesExternalResolver),
        schemaHooks.resolveResult(dailyExpensesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(dailyExpensesQueryValidator),
        schemaHooks.resolveQuery(dailyExpensesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        validate.form(dailyExpenseSchema,{abortEarly:false}),
        households(),
        expenseTypesfunc(),
        schemaHooks.validateData(dailyExpensesDataValidator),
        schemaHooks.resolveData(dailyExpensesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(dailyExpensesPatchValidator),
        schemaHooks.resolveData(dailyExpensesPatchResolver)
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
