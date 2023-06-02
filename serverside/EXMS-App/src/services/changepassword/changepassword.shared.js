export const changepasswordPath = 'changepassword'

export const changepasswordMethods = ['create']

export const changepasswordClient = (client) => {
  const connection = client.get('connection')

  client.use(changepasswordPath, connection.service(changepasswordPath), {
    methods: changepasswordMethods
  })
}
