require("dotenv").config();
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const options = {
	auth: {
		api_key: process.env.SENDGRID_API_KEY
	}
};

module.exports = nodemailer.createTransport(sgTransport(options));
