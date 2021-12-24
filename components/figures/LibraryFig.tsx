import React, { useState } from "react";

function LibraryFig(props) {
	const [libHover, setLibHover] = useState(false);

	return (
		<>
			{!props.isActive ? (
				<svg
					role="img"
					height="24"
					width="24"
					viewBox="0 0 24 24"
					fill={libHover ? props.hoverColor : props.color}
					onMouseEnter={() => setLibHover(true)}
					onMouseLeave={() => setLibHover(false)}
				>
					<path d="M13.66 4.097l-.913.406 7.797 17.513.914-.406L13.66 4.097zM3 22h1V4H3v18zm6 0h1V4H9v18z"></path>
				</svg>
			) : (
				<svg role="img" height="24" width="24" viewBox="0 0 24 24">
					<path
						fill="white"
						d="M14.617 3.893l-1.827.814 7.797 17.513 1.827-.813-7.797-17.514zM3 22h2V4H3v18zm5 0h2V4H8v18z"
					></path>
				</svg>
			)}
		</>
	);
}

export default LibraryFig;
