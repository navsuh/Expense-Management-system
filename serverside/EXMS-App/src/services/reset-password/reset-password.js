// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  resetPasswordDataValidator,
  // resetPasswordPatchValidator,
  // resetPasswordQueryValidator,
  resetPasswordResolver,
  resetPasswordExternalResolver,
  resetPasswordDataResolver,
  // resetPasswordPatchResolver,
  // resetPasswordQueryResolver
} from './reset-password.schema.js'
import { ResetPasswordService, getOptions } from './reset-password.class.js'
import { resetPasswordPath, resetPasswordMethods } from './reset-password.shared.js'

export * from './reset-password.class.js'
export * from './reset-password.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const resetPassword = (app) => {
  // Register our service on the Feathers application
  app.use(resetPasswordPath, new ResetPasswordService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: resetPasswordMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(resetPasswordPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(resetPasswordExternalResolver),
        // schemaHooks.resolveResult(resetPasswordResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(resetPasswordQueryValidator),
        // schemaHooks.resolveQuery(resetPasswordQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(resetPasswordDataValidator),
        schemaHooks.resolveData(resetPasswordDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(resetPasswordPatchValidator),
        // schemaHooks.resolveData(resetPasswordPatchResolver)
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
