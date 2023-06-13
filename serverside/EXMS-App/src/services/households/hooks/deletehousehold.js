import { emailhandler } from '../../../helpers/emailhandler.js'
export const deletehousehold =()=>{
    return async(context)=>{
        console.log(context.id);
        console.log(context.params.users);
        const householdMemberService=context.app.service("householdmembers")
        const findhouseholdMember= await householdMemberService.find( { query: { user:context.params.users._id,household:context.id } });
        console.log(findhouseholdMember);
        await householdMemberService.remove( findhouseholdMember.data[0]._id);
        // const userService=context.app.service("users")
        // const finduser = await userService.remove( findhouseholdMember.data[0].memberUserId);

      
    
        
    
     return context; 
    }
  }