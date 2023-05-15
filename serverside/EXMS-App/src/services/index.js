import { households } from './households/households.js'

import { expenseTypes } from './expensetypes/expensetypes.js'

import { users } from './users/users.js'

export const services = (app) => {
  app.configure(households)

  app.configure(expenseTypes)

  app.configure(users)

  // All services will be registered here
}
