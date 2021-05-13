require('dotenv').config();
const webpush= require('web-push');

webpush.setVapidDetails(
    "mailto:happy.day.noti@gmail.com",
    process.env.PUBILC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
  );
  
  module.exports = webpush;

