import { emailhandler } from '../../../helpers/emailhandler.js'
export const createPrimaryUserHouseholdMember =()=>{
    return async(context)=>{
      // console.log(context.params.users);
      


      const householdmemberservice=context.app.service("householdmembers")
      // console.log(householdmemberservice);
     await householdmemberservice.create( {
      firstName: context.params.users.firstName,
      lastName: context.params.users.firstName,
      email: context.params.users.firstName,
      phone: context.params.users.firstName,
      userName: context.params.users.firstName,
      password: context.params.users.password,
      householdName:context.result.name,
      role: context.params.users.role,
      householdId: context.result._id,
      primaryuserId: context.params.users._id 
    });
  
     return context; 
    }
  }