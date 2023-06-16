import nodemailer from 'nodemailer';


const sendEmailNotification = async (userdata,data) => {

      
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
  });
         console.log(userdata);
  
  const message = {
    from: user,
    to: userdata.email, 
    subject: 'Due Date coming', 
    text: 'The due date for your periodic expense is coming!', 
    html: `<p>The due date for your periodic expense is coming!</p>`, 
  };

  
  try {
    await transporter.sendMail(message);
     
  } catch (error) {
    throw error;
  }
};

export const duedatesend = () => {
  return async (context) => {
    const { data } = context;

    const dueDate = new Date(data.dueDate);
    const currentDate = new Date();
    const daysDifference = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));

    if (daysDifference < 15) {
      try {
        await sendEmailNotification(data);
      } catch (error) {
        console.error('Failed to send mail:', error);
      }
    }

    return context;
  };
};
