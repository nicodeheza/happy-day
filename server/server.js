require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const apiRoutes = require("./routes/apiRoutes");
const recoverRoutes = require("./routes/recoverRoutes");

const mongoose = require("mongoose");

const mongo_uri =
	process.env.NODE_ENV === "test"
		? process.env.MONGO_URI_TEST
		: process.env.NODE_ENV === "dev"
		? process.env.MONGO_URI
		: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/happyDay?authSource=admin`;

console.log(process.env.NOTIFICATION);

mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to Mongoose"));

if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:3000", // <-- location of the react app were connecting to
			credentials: true
		})
	);
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({mongoUrl: mongo_uri})
	})
);
//cuando cargue agregar mongostore al session
app.use(cookieParser(process.env.SECRET)); //require ('crypto').randomBytes(64).toString('hex') en consola con node

require("./middlewares/passportConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);
app.use("/api/recover", recoverRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

if (process.env.NODE_ENV === "test") {
	module.exports = app;
}

//send notifications
if (process.env.NOTIFICATION === "send") {
	const sendNoti = require("./notifications/sendNotifiactions");
	const schedule = require("node-schedule");

	schedule.scheduleJob("00 10 * * *", () => sendNoti());

	//sendNoti();
}

console.log(process.env.NODE_ENV);
