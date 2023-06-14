
export const updatePeriodicExpenseResult =()=>{
    return async(context)=>{
        // console.log(context.result);
    
        const expensetypeservice=context.app.service("expensetypes")
        const expensetypes = await expensetypeservice.find({ query: { _id:context.result.expensetypes } });
        if(!expensetypes) throw new Error("no expensetype found")
        const householdservice=context.app.service("households")
       const households = await householdservice.find({ query: { _id:context.result.households } });
       if(!households) throw new Error("no households found")
    // console.log(expensetypes);
    // console.log(households);
    context.result.selectExpense=expensetypes.data[0].name
    context.result.household =households.data[0].name
    
    // context.result.data=dailyExpensesData      
    // console.log(context.result);
     return context; 
    }
  }