import ejs from "ejs";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getEmailHtml } from "./constants";

dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.forwardemail.net',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'my_user',
//     pass: 'my_password',
//   },
// });

class MailService {

  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hexsnwhite@gmail.com',
        pass: process.env.APP_PASSWORD 
      }
    }); 
  }

  public sendEmailVerificationCode = async(receiver: string, subject: string, type: string) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    // const dir = __dirname.substr(0, __dirname.lastIndexOf("/") - 5);
    //
    // ejs.renderFile(dir + '/src/views/email.ejs', { type, verificationCode }, async(err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     const options = {
    //       from: 'hexsnwhite@gmail.com',
    //       to: receiver,
    //       subject: subject,
    //       html: data,
    //     }; 
    //     await this.transporter.sendMail(options);
    //   }
    // });

    try {       
      const options = {
        from: 'hexsnwhite@gmail.com',
        to: receiver,
        subject: subject,
        html: getEmailHtml(type, verificationCode),
      };

      await this.transporter.sendMail(options);
      
    } catch (error) {
      console.log(error); 
    }
  }
}

export { MailService }


