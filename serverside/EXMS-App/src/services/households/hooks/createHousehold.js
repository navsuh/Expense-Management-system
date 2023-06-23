import { emailhandler } from '../../../helpers/emailhandler.js'
export const createhousehold =()=>{
    return async(context)=>{
        // console.log(context.data);
     delete context.data.primaryuserId
        
    
     return context; 
    }
  }