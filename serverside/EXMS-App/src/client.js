// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import { sendDueDateNotificationClient } from './services/send-due-date-notification/send-due-date-notification.shared.js'

// import { dueDateNotificationClient } from './services/due-date-notification/due-date-notification.shared.js'

import { changepasswordClient } from './services/changepassword/changepassword.shared.js'

import { resetPasswordClient } from './services/reset-password/reset-password.shared.js'

import { forgotPasswordClient } from './services/forgot-password/forgot-password.shared.js'

import { householdMembersClient } from './services/householdmembers/householdmembers.shared.js'

import { dailyExpensesClient } from './services/daily-expenses/daily-expenses.shared.js'

import { periodicExpensesClient } from './services/periodic-expenses/periodic-expenses.shared.js'

import { householdsClient } from './services/households/households.shared.js'

import { expenseTypesClient } from './services/expensetypes/expensetypes.shared.js'

import { usersClient } from './services/users/users.shared.js'

/**
 * Returns a  client for the EXMS-App app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(usersClient)

  client.configure(expenseTypesClient)

  client.configure(householdsClient)

  client.configure(periodicExpensesClient)

  client.configure(dailyExpensesClient)

  client.configure(householdMembersClient)

  client.configure(forgotPasswordClient)

  client.configure(resetPasswordClient)

  client.configure(changepasswordClient)

  // client.configure(dueDateNotificationClient)

  client.configure(sendDueDateNotificationClient)

  return client
}
