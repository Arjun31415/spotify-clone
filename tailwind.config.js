module.exports = {
	mode: "jit",
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./Components/**/*.{js,ts,jsx,tsx}",
		"./public/**/*.html",
		"./src/**/*.{js,jsx,ts,tsx,vue}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: [
				"Circular",
				"spotify-circular",
				"Helvetica",
				"Arial",
				"sans-serif",
			],
		},
		extend: {
			backgroundImage: {},
			colors: {
				spotifyBlue: "#2941ab",
				spotifyGreen: "#1ed760",
				spotifyLightGreen1: "#2de26d",
				spotifyLightGreen2: "#43e57d",
				paleYellow: "#ffc864",
			},
			backgroundSize: {
				170: "170%",
			},
			backgroundPosition: {
				customHome: " 44% 7%",
			},
			fontSize: {
				"10xl": "10rem",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
