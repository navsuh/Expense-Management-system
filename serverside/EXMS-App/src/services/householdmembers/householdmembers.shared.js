export const householdMembersPath = 'householdmembers'

export const householdMembersMethods = ['find', 'get', 'create', 'patch', 'remove']

export const householdMembersClient = (client) => {
  const connection = client.get('connection')

  client.use(householdMembersPath, connection.service(householdMembersPath), {
    methods: householdMembersMethods
  })
}
