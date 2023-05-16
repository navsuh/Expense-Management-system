
export const datehook =()=>{
    return async(context)=>{
     const date = new Date();
     if(context.body.paymentDetails=="") return date
     else{
        context.body.paymentDetails = new Date(context.body.paymentDeatils)
     }

     return context; 
    }
  }