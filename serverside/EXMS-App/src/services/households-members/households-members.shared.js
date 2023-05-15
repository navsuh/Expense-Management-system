export const householdsMembersPath = 'households-members'

export const householdsMembersMethods = ['find', 'get', 'create', 'patch', 'remove']

export const householdsMembersClient = (client) => {
  const connection = client.get('connection')

  client.use(householdsMembersPath, connection.service(householdsMembersPath), {
    methods: householdsMembersMethods
  })
}
