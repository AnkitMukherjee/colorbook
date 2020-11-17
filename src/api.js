// Create and Update
export function saveColor(data) {
	const isEditing = data.hasOwnProperty("id");
	const url = isEditing ? "/api/saved-colors/" + data.id : "/saved-colors";
	const method = isEditing ? "PUT" : "POST";
	return fetch(url, {
		method,
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => {
		console.log(response);
		return response.json();
	});
}

// Read
export function fetchSavedColors() {
	return fetch("/api/saved-colors").then((response) => {
		return response.json();
	});
}

export function fetchSavedColor(id) {
	return fetch("/api/saved-colors/" + id).then((response) => {
		if (response.status >= 400) {
			return Promise.reject(
				<div className="inner-container">
					<h3>Oops</h3>
					<p>
						Unfortunately, the color with and id of ${id} doesn't seem to exist.
					</p>
				</div>
			);
		}
		return response.json();
	});
}

// Delete
export function destroySavedColor(id) {
	return fetch("/api/saved-colors/" + id, {
		method: "DELETE",
	});
}
