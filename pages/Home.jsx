import React, { useState } from "react";

function Home() {
	const [clicked, setClicked] = useState(false);
	return (
		<div
			className="text-spotifyGreen spotifyBg 
     bg-170 bg-spotifyBlue bg-customHome
    flex flex-col items-center justify-center min-h-screen py-2 p-5"
		>
			<h1
				className="font-sans text-10xl font-black text-center max-w-2xl tracking-tighter
      transform-gpu translate-x-7 leading-none"
				style={{ textIndent: "-2.5em" }}
			>
				Listening is everything
			</h1>
			<p className="mt-2 font-medium ">
				Millions of songs and podcasts. No credit card needed.
			</p>
			<button
				className={
					"mt-14 text-center bg-spotifyGreen text-spotifyBlue \
          px-5 py-3 hover:bg-spotifyLightGreen1 hover:scale-105 \
          font-semibold rounded-full active:bg-spotifyLightGreen2 \
           active:border-white active:border-4 border-4 " +
					(clicked ? "border-white" : "border-transparent")
				}
				onClick={() => setClicked(true)}
			>
				GET SPOTIFY FREE
			</button>
		</div>
	);
}

export default Home;
