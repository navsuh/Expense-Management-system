export default function forgotpasshook() {
    return async (context) => {
      const { email } = context.data;
  
      const userService = context.app.service("users");
      const usermail = await userService.find({ query: { email: email } });
  
      console.log(!usermail.total);
  
      if (!usermail.total || usermail.total === 0)
        throw new Error("Please Enter a Valid Email Id");
  
      return context;
    };
  }
  