<<<<<<< Updated upstream
=======
import { resetPassword } from './reset-password/reset-password.js'

import { forgotPassword } from './forgot-password/forgot-password.js'
>>>>>>> Stashed changes

import { householdMembers  } from './householdmembers/householdmembers.js'

import { dailyExpenses } from './daily-expenses/daily-expenses.js'

import { periodicExpenses } from './periodic-expenses/periodic-expenses.js'

import { households } from './households/households.js'

import { expenseTypes } from './expensetypes/expensetypes.js'

import { users } from './users/users.js'

export const services = (app) => {
<<<<<<< Updated upstream
  app.configure(householdMembers )
 
=======
  app.configure(resetPassword)

  app.configure(forgotPassword)

  app.configure(householdMembers)
>>>>>>> Stashed changes

  app.configure(dailyExpenses)

  app.configure(periodicExpenses)

  app.configure(households)

  app.configure(expenseTypes)

  app.configure(users)

  // All services will be registered here
}
