export const updatePeriodicExpense =()=>{
    return async(context)=>{
        
    //  console.log(context.data);
   

     const {_id,households,
        expensetypes,paymentDetails,dueDate,paidThrough,paidBy
        }=context.data
        if(households===undefined){
return context
        }else{
            const expensetypeservice=context.app.service("expensetypes")
            const expensetype = await expensetypeservice.find( { query: {name:expensetypes} });
       
            const householdservice=context.app.service("households")
            const household = await householdservice.find( { query: {name:households} });
    
    
            const periodicExpenseservice=context.app.service("periodic-expenses")
            const periodicExpense = await periodicExpenseservice.find( { query: {_id:context.data._id} });
    
            console.log(periodicExpense);
          
            context.data.households=household.data[0]._id
            context.data.expensetypes=expensetype.data[0]._id
            context.data.paymentDetails=[...periodicExpense.data[0].paymentDetails,paymentDetails]
            context.data.paidThrough=[...periodicExpense.data[0].paidThrough,paidThrough]
            context.data.paidBy=[...periodicExpense.data[0].paidBy,paidBy]
            
        }
        
     
     return context; 
    }
  }