import React, { useState } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

function Home() {
	const [clicked, setClicked] = useState(false);
	const router = useRouter();
	return (
		<>
			<Navbar />
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
				<p className="mt-2 font-medium font-sans">
					Millions of songs and podcasts. No credit card needed.
				</p>
				<button
					className={
						"mt-14 text-center bg-spotifyGreen text-spotifyBlue \
					  	px-5 py-3 hover:bg-spotifyLightGreen1 hover:scale-105 \
					  font-sans font-semibold rounded-full \
					   active:bg-spotifyLightGreen2 \
					   active:border-white active:border-4 border-4 " +
						(clicked === true ? "border-white" : "border-transparent")
					}
					onClick={() => {
						setClicked(true);
						router.push("/signup");
					}}
				>
					GET SPOTIFY FREE
				</button>
				<div className="flex flex-col mt-auto mb-auto ">
					<h1
						className="font-sans text-5xl font-black 
						max-w-2xl tracking-tighter leading-none mb-6"
					>
						Looking for music?
					</h1>
					<p className="font-sans text-2xl text-center">
						Start listening to the best new releases.
					</p>
					<button
						className={
							"mt-10 mr-auto ml-auto text-center bg-spotifyGreen text-spotifyBlue \
					px-5 py-3 hover:bg-spotifyLightGreen1 hover:scale-105 \
					font-sans font-semibold rounded-full \
					active:bg-spotifyLightGreen2 \
					active:border-white active:border-4 border-4 " +
							(clicked === true ? "border-white" : "border-transparent")
						}
						onClick={() => {
							setClicked(true);
							router.push("/webplayer");
						}}
					>
						OPEN WEBPLAYER
					</button>
				</div>
			</div>
			<Footer classes="" />
		</>
	);
}

export default Home;
