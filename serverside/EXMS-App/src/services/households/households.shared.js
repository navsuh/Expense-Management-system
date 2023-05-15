export const householdsPath = 'households'

export const householdsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const householdsClient = (client) => {
  const connection = client.get('connection')

  client.use(householdsPath, connection.service(householdsPath), {
    methods: householdsMethods
  })
}
