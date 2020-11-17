import React from "react";
import { createPortal } from "react-dom";

export default function NotificationComponent(props) {
	const notificationContainer = document.getElementById(
		"notification-container"
	);
	const notificationText = props.text;

	return createPortal(
		<>
			<button className="notification" onClick={props.onClick}>
				<p>{notificationText}</p>
			</button>
		</>,
		notificationContainer
	);
}
