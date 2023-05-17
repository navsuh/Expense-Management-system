export const forgotPasswordPath = 'forgot-password'

export const forgotPasswordMethods = ['find','get','create','patch']

export const forgotPasswordClient = (client) => {
  const connection = client.get('connection')

  client.use(forgotPasswordPath, connection.service(forgotPasswordPath), {
    methods: forgotPasswordMethods
  })
}
