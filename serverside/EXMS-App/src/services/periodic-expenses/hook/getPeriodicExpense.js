
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

      
       if(context.params.users){
        const householdmemberservice=context.app.service("householdmembers")
        const householdmembers=await householdmemberservice.find( { query:  { user:context.params.users._id } });
    //  console.log(householdmembers.data);
     
        var filteredHouseHolds=periodicExpenses.filter((eachperiodicExpense)=>{
          for(let eachHouseHoldmember of householdmembers.data){
            if(eachHouseHoldmember.householdId.equals(eachperiodicExpense.households)) {
              
              return true
            }
            
          }
    })
    console.log(filteredHouseHolds);

    }


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