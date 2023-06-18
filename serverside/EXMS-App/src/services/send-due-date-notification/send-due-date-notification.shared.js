export const sendDueDateNotificationPath = 'send-due-date-notification'

export const sendDueDateNotificationMethods = ['create']

export const sendDueDateNotificationClient = (client) => {
  const connection = client.get('connection')

  client.use(sendDueDateNotificationPath, connection.service(sendDueDateNotificationPath), {
    methods: sendDueDateNotificationMethods
  })
}
