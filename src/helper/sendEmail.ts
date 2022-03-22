import nodemailer from 'nodemailer';

const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    var mailOptions = {
      from: 'saadarsh362@gmail.com',
      to: email,
      subject: subject,
      html: `<h1>Reset password URL</h1><p>This URL expires in 5 min : ${text}</p>`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    return false;
  }
};

export default sendEmail;
