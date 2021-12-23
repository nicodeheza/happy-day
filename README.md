# Happy Day

MERN stack app

## About The Project

Happy Day is a full stack web application where you can add your's friends and family birthdays or important anniversaries and the app will send you an email notifiaction and/or a push notification to your browser (you need to activate this feature in the setting menu). The backend api alsow send notifacation to the movile app version(I will upload the repository in the fiuter).

Here you can visit the live demo:<br/>
[https://happyday.nicolasdeheza.com](https://happyday.nicolasdeheza.com)

Alsow you can use this test user:<br/>
**User:** testuser@testuser.com<br/>
**Password:** testuser

**Some feature of the app:**

- User login.
- User singup.
- Sessions.
- Password recovery via email.
- Add, edit and delete events and reminders.
- Activate or deactivate emails notification.
- Search events by date, name or type.
- Month shortcuts.
- send notification via email and push notifications.

## Built With

Here are some of the technologys I use to build this project:

- React js
- Redux
- Express js
- Nodemailer
- Passport.js
- Mongo db
- Mongoose
- web-push

For backend testing:

- Mocha
- Chai
- Sinon

For frontend testing:

- Jest
- testing-library

For deploying:

- Docker
- Docker-compose
- Nginx
- Certbot

## How to run it locally?

The easiest way to run this project locally is with npm. I don't recommend you to run it with docker becos the docker-compose file was made for run the app in production.

First clone this repository:<br/>
`git clone https://github.com/nicodeheza/happy-day.git`<br/>
then `cd server` and `npm install`. Wait the installation end and then run `npm run dev`. <br/>
Open a new terminal and `cd` to `client` folder, then `npm install` and `npm start`. Finally visit `localhost:3000` in your browser.
