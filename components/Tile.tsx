import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Play from "./figures/Play";
import styles from "./Tile.module.css";

function Tile({ artist }) {
	// console.log(artist);
	const [isHoveringTile, setIsHoveringTile] = useState(false);
	return (
		<Link href="/webplayer/artist">
			<a>
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
					{/* PLay button */}
					{isHoveringTile && (
						// TODO: Start the player and play the artists top songs and add the next songs to the queue
						<div
							className={`${styles.tile__playBtn} ml-auto mr-2`}
							key={artist.id}
						>
							<Play width={50} key={artist.id} />
						</div>
					)}
				</div>
			</a>
		</Link>
	);
}

export default Tile;
