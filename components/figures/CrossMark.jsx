import React from "react";

function CrossMark({ classes }) {
	return (
		<svg
			role="img"
			focusable="false"
			height="24"
			width="24"
			viewBox="0 0 24 24"
			aria-label="Error:"
			className={`${classes}`}
		>
			<path
	d="M4.93 4.93l14.14 14.14m-14.14 0L19.07 4.93"
	fill="none"
	stroke="red"
	/>
		</svg>
	);
}

export default CrossMark;
