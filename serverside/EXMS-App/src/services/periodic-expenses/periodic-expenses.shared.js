export const periodicExpensesPath = 'periodic-expenses'

export const periodicExpensesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const periodicExpensesClient = (client) => {
  const connection = client.get('connection')

  client.use(periodicExpensesPath, connection.service(periodicExpensesPath), {
    methods: periodicExpensesMethods
  })
}
