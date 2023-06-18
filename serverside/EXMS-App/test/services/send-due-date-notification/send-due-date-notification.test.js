// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('send-due-date-notification service', () => {
  it('registered the service', () => {
    const service = app.service('send-due-date-notification')

    assert.ok(service, 'Registered the service')
  })
})
