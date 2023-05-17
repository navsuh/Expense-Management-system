export const Admin =()=>{
    return async(context)=>{
    //  console.log(context.data);
    const {role}=context.data
    if(role==="Admin"){
        const userservice=context.app.service("users")
     const findAdmin = await userservice.find( { query: {role:"Admin"} });
     console.log(findAdmin.total);
     if (findAdmin.total) throw new Error ("Admin already exist");

    }
     

     return context; 
    }
  }