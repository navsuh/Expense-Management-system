
export const expenseTypesfunc =()=>{
    return async(context)=>{
     const expensetypesService = context.app.service("expensetypes");
     const expense = await expensetypesService.get(context.data.expensetypesId);
     if(!expense)throw new Error("Expense types with given id is not found");
     context.data.expensetypes=expense;
     delete context.data.expensetypesId;
     return context; 
    }
  }