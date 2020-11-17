export default function fetchImage(query) {
	const url =
		"https://api.unsplash.com/photos/random/?client_id=XTCppeiTkFcwahM7ZIygObFlu5wmfQWNZ0OCoszQscU&query=" +
		query +
		"&content_filter=high&orientation=landscape";
	return fetch(url, {
		headers: {
			Accept: "application/json",
		},
	})
		.then((response) => {
			// console.log(response);
			return response.json();
		})
		.then((responseData) => {
			// console.log(responseData);
			return responseData;
		});
}
