export const expenseTypesPath = 'expensetypes'

export const expenseTypesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const expenseTypesClient = (client) => {
  const connection = client.get('connection')

  client.use(expenseTypesPath, connection.service(expenseTypesPath), {
    methods: expenseTypesMethods
  })
}
