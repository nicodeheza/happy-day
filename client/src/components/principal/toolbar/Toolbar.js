import React from "react";
import {setAuth} from "../../../redux/actions/authActions";
import {useDispatch} from "react-redux";
import "./toolbar.css";
import {
	showAdd,
	showHelp,
	showSearch,
	showSettings
} from "../../../redux/actions/showCardActions";
import SERVER_URL from "../../../serverUrl";

export default function Toolbar() {
	//const setAuth= useContext(authContext);
	const dispatch = useDispatch();

	const logOut = () => {
		fetch(`${SERVER_URL}/logout`, {
			method: "GET",
			headers: {"Content-type": "application/json; charset=UTF-8"},
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch(setAuth(data.auth));
				//console.log("fetch toolbar.js logout");
			})
			.catch((err) => console.log(err));
	};

	return (
		<footer className="toolbar">
			<button className="toolbar-btn" onClick={() => dispatch(showSearch())}>
				<img src="img/search.svg" alt="search icon" />
			</button>
			<button className="toolbar-btn" onClick={() => dispatch(showAdd())}>
				<img src="img/add.svg" alt="add icon" />
			</button>
			<button className="toolbar-btn" onClick={() => dispatch(showSettings())}>
				<img src="img/settings.svg" alt="settings icon" />
			</button>
			<button className="toolbar-btn">
				<img src="img/help.svg" alt="help icon" onClick={() => dispatch(showHelp())} />
			</button>
			<button className="toolbar-btn" onClick={() => logOut()}>
				<img src="img/logout.svg" alt="logout icon" />
			</button>
		</footer>
	);
}
