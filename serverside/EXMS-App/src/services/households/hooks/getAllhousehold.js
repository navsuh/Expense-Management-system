
export const getAllHousehold =()=>{
    return async(context)=>{
        // console.log(context.result.data);
        // console.log(context.params.users)
        const AllHouseHolds=context.result.data
        if(context.params.users){
        const householdmemberservice=context.app.service("householdmembers")
        const householdmembers=await householdmemberservice.find( { query:  { user:context.params.users._id } });
    //  console.log(householdmembers.data);
    const filteredHouseHolds=AllHouseHolds.filter((eachHouseHold)=>{
          for(let eachHouseHoldmember of householdmembers.data){
            if(eachHouseHoldmember.householdId.equals(eachHouseHold._id)) {
              
              return true
            }
            
          }
    })
    console.log(filteredHouseHolds);
    context.result=filteredHouseHolds
    }
    
    
     return context; 
    }
  }