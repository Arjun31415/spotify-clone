import React, { useState } from "react";

import Image from "next/image";
import Play from "./figures/Play";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";
import styles from "./Tile.module.css";

function Tile({ artist }) {
	console.log(artist);
	const [isHoveringTile, setIsHoveringTile] = useState(false);
	const [isHoveringPlay, setIsHoveringPlay] = useState(0);
	return (
		<div
			key={artist.id}
			className={`mr-2 ml-2 flex items-center ${styles.tile}`}
			onMouseEnter={() => {
				console.log(artist.name);
				return setIsHoveringTile(true);
			}}
			onMouseLeave={() => setIsHoveringTile(false)}
		>
			<Image
				alt="cover image"
				src={artist.images[0].url}
				height={100}
				width={100}
				layout="fixed"
			></Image>
			<h2 className={`text-white ${styles.tile__text}`}>{artist.name}</h2>

			{true && (
				<div
					className={`${styles.tile__playBtn} ml-auto mr-2`}
					key={artist.id}
					onMouseEnter={() => {
						console.log(artist.name);
						return setIsHoveringPlay(1);
					}}
					onMouseLeave={() => setIsHoveringPlay(0)}
				>
					<Play width={50} key={artist.id} />
				</div>
			)}
		</div>
	);
}

export default Tile;
