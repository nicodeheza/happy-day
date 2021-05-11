//const nodemailer= require('nodemailer');
const transporter= require('./nodemailer-transporter');
const Reminder= require('../models/Reminder');
const User= require('../models/User');
const Event= require('../models/Event');


function capitalize(str){
    if(!str) return '';
    str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
} 


module.exports = async()=>{
    try {

        const toDay= new Date();
        const day=  toDay.getDate();
        const month= toDay.getMonth()+1;

        let toDayReminders= await Reminder.aggregate([
            {$addFields: {  "month" : {$month: '$date'}}},
            {$addFields: {  "day" : {$dayOfMonth: '$date'}}},
            {$match: { month: month, day: day}}
        ]);

        for (let i= 0; i< toDayReminders.length ; i++){
            let  reminder= toDayReminders[i];
            let event= await Event.findById(reminder.event).populate('user').exec();

            let honore= capitalize(event.personName);

            let subject;
            if(reminder.name === 'The Same Day'){
                subject= `Today is ${honore}'s ${event.AnniversaryType} ${event.type}`
            }else{
                const reminderName= reminder.name.split(" ");
                const time= reminderName[1] === 'Days' && reminderName[0] === '1' ? 'Day' 
                : eminderName[1] === 'Weeks' && reminderName[0] === '1' ?  'Week'
                : reminderName[1] === 'Days' ? 'Days' : 'Weeks';

                subject= `in ${reminderName[0]} ${time} is ${honore}'s ${event.AnniversaryType} ${event.type}`
            }

            let body= `Don't forget to congratulate ${honore} on his/her ${event.AnniversaryType} ${event.type}`
            let eventDate= new Date(event.date);
            let eDay= eventDate.getDate() < 10 ? `0${eventDate.getDate()}` : eventDate.getDate();
            let eMonth= eventDate.getMonth() +1 < 10 ? `0${eventDate.getMonth()}` : eventDate.getMonth();
            let eYear= eventDate.getFullYear() > 5000 ? "" : eventDate.getFullYear();
            let eDate= eYear ? `${eMonth}/${eDay}/${eYear}` : `${eMonth}/${eDay}`
            let eage= eYear ? `(${Math.floor((toDay.getTime() - eventDate.getTime()) / (1000*60*60*24*365))} years)` : "";
            let eventData= `${honore}'s ${event.AnniversaryType} ${event.type}: ${eDate} ${eage}`;

            // console.log(`
            // {subject: ${subject}
            // body: ${body}
            // data: ${eventData}}
            // `);

            if(event.user.mailNotification){

            let mail = await transporter.sendMail({
            from: '"Happy Day" <happy.day.noti@gmail.com>', // sender address
            to: event.user.email, // list of receivers
            subject: subject , // Subject line
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Happy Day</title>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
            <style>
            body{
                margin: 0px;
                padding: 0px;
                font-family: 'Roboto', sans-serif;
                text-align: center;
            }
            img{
                width: 100px;
                margin-top: 20px;
            }

            h1{
                font-family: 'Fredoka One', cursive;
                color: rgb(0, 114, 221);
            }

            p{
                font-weight: bold;
                color: #6700b7;
            }
            </style>
            </head>
            <body>
                <img src="https://i.ibb.co/QQYf02y/logo.png" alt="Happy Day">
                <h1>${subject}</h1>
                <p>${body}</p>
                <p>${eventData}</p>
            </body>
            </html>
            
            `, // html body
          });
        
          console.log("Message sent: %s", mail.messageId); 
          }

 }
        

    } catch (error) {
        if(error)console.log(error);
    }
}


