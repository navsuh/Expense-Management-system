import { householdsMembers } from './households-members/households-members.js'

import { dailyExpenses } from './daily-expenses/daily-expenses.js'

import { periodicExpenses } from './periodic-expenses/periodic-expenses.js'

import { households } from './households/households.js'

import { expenseTypes } from './expensetypes/expensetypes.js'

import { users } from './users/users.js'

export const services = (app) => {
  app.configure(householdsMembers)

  app.configure(dailyExpenses)

  app.configure(periodicExpenses)

  app.configure(households)

  app.configure(expenseTypes)

  app.configure(users)

  // All services will be registered here
}
