import { emailhandler } from '../../../helpers/emailhandler.js'
export const deletehouseholdmember =()=>{
    return async(context)=>{
        console.log(context.id);
        
        const householdMemberService=context.app.service("householdmembers")
        const findhouseholdMember= await householdMemberService.find( { query: { _id:context.id } });
        console.log(findhouseholdMember);
        const userService=context.app.service("users")
        const finduser=await userService.find( { query: { _id:findhouseholdMember.data[0].user} });
        console.log(finduser);
        if(finduser.data[0].role==='member'){
          const deleteuser = await userService.remove( findhouseholdMember.data[0].user);
        }
        

      
    
        
    
     return context; 
    }
  }