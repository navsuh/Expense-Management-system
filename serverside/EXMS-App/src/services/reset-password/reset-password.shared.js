export const resetPasswordPath = 'reset-password'

export const resetPasswordMethods = ['create']

export const resetPasswordClient = (client) => {
  const connection = client.get('connection')

  client.use(resetPasswordPath, connection.service(resetPasswordPath), {
    methods: resetPasswordMethods
  })
}
