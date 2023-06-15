
export const getAllDailyExpenseQuery =()=>{
    return async(context)=>{
        if(context.params.query.paymentDetailsDate){
            const date=context.params.query.paymentDetailsDate
            delete context.params.query
           
            context.params.query= { 'paymentDetails.date': {$gte:date}, '$select': undefined }
        }
            
           
        
   
    
   
    
     return context; 
    }
  }