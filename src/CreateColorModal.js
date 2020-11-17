import { React, useState } from "react";
import { createPortal } from "react-dom";

export default function CreateColorModal(props) {
	// Set container to its respective div in index.html
	const modalContainer = document.getElementById("modal-container");

	// State variables for Name and Hexadecimal Value and validation error text
	const [name, setName] = useState();
	const [hex, setHex] = useState();
	const [nameValidationError, setNameValidationError] = useState("");
	const [
		hexadecimalValueValidationError,
		setHexadecimalValueValidationError,
	] = useState("");

	// Live update input values
	function handleNameChange(event) {
		setName(toTitleCase(event.target.value));
	}

	function handleHexChange(event) {
		setHex(event.target.value.toUpperCase());
	}

	// toTitleCase() function from https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991 to make color-naming uniform
	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	// Form validation
	function validateName(name) {
		if (!name) {
			setNameValidationError("You are missing the Name field.");
			return false;
		} else {
			setNameValidationError("");
			return true;
		}
	}

	function validateHex(hex) {
		//Hexadecimal Regex from https://mkyong.com/regular-expressions/how-to-validate-hex-color-code-with-regular-expression/
		var hexRegex = new RegExp("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");
		if (!hex) {
			setHexadecimalValueValidationError(
				"You are missing the Hexadecimal Value field."
			);
			return false;
		}
		if (!hexRegex.test(hex)) {
			setHexadecimalValueValidationError(
				"Your Hexadecimal Value is not in the correct format."
			);
			return false;
		} else {
			setHexadecimalValueValidationError("");
			return true;
		}
	}

	// Check against validation before submitting
	function handleSubmit(event) {
		event.preventDefault();
		var validHex = validateHex(hex);
		var validName = validateName(name);
		if (validHex && validName) {
			props.onSubmit(name, hex);
		}
	}

	return createPortal(
		<>
			<div className="scrim" onClick={props.onClose}></div>
			<div className="modal">
				<form onSubmit={handleSubmit}>
					<div class="divider"></div>
					<div class="form-group">
						<p className="form-label">Name</p>
						<input
							id="name"
							value={name}
							onChange={handleNameChange}
							type="text"
							className="text-input"
							placeholder="Obsidian Black"
						></input>
						<p className="error-label">{nameValidationError}</p>
					</div>
					<div class="form-group">
						<p className="form-label">Hexadecimal Value</p>
						<input
							id="hex"
							value={hex}
							onChange={handleHexChange}
							type="text"
							className="text-input"
							placeholder="#000000"
						></input>
						<p className="error-label">{hexadecimalValueValidationError}</p>
					</div>
					<div class="form-group center">
						<button className="button button-secondary" onClick={props.onClose}>
							Close
						</button>
						<div className="button-group-spacer-horizontal"></div>
						<button type="submit" className="button button-primary">
							Add
						</button>
					</div>
				</form>
			</div>
		</>,
		modalContainer
	);
}
