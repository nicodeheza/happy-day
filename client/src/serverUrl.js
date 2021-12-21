const SERVER_URL =
	process.env.NODE_ENV === "production"
		? `${window.location.protocol}//${window.location.host}/api`
		: "http://localhost:4000/api";
export default SERVER_URL;
