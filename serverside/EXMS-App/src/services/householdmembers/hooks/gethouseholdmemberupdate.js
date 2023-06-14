
export const getAllHouseholdMembersUpdate =()=>{
    return async(context)=>{
        console.log(context.result);
        
const {_id,household,user}=context.result
        
        

                       
        

                       
        const userService=context.app.service("users")
        const userData = await userService.find({ query: {_id:user} });
        
        if(!userData) throw new Error("no users found")
        const householdservice=context.app.service("households")
       const householdData = await householdservice.find({ query: {_id:household} });
       if(!householdData) throw new Error("no households found")
       console.log(userData);
       console.log(householdData);
       
       
       delete context.result
       context.result=
       
       {_id:_id,
        householdId:household,
        memberUserId:user,
        firstName:userData.data[0].firstName,
        lastName:userData.data[0].lastName,
        email:userData.data[0].email,
        phone:userData.data[0].phone,
        userName:userData.data[0].userName,
        household:householdData.data[0].name
    }

   



        
     
    


        
    
     return context; 
    }
  }