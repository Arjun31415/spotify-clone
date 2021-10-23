// import "tailwindcss/tailwind.css";

import "../styles/globals.css";

import Home from "./Home";
import Navbar from "./Navbar";

function MyApp(props) {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default MyApp;
