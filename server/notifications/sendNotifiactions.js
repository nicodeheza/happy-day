//const nodemailer= require('nodemailer');
require("dotenv").config();
const transporter = require("./nodemailer-transporter");
const Reminder = require("../models/Reminder");
const User = require("../models/User");
const Event = require("../models/Event");
const webpush = require("./webpush");
const {Expo} = require("expo-server-sdk");

const expo = new Expo();

function capitalize(str) {
	if (!str) return "";
	let arr = str.split(" ");
	let rArr = [];
	for (let i = 0; i < arr.length; i++) {
		let string = arr[i];
		string.toLowerCase();
		rArr.push(string.charAt(0).toUpperCase() + string.slice(1));
	}

	return rArr.join(" ");
}

module.exports = async () => {
	let expoMessages = [];

	try {
		const toDay = new Date();
		const day = toDay.getDate();
		const month = toDay.getMonth() + 1;

		let toDayReminders = await Reminder.aggregate([
			{$addFields: {month: {$month: "$date"}}},
			{$addFields: {day: {$dayOfMonth: "$date"}}},
			{$match: {month: month, day: day}}
		]);

		for (let i = 0; i < toDayReminders.length; i++) {
			let reminder = toDayReminders[i];
			let event = await Event.findById(reminder.event).populate("user").exec();

			let honore = capitalize(event.personName);

			let subject;
			if (reminder.name === "The Same Day") {
				subject = `Today is ${honore}'s ${event.AnniversaryType} ${event.type}`;
			} else {
				const reminderName = reminder.name.split(" ");
				const time =
					reminderName[1] === "Days" && reminderName[0] === "1"
						? "Day"
						: reminderName[1] === "Weeks" && reminderName[0] === "1"
						? "Week"
						: reminderName[1] === "Days"
						? "Days"
						: "Weeks";

				subject = `in ${reminderName[0]} ${time} is ${honore}'s ${event.AnniversaryType} ${event.type}`;
			}

			let body = `Don't forget to congratulate ${honore} on his/her ${event.AnniversaryType} ${event.type}`;
			let eventDate = new Date(event.date);
			let eDay =
				eventDate.getDate() < 10 ? `0${eventDate.getDate()}` : eventDate.getDate();
			let eMonth =
				eventDate.getMonth() + 1 < 10 ? `0${eventDate.getMonth()}` : eventDate.getMonth();
			let eYear = eventDate.getFullYear() > 5000 ? "" : eventDate.getFullYear();
			let eDate = eYear ? `${eMonth}/${eDay}/${eYear}` : `${eMonth}/${eDay}`;
			let eage = eYear
				? `(${Math.floor(
						(toDay.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
				  )} years)`
				: "";
			let eventData = `${honore}'s ${event.AnniversaryType} ${event.type}: ${eDate} ${eage}`;

			// console.log(`
			// {subject: ${subject}
			// body: ${body}
			// data: ${eventData}}
			// `);

			if (event.user.mailNotification) {
				let mail = await transporter.sendMail({
					from: '"Happy Day" <happy.day.noti@gmail.com>', // sender address
					to: event.user.email, // list of receivers
					subject: subject, // Subject line
					html: `<!DOCTYPE html>
          <html lang="en">
          
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Happy Day</title>
              <style>
                  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Roboto:ital,wght@0,100;0,400;0,700;1,100&display=swap');
          
                  table {
                      margin: 0 auto;
                      text-align: center;
                  }
          
                  h1 {
                      font-family: 'Fredoka One', cursive;
                      color: rgb(0, 114, 221);
                  }
          
                  p {
                      font-family: 'Roboto', sans-serif;
                      font-weight: bold;
                      color: #6700b7;
                  }
              </style>
          </head>
          
          <body>
              <table>
                  <tr>
                      <td>
                          <img src="https://i.ibb.co/QQYf02y/logo.png" alt="Happy Day">
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <h1>${subject}</h1>
                          <p>${body}</p>
                          <p>${eventData}</p>
                      </td>
                  </tr>
              </table>
          
          </body>
          
          </html>` // html body
				});
				if (process.env.NODE_ENV !== "test") {
					console.log("Email message sended");
				}
			}
			// browser notifications
			if (event.user.browserNotification) {
				const payload = JSON.stringify({
					title: subject,
					text: `${body}
${eventData}`
				});

				await webpush.sendNotification(event.user.browserNotification, payload);
				console.log("notification sended");
			}

			// expo push
			if (event.user.expoPushToken) {
				const token = event.user.expoPushToken;
				if (!Expo.isExpoPushToken(token)) {
					console.log(`Push token ${token} is not a valid Expo push token`);
				} else {
					expoMessages.push({
						to: token,
						sound: "default",
						title: subject,
						body: `${body}
                    ${eventData}`
					});
				}
			}
		}
	} catch (error) {
		if (error) console.log(error);
	}

	let chunks = expo.chunkPushNotifications(expoMessages);
	let tickets = [];
	(async () => {
		for (let chunk of chunks) {
			try {
				let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				console.log(ticketChunk);
				tickets.push(...ticketChunk);
			} catch (error) {
				console.error(error);
			}
		}
	})();

	let receiptIds = [];
	for (let ticket of tickets) {
		if (ticket.id) {
			receiptIds.push(ticket.id);
		}
	}

	let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
	(async () => {
		for (let chunk of receiptIdChunks) {
			try {
				let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
				console.log(receipts);
				for (let receiptId in receipts) {
					let {status, message, details} = receipts[receiptId];
					if (status === "ok") {
						console.log(status);
						continue;
					} else if (status === "error") {
						console.error(`There was an error sending a notification: ${message}`);
						if (details && details.error) {
							console.error(`The error code is ${details.error}`);
							if (details.error === "DeviceNotRegistered") {
								let messageArr = message.split('"');
								const user = await User.findOne({expoPushToken: messageArr[1]});
								user.expoPushToken = "";
								await user.save();
							}
						}
					}
				}
			} catch (error) {
				console.error(error);
			}
		}
	})();
};
