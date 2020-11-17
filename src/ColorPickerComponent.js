import { React, useState } from "react";
//pass accentcolor as a prop and if it matcches apply
export default function ColorPicker(props) {
	// Color picker array
	const colors = [];

	// Fallback color set
	const defaultColors = [
		"#000000",
		"#FF4F58",
		"#FF6A39",
		"#FFC658",
		"#26D07C",
		"#007AFF",
		"#5352ED",
	];

	// Set a state variable for color state
	const [colorState, setColorState] = useState([]);
	var tempColorState = [];

	// Add colors to the color picker according to how many were passed in
	for (let i = 0; i < props.customColors.length; i++) {
		colors.push(
			<Color
				id={i}
				colorValue={props.customColors[i] ?? defaultColors[i]}
				onClick={props.onClick}
			/>
		);
	}

	for (let i = 0; i < props.customColors.length; i++) {
		if (props.customColors[i] === props.accentColor) {
			colorState.push("active-color");
		}
		colorState.push("inactive-color");
	}

	return <>{colors}</>;

	function Color(props) {
		function handleClick() {
			props.onClick(props.colorValue);
			tempColorState = colorState;
			for (let i = 0; i < colorState.length; i++) {
				if (i === props.id) {
					colorState[i] = "active-color";
				} else {
					colorState[i] = "inactive-color";
				}
			}
			setColorState(tempColorState);
		}

		return (
			<li
				key={props.id}
				className={"color " + colorState[props.id]}
				style={{ backgroundColor: props.colorValue }}
				onClick={handleClick}
			></li>
		);
	}
}
