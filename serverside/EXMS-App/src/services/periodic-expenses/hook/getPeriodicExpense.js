
export const getAllPeriodicExpenses =()=>{
    return async(context)=>{
        // console.log(context.result.data);
        const periodicExpenses=context.result.data
        const expensetypeservice=context.app.service("expensetypes")
        const expensetypes = await expensetypeservice.find();
        // console.log(expensetypes);
        if(!expensetypes) throw new Error("no expensetype found")
        const householdservice=context.app.service("households")
       const households = await householdservice.find();
       if(!households) throw new Error("no households found")

      
       


 const dailyExpensesData=periodicExpenses.map((eachPeriodicExpense)=>{
    // let expenses={_id:eachDailyExpense._id,households:eachDailyExpense.household,expensetypes:eachDailyExpense.expensetype}
    const household=households.data.find((eachHousehold)=>eachHousehold._id.equals(eachPeriodicExpense.households))
    const expensetype=expensetypes.data.find((eachExpenseType)=>eachExpenseType._id.equals(eachPeriodicExpense.expensetypes))
    const {name}=household


    const expensetypename =expensetype.name
    return {...eachPeriodicExpense,selectExpense:expensetypename,household:name}

})
//  console.log(dailyExpensesData);


    context.result.data=dailyExpensesData      
    
     return context; 
    }
  }