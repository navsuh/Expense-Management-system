import { emailhandler } from '../../../helpers/emailhandler.js'
export const createhouseholdmember =()=>{
    return async(context)=>{
        console.log(context.data);
        const {role}=context.data
        if(role==='member'){
          const {firstName,lastName,email,phone,userName,password,role,householdName}=context.data
          const userService=context.app.service("users")
        const finduser = await userService.find( { query: {$or: [{ email:email }, { userName: userName }]} });
        // console.log(finduser);
        if (finduser.total) throw new Error ("user with given email or username already exist");
        const createMember=await userService.create( { firstName,lastName,email,phone,userName,password,role ,isActive:true});
        emailhandler.sendEmail(context.data,context.path)
        // console.log(createMember);
        const householdservice=context.app.service("households")
     const household = await householdservice.find( { query: {name:householdName} });
     if(!household) throw new Error("household not found")
    //  console.log(expensetype.data[0]._id);
    //  console.log(household.data[0]._id);
     delete context.data.firstName
     delete context.data.lastName
     delete context.data.email
     delete context.data.phone
     delete context.data.userName
     delete context.data.password
     delete context.data.householdName
     delete context.data.role
     context.data.household=household.data[0]._id
     context.data.user=createMember._id

        }else if(role==='Primaryuser'){
          const {firstName,lastName,email,phone,userName,password,role,householdName,householdId,primaryuserId}=context.data
          delete context.data.firstName
     delete context.data.lastName
     delete context.data.email
     delete context.data.phone
     delete context.data.userName
     delete context.data.password
     delete context.data.householdName
     delete context.data.role
     context.data.household=householdId
     context.data.user=primaryuserId
     delete context.data.householdId
     delete context.data.primaryuserId
        }
        
    
     return context; 
    }
  }