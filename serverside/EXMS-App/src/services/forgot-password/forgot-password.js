// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import forgotpasshook from './hook/forgotpasshook.js'
import { forgotPasswordsSchema } from './forgot-password.models.js'
import validate from "feathers-validate-joi"
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  forgotPasswordDataValidator,
  forgotPasswordPatchValidator,
  forgotPasswordQueryValidator,
  forgotPasswordResolver,
  forgotPasswordExternalResolver,
  forgotPasswordDataResolver,
  forgotPasswordPatchResolver,
  forgotPasswordQueryResolver
} from './forgot-password.schema.js'
import { ForgotPasswordService, getOptions } from './forgot-password.class.js'
import { forgotPasswordPath, forgotPasswordMethods } from './forgot-password.shared.js'

export * from './forgot-password.class.js'
export * from './forgot-password.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const forgotPassword = (app) => {
  // Register our service on the Feathers application
  app.use(forgotPasswordPath, new ForgotPasswordService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: forgotPasswordMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(forgotPasswordPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(forgotPasswordExternalResolver),
        schemaHooks.resolveResult(forgotPasswordResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(forgotPasswordQueryValidator),
        schemaHooks.resolveQuery(forgotPasswordQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        validate.form(forgotPasswordsSchema,{abortEarly:false}),
        forgotpasshook(),
        schemaHooks.validateData(forgotPasswordDataValidator),
        schemaHooks.resolveData(forgotPasswordDataResolver)
      ],
      patch: [
        schemaHooks.validateData(forgotPasswordPatchValidator),
        schemaHooks.resolveData(forgotPasswordPatchResolver)
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
