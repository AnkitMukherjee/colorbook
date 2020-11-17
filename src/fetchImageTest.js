const test = {
	id: "k9qlmvRgmhE",
	created_at: "2020-11-04T00:31:54-05:00",
	updated_at: "2020-11-14T17:21:31-05:00",
	promoted_at: "2020-11-04T10:24:01-05:00",
	width: 4016,
	height: 6016,
	color: "#F9B06B",
	blur_hash: "LFEx@TIA9a9v?bo}IU-p0KIp-;w]",
	description: null,
	alt_description: "brown wooden table and chairs",
	urls: {
		raw:
			"https://images.unsplash.com/photo-1604467744966-5557120dbe61?ixlib=rb-1.2.1&;ixid=eyJhcHBfaWQiOjE4Mjk0N30",
		full:
			"https://images.unsplash.com/photo-1604467744966-5557120dbe61?ixlib=rb-1.2.1&;q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE4Mjk0N30",
		regular:
			"https://images.unsplash.com/photo-1604467744966-5557120dbe61?ixlib=rb-1.2.1&;q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE4Mjk0N30",
		small:
			"https://images.unsplash.com/photo-1604467744966-5557120dbe61?ixlib=rb-1.2.1&;q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4Mjk0N30",
		thumb:
			"https://images.unsplash.com/photo-1604467744966-5557120dbe61?ixlib=rb-1.2.1&;q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE4Mjk0N30",
	},
	links: {
		self: "https://api.unsplash.com/photos/k9qlmvRgmhE",
		html: "https://unsplash.com/photos/k9qlmvRgmhE",
		download: "https://unsplash.com/photos/k9qlmvRgmhE/download",
		download_location: "https://api.unsplash.com/photos/k9qlmvRgmhE/download",
	},
	categories: [],
	likes: 14,
	liked_by_user: false,
	current_user_collections: [],
	sponsorship: null,
	user: {
		id: "P442PDYdCHc",
		updated_at: "2020-11-13T16:49:45-05:00",
		username: "jordannix",
		name: "Jordan Nix",
		first_name: "Jordan",
		last_name: "Nix",
		twitter_username: null,
		portfolio_url: "http://www.nixcreative.co",
		bio:
			"NIXcreative is a social media, public relations, and brand marketing agency. Photos are created for clients that didn't make the cut! ",
		location: "dallas",
		links: {
			self: "https://api.unsplash.com/users/jordannix",
			html: "https://unsplash.com/@jordannix",
			photos: "https://api.unsplash.com/users/jordannix/photos",
			likes: "https://api.unsplash.com/users/jordannix/likes",
			portfolio: "https://api.unsplash.com/users/jordannix/portfolio",
			following: "https://api.unsplash.com/users/jordannix/following",
			followers: "https://api.unsplash.com/users/jordannix/followers",
		},
		profile_image: {
			small:
				"https://images.unsplash.com/profile-1601612294684-8131183b2cb3image?ixlib=rb-1.2.1&;q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
			medium:
				"https://images.unsplash.com/profile-1601612294684-8131183b2cb3image?ixlib=rb-1.2.1&;q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
			large:
				"https://images.unsplash.com/profile-1601612294684-8131183b2cb3image?ixlib=rb-1.2.1&;q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128",
		},
		instagram_username: "nixcreative",
		total_collections: 0,
		total_likes: 15,
		total_photos: 83,
		accepted_tos: true,
	},
	exif: {
		make: "NIKON CORPORATION",
		model: "NIKON D750",
		exposure_time: "1/800",
		aperture: "1.8",
		focal_length: "35.0",
		iso: 1000,
	},
	location: {
		title: null,
		name: null,
		city: null,
		country: null,
		position: {
			latitude: null,
			longitude: null,
		},
	},
	views: 89351,
	downloads: 682,
};

export default function fetchImageTest() {
	// console.log(test);
	return test;
}
