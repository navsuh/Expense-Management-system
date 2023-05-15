export const dailyExpensesPath = 'daily-expenses'

export const dailyExpensesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const dailyExpensesClient = (client) => {
  const connection = client.get('connection')

  client.use(dailyExpensesPath, connection.service(dailyExpensesPath), {
    methods: dailyExpensesMethods
  })
}
