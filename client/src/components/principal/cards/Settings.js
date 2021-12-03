import React from "react";
import {
	isPushNotificationSupported,
	registerServiceWorker,
	askUserPermission,
	createNotificationSubscription,
	postSubscription
} from "../../../push-notifications";
import {setAuth} from "../../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "../../../redux/actions/messageActions";
import {toggleEmailNotification} from "../../../redux/actions/emialNotificationActions";
import SERVER_URL from "../../../serverUrl";

export default function Settings() {
	const dispatch = useDispatch();
	const emailNotification = useSelector((store) => store.emailNotification.activate);

	const emailNotificationSettings = () => {
		dispatch(toggleEmailNotification());

		fetch(`${SERVER_URL}/emailNotification`, {
			method: "PUT",
			headers: {"Content-type": "application/json; charset=UTF-8"},
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.auth === false) {
					dispatch(setAuth(data.auth));
				}
				//console.log(data);
			})
			.catch((err) => console.log(err));
	};

	const activateBnotification = async () => {
		try {
			if (isPushNotificationSupported()) {
				registerServiceWorker();
				const permission = await askUserPermission();

				if (permission === "granted") {
					const subscription = await createNotificationSubscription();
					const res = await postSubscription(subscription);
					if (res.auth === false) {
						dispatch(setAuth(res.auth));
					} else {
						dispatch(setMessage("Notifications Activated"));
						console.log(res);
					}
				} else {
					dispatch(
						setMessage(
							"Something went wrong, check your browser's notification settings and try again"
						)
					);
				}
			} else {
				dispatch(setMessage("Notifications are not supported by your browser"));
			}
		} catch (error) {
			if (error) console.log(error);
		}
	};

	return (
		<div className="card-form">
			<div className="label-st">
				<label htmlFor="emialSettings">Email Notifications</label>
				<div className="switch-btn-container">
					<p>on/off</p>
					<div
						className="switch-btn"
						name="emialSettings"
						data-testid="emialSettings"
						onClick={() => emailNotificationSettings()}
					>
						<div
							className={emailNotification ? "switch-btn-int" : "switch-btn-int eOff"}
						/>
					</div>
				</div>
			</div>

			<div className="label">
				<label htmlFor="browser">Browser Notifications</label>
				<button
					className="a-r-b"
					style={{padding: "5px 10px"}}
					onClick={() => activateBnotification()}
				>
					Activate
				</button>
			</div>
		</div>
	);
}
