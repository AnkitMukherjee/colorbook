import { React, useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
} from "react-router-dom";
import {
	FontPickerPrimary,
	FontPickerSecondary,
} from "./FontPickerComponent.js";
import ColorPicker from "./ColorPickerComponent.js";
import NotificationComponent from "./NotificationComponent.js";
import fetchImage from "./fetchImage.js";
import CreateColorModal from "./CreateColorModal.js";
import ViewColorModal from "./ViewColorModal.js";
import { saveColor, fetchSavedColors, destroySavedColor } from "./api.js";
import "./App.css";

function App() {
	return (
		<>
			<Router>
				<div>
					<div className="header">
						<h1>ColorBook</h1>

						<ul className="navigation-bar">
							<li className="navigation-item">
								<NavLink to={"/"} activeClassName="active-item" exact={true}>
									HOME
								</NavLink>
							</li>
							<li className="navigation-item">
								<NavLink
									to={"/Mobile"}
									activeClassName="active-item"
									exact={true}
								>
									MOBILE
								</NavLink>
							</li>
							<li className="navigation-item">
								<NavLink
									to={"/Print"}
									activeClassName="active-item"
									exact={true}
								>
									PRINT
								</NavLink>
							</li>
							<li className="navigation-item">
								<NavLink
									to={"/saved-colors"}
									activeClassName="active-item"
									exact={true}
								>
									SAVED COLORS
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="main-container">
						<Switch>
							<Route exact={true} path="/">
								<Home />
							</Route>
							<Route exact={true} path="/Home">
								<Home />
							</Route>
							<Route exact={true} path="/Mobile">
								<MobileEditor />
							</Route>
							<Route exact={true} path="/Print">
								<PrintEditor />
							</Route>
							<Route exact={true} path="/saved-colors">
								<SavedColors />
							</Route>
							<Route path="*">
								<NoMatch />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		</>
	);
}

const Home = () => {
	return (
		<>
			<head>
				<title>ColorBook · Home</title>
			</head>
			<div className="image-panel"></div>
			<div className="right-panel">
				<div className="editor">
					<div className="divider"></div>
					<h2>About</h2>
					<p className="paragraph">
						Curious if a color you've found will work in different situations?
						<br></br>
						<br></br>ColorBook makes testing an accent color for digital or
						print applications a little bit easer with two quick, visual WYSIWYG
						editors.<br></br>
						<br></br>Simply add any color and apply with one click to a basic
						media card and/or paper sheet to get a quick sense for if that color
						will work for your intended application.<br></br>
						<br></br>
						Feel free to adjust the typefaces to more accurately emulate your
						future application too.<br></br>
						<br></br>In the future, I hope to implement the ability to save
						typographic selections and to expand the number of WYSIWYG previews
						available.
					</p>
				</div>
			</div>
		</>
	);
};

