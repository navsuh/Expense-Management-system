// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  sendDueDateNotificationDataValidator,
  // sendDueDateNotificationPatchValidator,
  // sendDueDateNotificationQueryValidator,
  sendDueDateNotificationResolver,
  sendDueDateNotificationExternalResolver,
  sendDueDateNotificationDataResolver,
  // sendDueDateNotificationPatchResolver,
  // sendDueDateNotificationQueryResolver
} from './send-due-date-notification.schema.js'
import { SendDueDateNotificationService, getOptions } from './send-due-date-notification.class.js'
import {
  sendDueDateNotificationPath,
  sendDueDateNotificationMethods
} from './send-due-date-notification.shared.js'

export * from './send-due-date-notification.class.js'
export * from './send-due-date-notification.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const sendDueDateNotification = (app) => {
  // Register our service on the Feathers application
  app.use(sendDueDateNotificationPath, new SendDueDateNotificationService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sendDueDateNotificationMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sendDueDateNotificationPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(sendDueDateNotificationExternalResolver),
        schemaHooks.resolveResult(sendDueDateNotificationResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(sendDueDateNotificationQueryValidator),
        // schemaHooks.resolveQuery(sendDueDateNotificationQueryResolver)
      ],
      // find: [],
      // get: [],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(sendDueDateNotificationDataValidator),
        schemaHooks.resolveData(sendDueDateNotificationDataResolver)
      ],
      // patch: [
      //   // schemaHooks.validateData(sendDueDateNotificationPatchValidator),
      //   // schemaHooks.resolveData(sendDueDateNotificationPatchResolver)
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
