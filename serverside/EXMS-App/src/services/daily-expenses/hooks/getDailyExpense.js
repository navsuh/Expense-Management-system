
export const getAllDailyExpense =()=>{
    return async(context)=>{
     
        const dailyExpenses=context.result.data
        const expensetypeservice=context.app.service("expensetypes")
        const expensetypes = await expensetypeservice.find();
        if(!expensetypes) throw new Error("no expensetype found")
        const householdservice=context.app.service("households")
       const households = await householdservice.find();
       if(!households) throw new Error("no households found")
    
 const dailyExpensesData=dailyExpenses.map((eachDailyExpense)=>{
    // let expenses={_id:eachDailyExpense._id,households:eachDailyExpense.household,expensetypes:eachDailyExpense.expensetype}
    const household=households.data.find((eachHousehold)=>eachHousehold._id.equals(eachDailyExpense.households))
    const expensetype=expensetypes.data.find((eachUser)=>eachUser._id.equals(eachDailyExpense.expensetypes))
    const {name}=household
    const expensetypename =expensetype.name
    // console.log(expensetypename);
    // console.log(household);
    // console.log(expensetype);
    return {...eachDailyExpense,selectExpense:expensetypename,household:name}

})
 

    context.result.data=dailyExpensesData      
    
     return context; 
    }
  }