const MobileEditor = () => {
	const [unsplashImageData, setUnsplashImageData] = useState([]);
	const [accentColor, setAccentColor] = useState("#000000");
	const [savedColors, setSavedColors] = useState([]);
	const [allColors, setAllColors] = useState([]);
	const [notificationText, setNotificationText] = useState();

	const [loading, setLoading] = useState(true);
	const [isModalShown, setIsModalShown] = useState(false);
	const [isNotificationShown, setIsNotificationShown] = useState(false);

	useEffect(() => {
		Promise.all([fetchImage("white"), fetchSavedColors()]).then(
			([imageData, colors]) => {
				setUnsplashImageData(imageData);

				const defaultColors = ["#000000", "#007AFF"];
				const savedColors = [];

				colors.forEach((color) => {
					savedColors[color.id] = color.hex;
				});
				setSavedColors(savedColors);
				setAllColors(defaultColors.concat(savedColors));
				setLoading(false);
			}
		);
	}, []);

	if (loading) {
		return (
			/* Loading spinner from https://tobiasahlin.com/spinkit/ */
			<div className="spinner"></div>
		);
	}

	function newImage(query) {
		setLoading(true);
		fetchImage(query).then((image) => {
			setUnsplashImageData(image);
			setLoading(false);
		});
	}

	function showModal() {
		setIsModalShown(true);
	}

	function hideModal() {
		setIsModalShown(false);
	}

	function showNotification(text) {
		setNotificationText(text);
		setIsNotificationShown(true);
	}

	function hideNotification() {
		setIsNotificationShown(false);
	}

	function createColor(name, hex) {
		saveColor({
			name: toTitleCase(name),
			hex: hex.toUpperCase(),
		}).then((newColor) => {
			showNotification(
				'Your color "' + newColor.name + '" was succesfully saved.'
			);
			allColors.push(hex);
		});
	}

	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	return (
		<>
			<head>
				<title>ColorBook · Mobile</title>
			</head>

			{isNotificationShown && (
				<NotificationComponent
					text={notificationText}
					onClick={hideNotification}
				/>
			)}
			{isModalShown && (
				<CreateColorModal onClose={hideModal} onSubmit={createColor} />
			)}
			<div className="left-panel">
				<div className="card">
					<div className="card-header">
						<div className="profile-container">
							<div
								className="profile-image"
								style={{
									backgroundImage:
										"url(" + unsplashImageData.user.profile_image.medium + ")",
									backgroundPosition: "center",
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
								}}
							></div>
							<div className="user-info-container">
								<p className="username primary-mobile apply-font-primary">
									{unsplashImageData.user.username}
									<br></br>
									<span className="secondary-mobile apply-font-secondary">
										November 15, 2020
									</span>
								</p>
							</div>
							<button className="label secondary-mobile apply-font-secondary">
								<span className="label-icon">
									<i
										className="material-icons icon-mobile"
										style={{ color: accentColor }}
									>
										favorite
									</i>
								</span>
								{unsplashImageData.likes}
							</button>
						</div>
					</div>
					<div
						className="card-image"
						style={{
							backgroundImage: "url(" + unsplashImageData.urls.regular + ")",
							backgroundPosition: "center",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
						}}
					></div>
					<div className="text-container">
						<p className="overline secondary-mobile apply-font-secondary">
							{unsplashImageData.user.location ?? "No Location"}
						</p>
						<p className="text primary-mobile apply-font-primary">
							{unsplashImageData.description ??
								unsplashImageData.alt_description ??
								"In nec nisl imperdiet, bibendum lectus ac, ultricies mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}
						</p>
					</div>
					<div className="card-footer">
						<button
							className="mobile-button mobile-button-secondary apply-font-primary"
							style={{ color: accentColor, border: "1px solid " + accentColor }}
						>
							Save
						</button>
						<button
							className="mobile-button mobile-button-primary apply-font-primary"
							style={{ backgroundColor: accentColor }}
						>
							Share
						</button>
					</div>
				</div>
			</div>
			<div className="right-panel">
				<div className="editor">
					<form>
						<div className="divider"></div>
						<div className="form-group">
							<p className="form-label">Change Media</p>
							<button
								className="button button-chip"
								onClick={() => newImage("Nature")}
							>
								Nature
							</button>
							<div className="button-group-spacer-horizontal"></div>
							<button
								className="button button-chip"
								onClick={() => newImage("People")}
							>
								People
							</button>
							<div className="button-group-spacer-vertical-8dp"></div>
							<button
								className="button button-chip"
								onClick={() => newImage("Food")}
							>
								Food
							</button>
							<div className="button-group-spacer-horizontal"></div>
							<button
								className="button button-chip"
								onClick={() => newImage("Abstract")}
							>
								Abstract
							</button>
						</div>
						<div className="form-group">
							<p className="form-label">Primary Typeface</p>
							{/* FontPicker from https://www.npmjs.com/package/font-picker */}
							<FontPickerPrimary />
						</div>
						<div className="form-group">
							<p className="form-label">Secondary Typeface</p>
							<FontPickerSecondary />
						</div>
						<div className="form-group">
							<p className="form-label">Accent Color</p>
							<ul className="color-picker">
								<ColorPicker
									customColors={allColors}
									accentColor={accentColor}
									onClick={setAccentColor}
								/>
								<li
									key="add-color"
									className="color add-color"
									onClick={() => showModal()}
								>
									<i className="material-icons icon">add</i>
								</li>
							</ul>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

const PrintEditor = () => {
	const [accentColor, setAccentColor] = useState("#1c1c1e");
	const [savedColors, setSavedColors] = useState([]);
	const [allColors, setAllColors] = useState([]);
	const [notificationText, setNotificationText] = useState();

	const [loading, setLoading] = useState(true);
	const [isModalShown, setIsModalShown] = useState(false);
	const [isNotificationShown, setIsNotificationShown] = useState(false);

	useEffect(() => {
		fetchSavedColors().then((colors) => {
			colors.forEach((color) => {
				savedColors[color.id] = color.hex;
			});

			const defaultColors = ["#1c1c1e", "#123456"];
			const savedColors = [];

			setSavedColors(savedColors);
			setAllColors(defaultColors.concat(savedColors));
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			/* Loading spinner from https://tobiasahlin.com/spinkit/ */
			<div className="spinner"></div>
		);
	}

	function showModal() {
		setIsModalShown(true);
	}

	function hideModal() {
		setIsModalShown(false);
	}

	function showNotification(text) {
		setNotificationText(text);
		setIsNotificationShown(true);
	}

	function hideNotification() {
		setIsNotificationShown(false);
	}

	function createColor(name, hex) {
		saveColor({
			name: toTitleCase(name),
			hex: hex.toUpperCase(),
		}).then((newColor) => {
			showNotification(
				'Your color "' + newColor.name + '" was succesfully saved.'
			);
			allColors.push(hex);
		});
	}

	// toTitleCase() function from https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991
	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	return (
		<>
			<head>
				<title>ColorBook · Print</title>
			</head>

			{isNotificationShown && (
				<NotificationComponent
					text={notificationText}
					onClick={hideNotification}
				/>
			)}
			{isModalShown && (
				<CreateColorModal onClose={hideModal} onSubmit={createColor} />
			)}
			<div className="left-panel">
				<div className="paper">
					<div
						className="colorblock"
						style={{ backgroundColor: accentColor }}
					></div>
					<div className="divider"></div>
					<p className="overline-print secondary-print apply-font-secondary">
						Overline
					</p>
					<p className="headline-print primary-print apply-font-primary">
						Headline
					</p>
					<p
						className="subheadline-print apply-font-secondary"
						style={{ color: accentColor }}
					>
						Sed faucibus nibh sit amet tortor bibendum, a dictum velit tempor.
					</p>
					<p className="body-print secondary-print apply-font-primary">
						Cras tempus nulla augue, at convallis erat sagittis sed. Etiam
						consectetur tempus nisi, a dapibus libero gravida eu. Suspendisse et
						purus et nunc venenatis faucibus. Maecenas cursus tincidunt nunc ut
						luctus. Nunc accumsan eget lectus id venenatis. Nunc velit tortor,
						cursus sed felis eu, feugiat maximus nulla. Vestibulum id imperdiet
						ante. Maecenas a dolor id.
					</p>
				</div>
			</div>
			<div className="right-panel">
				<div className="editor">
					<form>
						<div className="divider"></div>
						<div className="form-group">
							<p className="form-label">Primary Typeface</p>
							{/* FontPicker from https://www.npmjs.com/package/font-picker */}
							<FontPickerPrimary />
						</div>
						<div className="form-group">
							<p className="form-label">Secondary Typeface</p>
							<FontPickerSecondary />
						</div>
						<div className="form-group">
							<p className="form-label">Accent Color</p>
							<ul className="color-picker">
								<ColorPicker
									customColors={allColors}
									accentColor={accentColor}
									onClick={setAccentColor}
								/>
								<li
									key="add-color"
									className="color add-color"
									onClick={() => showModal()}
								>
									<i className="material-icons icon">add</i>
								</li>
							</ul>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

const SavedColors = () => {
	const [loading, setLoading] = useState(true);
	const [id, setId] = useState();
	const [savedColors, setSavedColors] = useState([]);
	const [isModalShown, setIsModalShown] = useState(false);
	const [notificationText, setNotificationText] = useState();
	const [isNotificationShown, setIsNotificationShown] = useState(false);

	useEffect(() => {
		fetchSavedColors().then((colors) => {
			setSavedColors(colors);
			setLoading(false);
		});
	}, []);

	function showModal(id) {
		setId(id);
		setIsModalShown(true);
	}

	function hideModal() {
		setIsModalShown(false);
	}

	function editColor(id, name, hex) {
		saveColor({
			id: id,
			name: name,
			hex: hex,
		}).then((color) => {
			for (let i = 0; i < savedColors.length; i++) {
				if (savedColors[i].id === id) {
					savedColors[i] = color;
				}
			}
			showNotification('Your color "' + name + '" was succesfully edited.');
		});
	}

	function deleteColor(id) {
		console.log(savedColors);
		setSavedColors(savedColors.filter((color) => color.id !== id));
		destroySavedColor(id);
		showNotification("Your color was succesfully deleted.");
	}

	function showNotification(text) {
		setNotificationText(text);
		setIsNotificationShown(true);
	}

	function hideNotification() {
		setIsNotificationShown(false);
	}

	if (loading) {
		return (
			/* Loading spinner from https://tobiasahlin.com/spinkit/ */
			<div className="spinner"></div>
		);
	}

	return (
		<>
			<head>
				<title>ColorBook · Saved Colors</title>
			</head>
			{isNotificationShown && (
				<NotificationComponent
					text={notificationText}
					onClick={hideNotification}
				/>
			)}
			{isModalShown && (
				<ViewColorModal
					id={id}
					onDelete={deleteColor}
					onSubmit={editColor}
					onClose={hideModal}
				/>
			)}
			<div className="inner-container">
				<ul>
					{savedColors.map((color) => {
						return (
							<li
								className="swatch-card"
								key={color.id}
								onClick={() => showModal(color.id)}
							>
								<div
									className="swatch"
									style={{ backgroundColor: color.hex }}
								></div>
								<button
									className="swatch-label"
									style={{ border: "1px solid " + color.hex, color: color.hex }}
								>
									{color.hex}
								</button>
								<div className="swatch-name-container">
									<div className="swatch-name">{color.name}</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

const NoMatch = () => {
	return (
		<div className="inner-container">
			<h3>404</h3>
			<p>Unfortunately, that route doesn't seem to exist.</p>
			<NavLink to={"/Home"} activeClassName="active-item" exact={true}>
				GO BACK HOME
			</NavLink>
		</div>
	);
};

export default App;
