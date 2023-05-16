export const findhouseholdId =()=>{
    return async(context)=>{
        console.log(context.data);

    //     const {
    //         householdName,
    //         userName,
    //         }=context.data
    //  const householdsService = context.app.service("households");
    // //  const household = await householdsService.get(context.data.householdsId);
    //  if(!household)throw new Error("Households with given id is not found");
    //  context.data.households=household;
    //  delete context.data.householdsId;
     return context; 
    }
  }