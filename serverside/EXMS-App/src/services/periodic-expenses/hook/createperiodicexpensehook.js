export const periodicexpense =()=>{
    return async(context)=>{
    //  console.log(context.data);
     const {households,
     expensetypes,
     }=context.data
     
     const expensetypeservice=context.app.service("expensetypes")
     const expensetype = await expensetypeservice.find( { query: {name:expensetypes} });

     const householdservice=context.app.service("households")
     const household = await householdservice.find( { query: {name:households} });
    //  console.log(expensetype.data[0]._id);
     console.log(household.data[0]._id);
     context.data.households=household.data[0]._id
     context.data.expensetypes=expensetype.data[0]._id
     return context; 
    }
  }