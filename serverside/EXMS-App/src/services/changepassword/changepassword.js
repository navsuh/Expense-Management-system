// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  changepasswordDataValidator,
  // changepasswordPatchValidator,
  // changepasswordQueryValidator,
  // changepasswordResolver,
  // changepasswordExternalResolver,
  changepasswordDataResolver
  // changepasswordPatchResolver,
  // changepasswordQueryResolver
} from './changepassword.schema.js'
import { ChangepasswordService, getOptions } from './changepassword.class.js'
import { changepasswordPath, changepasswordMethods } from './changepassword.shared.js'

export * from './changepassword.class.js'
export * from './changepassword.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const changepassword = (app) => {
  // Register our service on the Feathers application
  app.use(changepasswordPath, new ChangepasswordService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: changepasswordMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(changepasswordPath).hooks({
    around: {
      // all: [
      //   authenticate('jwt'),
      //   schemaHooks.resolveExternal(changepasswordExternalResolver),
      //   schemaHooks.resolveResult(changepasswordResolver)
      // ]
    },
    before: {
      // all: [
      //   schemaHooks.validateQuery(changepasswordQueryValidator),
      //   schemaHooks.resolveQuery(changepasswordQueryResolver)
      // ],
      // find: [],
      // get: [],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(changepasswordDataValidator),
        schemaHooks.resolveData(changepasswordDataResolver)
      ]
      // patch: [
      //   schemaHooks.validateData(changepasswordPatchValidator),
      //   schemaHooks.resolveData(changepasswordPatchResolver)
      // ],
      // remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
