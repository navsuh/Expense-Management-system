export const EditUser =()=>{
    return async(context)=>{
    //  console.log(context.data);
    const {userName}=context.data
   if(userName){
        const userservice=context.app.service("users")
     const finduserwithexistingusername = await userservice.find( { query: {userName:userName} });
    //  console.log(finduserwithexistingusername.total);
     if (finduserwithexistingusername.total) throw new Error ("username already exist");

   }
     

     return context; 
    }
  }