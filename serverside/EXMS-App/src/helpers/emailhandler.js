import nodemailer from 'nodemailer'
export const emailhandler = {
  sendEmail: async function (userdata) {
    
    const user = process.env.movie_rental_email_id
    const pass = process.env.movie_rental_email_pass
//   console.log(user);
//   console.log(pass);
  
  
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
      const info = await transporter.sendMail({
        from: user, // sender address
        to: userdata.email, // list of receivers
        subject: `Hello ${userdata.firstName} ${userdata.lastName}`, // Subject line
        text: `You are added as memeber to ${userdata.households}`, // plain text body
        html: `<b>Your login credentials are email:${userdata.email} and password:${userdata.password}</b>` // html body
      })
      console.log('Message sent: %s', info.messageId)
    } catch (err) {
      console.log('here')
      console.log(err)
    }
  }
}
