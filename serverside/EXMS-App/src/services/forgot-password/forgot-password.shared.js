export const forgotPasswordPath = 'forgot-password'

export const forgotPasswordMethods = ['create']

export const forgotPasswordClient = (client) => {
  const connection = client.get('connection')

  client.use(forgotPasswordPath, connection.service(forgotPasswordPath), {
    methods: forgotPasswordMethods
  })
}
