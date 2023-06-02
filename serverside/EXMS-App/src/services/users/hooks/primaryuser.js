export const Primaryuser =()=>{
    return async(context)=>{
     console.log(context.data);
    const {email,userName,role}=context.data
    if(role==="Primaryuser"){
        const userservice=context.app.service("users")
        const finduser = await userservice.find( { query: {$or: [{ email:email }, { userName: userName }]} });
        // console.log(finduser);
        if (finduser.total) throw new Error ("user with given email or username already exist");

    }
     

     return context; 
    }
  }