module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"spotify-circular"', "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      backgroundImage: {},
      colors: {
        spotifyBlue: "#2941ab",
        spotifyGreen: "#1ed760",
        spotifyLightGreen1: "#2de26d",
        spotifyLightGreen2: "#43e57d",
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
