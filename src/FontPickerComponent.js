import React, { Component } from "react";
import FontPicker from "font-picker-react";

export class FontPickerPrimary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFontFamily: "Roboto",
		};
	}

	render() {
		return (
			<div>
				<FontPicker
					pickerId="primary"
					apiKey="AIzaSyCrqQL6Dpr7mzV-xiTSGNgX7vXy_iDmQ54"
					limit="100"
					sort="alphabet"
					activeFontFamily={this.state.activeFontFamily}
					onChange={(nextFont) =>
						this.setState({
							activeFontFamily: nextFont.family,
						})
					}
				/>
			</div>
		);
	}
}

export class FontPickerSecondary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFontFamily: "Roboto Mono",
		};
	}

	render() {
		return (
			<div>
				<FontPicker
					pickerId="secondary"
					apiKey="AIzaSyCrqQL6Dpr7mzV-xiTSGNgX7vXy_iDmQ54"
					limit="100"
					sort="alphabet"
					activeFontFamily={this.state.activeFontFamily}
					onChange={(nextFont) =>
						this.setState({
							activeFontFamily: nextFont.family,
						})
					}
				/>
			</div>
		);
	}
}
