import React, {useEffect, useState} from "react";
import Card from "./cards/Card";
import Header from "./header/Header";
import Toolbar from "./toolbar/Toolbar";
import "./principal.css";
import Calendar from "./calendar/Calendar";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../redux/actions/authActions";
import {setEmailNotification} from "../../redux/actions/emialNotificationActions";
import SERVER_URL from "../../serverUrl";

export const principalContext = React.createContext();

export default function Principal() {
	const dispatch = useDispatch();

	const message = useSelector((store) => store.message.text);
	const [firstFetch, setFirstFetch] = useState(true);

	//get email notification status
	useEffect(() => {
		if (firstFetch) {
			fetch(`${SERVER_URL}/emailNotification`, {
				method: "GET",
				headers: {"Content-type": "application/json; charset=UTF-8"},
				credentials: "include"
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.auth === false) {
						dispatch(setAuth(data.auth));
					} else {
						dispatch(setEmailNotification(data.mailNotification));
						setFirstFetch(false);
						//console.log("fetch principal.js email notification");
					}
				})
				.catch((err) => console.log(err));
		}
	}, [firstFetch, dispatch]);

	return (
		<div>
			<Header />

			<div className="tool-card">
				<Card />

				<Toolbar />
			</div>

			<Calendar />

			<Message message={message} />
		</div>
	);
}

//message component
function Message({message}) {
	const [style, setStyle] = useState({display: "flex"});
	useEffect(() => {
		if (message) {
			setStyle({display: "flex"});
		} else {
			setStyle({display: "none"});
		}
	}, [message]);
	return (
		<>
			<div
				className="message"
				onAnimationEnd={() => setStyle({display: "none"})}
				style={style}
			>
				<p>{message}</p>
			</div>
		</>
	);
}
