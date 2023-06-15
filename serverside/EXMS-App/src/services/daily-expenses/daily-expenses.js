// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { dailyExpenseSchema,dailyPatchExpenseSchema } from './daily-expenses.models.js'
import validate from 'feathers-validate-joi'
import { dailyexpense } from './hooks/createdailyexpense.js'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { updateDailyExpenseResult } from './hooks/updateDailyExpenseResult.js'
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
import { getAllDailyExpense } from './hooks/getDailyExpense.js'
import { getAllDailyExpenseQuery } from './hooks/getDailyExpensequery.js'


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
      find: [getAllDailyExpenseQuery()],
        get: [],
       create: [
        validate.form(dailyExpenseSchema,{abortEarly:false}),
        dailyexpense(),
        schemaHooks.validateData(dailyExpensesDataValidator),
        schemaHooks.resolveData(dailyExpensesDataResolver)
      ],
      patch: [
        validate.form(dailyPatchExpenseSchema,{abortEarly:false}),
        dailyexpense(),
        schemaHooks.validateData(dailyExpensesPatchValidator),
        schemaHooks.resolveData(dailyExpensesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
     find :[getAllDailyExpense()],
     create:[updateDailyExpenseResult()],
     patch:[updateDailyExpenseResult()],
    },
    error: {
      all: []
    }
  })
}
