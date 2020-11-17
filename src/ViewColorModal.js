import { React, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { fetchSavedColor } from "./api";

export default function ViewColorModal(props) {
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

	// State variables for selected color and loading/errors
	const [id, setId] = useState();
	const [color, setColor] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		fetchSavedColor(props.id)
			.then(
				(color) => {
					setColor(color);
				},
				(error) => {
					setError(error);
				}
			)
			.finally(() => {
				setId(props.id);
				setLoading(false);
			});
	}, [props.id]);

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

	// Form Validation
	function validateName(name) {
		if (!name && !color.name) {
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
		if (!hex && !color.hex) {
			setHexadecimalValueValidationError(
				"You are missing the Hexadecimal Value field."
			);
			return false;
		}
		if (!hexRegex.test(hex) && !hexRegex.test(color.hex)) {
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
		if (id) {
			var validHex = validateHex(hex);
			var validName = validateName(name);
			if (validHex && validName) {
				props.onSubmit(id, name ?? color.name, hex ?? color.hex);
				props.onClose();
			}
		}
	}

	// Delete color and close modal
	function handleDelete(event) {
		event.preventDefault();
		props.onDelete(props.id);
		props.onClose();
	}

	if (loading) {
		return (
			/* Loading spinner from https://tobiasahlin.com/spinkit/ */
			<div className="spinner"></div>
		);
	}

	return createPortal(
		<>
			<div className="scrim" onClick={props.onClose}></div>
			<div className="modal">
				<form onSubmit={handleSubmit}>
					<div class="form-group">
						<div
							class="swatch-large"
							style={{ backgroundColor: hex ?? color.hex }}
						></div>
						<h1>{name ?? color.name}</h1>
					</div>
					<div class="divider"></div>
					<div class="form-group">
						<p className="form-label">Name</p>
						<input
							id="name"
							value={name ?? color.name}
							onChange={handleNameChange}
							type="text"
							className="text-input"
							placeholder={color.name}
						></input>
						<p className="error-label">{nameValidationError}</p>
					</div>
					<div class="form-group">
						<p className="form-label">Hexadecimal Value</p>
						<input
							id="hex"
							value={hex ?? color.hex}
							onChange={handleHexChange}
							type="text"
							className="text-input"
							placeholder={color.hex}
						></input>
						<p className="error-label">{hexadecimalValueValidationError}</p>
					</div>
					<div class="form-group center">
						<div className="button-group-spacer-horizontal"></div>

						<button className="button button-danger" onClick={handleDelete}>
							Delete
						</button>
						<div className="button-group-spacer-horizontal"></div>
						<button type="submit" className="button button-primary">
							Save
						</button>
						<br></br>
						<div className="button-group-spacer-vertical-32dp"></div>
						<button className="button button-secondary" onClick={props.onClose}>
							Close
						</button>
					</div>
				</form>
			</div>
		</>,
		modalContainer
	);
}
