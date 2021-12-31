import React, { useEffect, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Collapsible from "react-collapsible";
import Image from "next/image";
import Link from "next/link";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Tile from "./Tile";
import getTimeGreetings from "../utils/timeGetter";
import styles from "./WebPlayerMain.module.css";

function WebPlayerMain({ profileName, recommendations, topArtists: ta }) {
	console.log(recommendations);
	console.log(ta);
	function useWindowSize() {
		// Initialize state with undefined width/height so server and client renders match
		const [windowSize, setWindowSize] = useState({
			width: undefined,
			height: undefined,
		});

		useEffect(() => {
			function handleResize() {
				// Set window width/height to state
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}
			window.addEventListener("resize", handleResize);
			handleResize();
			return () => window.removeEventListener("resize", handleResize);
		}, []); // Empty array ensures that effect is only run on mount
		return windowSize;
	}
	const size = useWindowSize();
	console.log(size);
	if (size.width <= 640) {
		ta = ta.slice(0, 2);
	} else if (size.width <= 1007) ta = ta.slice(0, 6);

	// const defaultOption = options[0];
	return (
		<div className={`${styles.bgGrayGradient} ${styles.hFull} `}>
			<div className={`flex`}>
				<div className={`flex flex-row ml-4 container ${styles.wrapper}`}>
					<button
						className={`mt-3 mr-2 bg-black text-white
						px-2 py-2 font-sans font-semibold rounded-full`}
					>
						<ArrowBackIosNewIcon />
					</button>
					<button
						className="mt-3 ml-2 bg-black text-white \
						px-2 py-2 \
						font-sans font-semibold rounded-full"
					>
						<ArrowForwardIosIcon />
					</button>
				</div>
				<Collapsible
					trigger={
						<div>
							<div
								className={` ${styles.textGray} pr-4 py-1 ml-auto mr-5 bg-black rounded-full flex flex-row justify-center items-center`}
								id="profileBtn"
							>
								<span className={`${styles.profilePic} mr-2`}>
									<PermIdentityOutlinedIcon />
								</span>
								<span className={`mr-2`}>{profileName}</span>
							</div>
						</div>
					}
					tabIndex={0}
					easing={"cubic-bezier(0.175, 0.885, 0.32, 2.275)"}
				>
					<Link href="/logout">
						<a href="">
							<div
								className={` ${styles.textGray} ${styles.bgGray} ml-auto mr-3 mt-1 flex flex-row justify-center items-center rounded-t`}
							>
								Logout
							</div>
						</a>
					</Link>
					<Link href="/profile">
						<a href="">
							<div
								className={` ${styles.textGray} ${styles.bgGray} ml-auto mr-3 flex flex-row justify-center items-center rounded-t`}
							>
								Profile
							</div>
						</a>
					</Link>
				</Collapsible>
			</div>
			<div className="text-3xl font-semibold ml-4 mt-6 text-white">
				{getTimeGreetings()}
			</div>
			{/* ta is top artist or top tracks god only knows */}
			<div className="flex flex-wrap">
				{ta.map((artist: { id: string }, index) => (
					<Tile artist={artist} key={artist.id} />
				))}
			</div>
		</div>
	);
}

export default WebPlayerMain;
