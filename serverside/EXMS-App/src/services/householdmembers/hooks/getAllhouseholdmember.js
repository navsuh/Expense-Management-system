
export const getAllHouseholdMembers =()=>{
    return async(context)=>{
        // console.log(context.result.data);
        const householdmembers=context.result.data
       
        const userService=context.app.service("users")
        const users = await userService.find();
        
        if(!users) throw new Error("no users found")
        const householdservice=context.app.service("households")
       const households = await householdservice.find();
       if(!households) throw new Error("no households found")
    //    console.log(users.data);
    //    console.log(households.data);
// console.log(householdmembers);
const householdmembersData=householdmembers.map((eachHouseholdmember)=>{
    let member={_id:eachHouseholdmember._id,householdId:eachHouseholdmember.household,memberUserId:eachHouseholdmember.user}
   
    const household=households.data.find((eachHousehold)=>eachHousehold._id.equals(eachHouseholdmember.household))
    // console.log(household);
    const user=users.data.find((eachUser)=>eachUser._id.equals(eachHouseholdmember.user))
    // console.log(user);
    const {name}=household
    const {firstName,lastName,email,phone,userName,role}=user
    member={...member,firstName,lastName,email,phone,userName,household:name}
    return member
})
        
        //   console.log(householdmembersData);
        
     
    
     delete context.result.data
    //  delete context.data.lastName
    //  delete context.data.email
    //  delete context.data.phone
    //  delete context.data.userName
    //  delete context.data.password
    //  delete context.data.households
    //  delete context.data.role
    //  context.data.household=household.data[0]._id
    context.result.data=householdmembersData

        
        
    
     return context; 
    }
  }