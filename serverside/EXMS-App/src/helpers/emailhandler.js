import nodemailer from 'nodemailer'
export const emailhandler = {
  sendEmail: async function (userdata,context) {
    
    const user = process.env.movie_rental_email_id
    const pass = process.env.movie_rental_email_pass
  console.log(user);
  console.log(pass);
  
  
    let transporter = nodemailer.createTransport({
      port: 587,
      secure: true,
      service: 'gmail',
      auth: {
        user,
        pass
      }
    })
    try {
      if (context==="householdmembers"){
        const info = await transporter.sendMail({
          from: user, // sender address
          to: userdata.email, // list of receivers
          subject: `Hello ${userdata.firstName} ${userdata.lastName}`, // Subject line
          text: `You are added as member to ${userdata.households}`, // plain text body
          html: `<b>Your login credentials are email:${userdata.email} and password:${userdata.password}</b>` // html body
        })
        console.log('Message sent: %s', info.messageId)

      }else if(context==="forgot-password"){
        const info = await transporter.sendMail({
          from: user, // sender address
          to: userdata.email, // list of receivers
          subject: `OTP to Reset Password `, // Subject line
          // text: "please click the below link to reset your password", // plain text body
          // html: `<div> <h4>Hello ${userdata.firstName}</h4> <p>Please click the below link to reset your password</p> <a href='http://localhost:3000/resetpassword'>Reset password</a></div>` // html body
          html: `<div> <h4>Hello ${userdata.firstName}</h4> <p>your reset password OTP:${userdata.OTP} </p> </div>`
        })
        console.log('Message sent: %s', info.messageId)
        // console.log(userdata);

      }else if(context==="send-due-date-notification"){
        const message = {
          from: user,
          to: userdata.email, 
          subject: 'Due Date coming', 
          text: 'The due date for your periodic expense is coming!', 
          html: `<p>The due date for your periodic expense is coming!</p>`, 
        };
        const info = await transporter.sendMail(message)
        console.log('Message sent: %s', info.messageId)
        // console.log(userdata);
      }
    
    } catch (err) {
      // console.log('here')
      console.log(err)
    }
  }
}
