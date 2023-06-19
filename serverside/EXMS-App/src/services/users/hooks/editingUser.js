export const EditUser =()=>{
    return async(context)=>{
    //  console.log(context.data);
   
    const {_id,userName}=context.data
    if(userName){
    const userservice=context.app.service("users")
     const finduser = await userservice.find( { query: {_id:_id} });
   if(finduser.data[0].userName!==userName){
        // const userservice=context.app.service("users")
     const finduserwithexistingusername = await userservice.find( { query: {userName:userName} });
    //  console.log(finduserwithexistingusername);
     if (finduserwithexistingusername.total) throw new Error ("username already exist");

   }
}

     return context; 
    }
  }