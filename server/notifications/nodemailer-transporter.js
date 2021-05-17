require('dotenv').config();
const nodemailer= require('nodemailer');

module.exports=  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  // auth: {
  //   type: 'OAuth2',
  //   user: process.env.MAIL_USERNAME,
  //   pass: process.env.MAIL_PASSWORD,
  //   clientId: process.env.OAUTH_CLIENTID,
  //   clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //   refreshToken: process.env.OAUTH_REFRESH_TOKEN
  // }