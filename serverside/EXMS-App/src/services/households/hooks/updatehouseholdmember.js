import { emailhandler } from '../../../helpers/emailhandler.js'
export const updatehouseholdmember =()=>{
    return async(context)=>{

        const {firstName,lastName,phone,userName,householdName,memberUserId,primaryuserId}=context.data
        const updatedBy=primaryuserId
        const updatedAt=new Date().toISOString()
          const userService=context.app.service("users")
        const finduser = await userService.find( { query: { _id:memberUserId } });
        const updateuser = await userService.patch( finduser.data[0]._id,{firstName,lastName,phone,userName,updatedBy,updatedAt});
    
    
       if (!finduser.total) throw new Error ("user with given email or username already exist");
 
        const householdservice=context.app.service("households")
     const household = await householdservice.find( { query: {name:householdName} });
     if(!household) throw new Error("household not found")

     delete context.data.firstName
     delete context.data.lastName
     delete context.data.phone
     delete context.data.userName
     delete context.data.householdName
     delete context.data.memberUserId
     delete context.data.primaryuserId
     context.data.household=household.data[0]._id
     context.data.user=finduser.data[0]._id
     return context; 
    }
  }