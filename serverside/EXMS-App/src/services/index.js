import { sendDueDateNotification } from './send-due-date-notification/send-due-date-notification.js'

import { changepassword } from './changepassword/changepassword.js'

import { forgotPassword } from './forgot-password/forgot-password.js'
import { resetPassword } from './reset-password/reset-password.js'

import { householdMembers } from './householdmembers/householdmembers.js'

import { dailyExpenses } from './daily-expenses/daily-expenses.js'

import { periodicExpenses } from './periodic-expenses/periodic-expenses.js'

import { households } from './households/households.js'

import { expenseTypes } from './expensetypes/expensetypes.js'

import { users } from './users/users.js'

export const services = (app) => {
  app.configure(sendDueDateNotification)

  app.configure(changepassword)

  app.configure(forgotPassword)

  app.configure(householdMembers)

  app.configure(resetPassword)
  app.configure(dailyExpenses)

  app.configure(periodicExpenses)

  app.configure(households)

  app.configure(expenseTypes)

  app.configure(users)

  // All services will be registered here
}
