//const SERVER_URL = "http://localhost:4000/api";
const SERVER_URL =
	process.env.NODE_ENV === "production"
		? "http://localhost:3000/api"
		: "http://localhost:4000/api";
export default SERVER_URL;
