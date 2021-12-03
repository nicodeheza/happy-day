import {GET_AUTH, SET_AUTH} from "../const/authConst";
import SERVER_URL from "../../serverUrl";

export const getAuth = () => (dispatch) => {
	fetch(SERVER_URL, {
		method: "GET",
		headers: {"Content-type": "application/json; charset=UTF-8"},
		credentials: "include"
	})
		.then((res) => res.json())
		.then((data) => {
			dispatch({
				type: GET_AUTH,
				payload: data.auth
			});
			console.log(data.from);
		})
		.catch((err) => console.log(err));
};

export const setAuth = (authStatus) => (dispatch) => {
	dispatch({
		type: SET_AUTH,
		payload: authStatus
	});
};
