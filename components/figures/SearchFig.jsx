import React, { useState } from "react";

function SearchFig(props) {
	const [searchHover, setSearchHover] = useState(false);

	return (
		<>
			{!props.isActive ? (
				<svg
					role="img"
					height="24"
					width="24"
					viewBox="0 0 24 24"
					onMouseEnter={() => setSearchHover(true)}
					onMouseLeave={() => setSearchHover(false)}
				>
					<path
						fill={searchHover ? props.hoverColor : props.color}
						d="M16.387 16.623A8.47 8.47 0 0019 10.5a8.5 8.5 0 10-8.5 8.5 8.454 8.454 0 005.125-1.73l4.401 5.153.76-.649-4.399-5.151zM10.5 18C6.364 18 3 14.636 3 10.5S6.364 3 10.5 3 18 6.364 18 10.5 14.636 18 10.5 18z"
					></path>
				</svg>
			) : (
				<svg role="img" height="24" width="24" viewBox="0 0 24 24">
					<path
						fill="white"
						d="M16.736 16.262A8.457 8.457 0 0019 10.5a8.5 8.5 0 10-3.779 7.067l4.424 5.18 1.521-1.299-4.43-5.186zM10.5 17C6.916 17 4 14.084 4 10.5S6.916 4 10.5 4 17 6.916 17 10.5 14.084 17 10.5 17z"
					></path>
				</svg>
			)}
		</>
	);
}

export default SearchFig;
