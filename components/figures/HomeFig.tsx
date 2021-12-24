import React, { useState } from "react";

import Link from "next/link";

const MyHomeFig = React.forwardRef(function HomeFig1(props, ref) {
	const [homeHover, setHomeHover] = useState(false);

	return (
		<>
			{!props.isActive ? (
				<svg
					role="img"
					height="24"
					width="24"
					className={
						`fill-current cursor-pointer hover:text-white ` +
						(props.textColor ? props.textColor : ` text-slate-600`)
					}
					ref={ref}
					viewBox="0 0 24 24"
					onMouseEnter={() => setHomeHover(true)}
					onMouseLeave={() => setHomeHover(false)}
				>
					<path
						fill={homeHover ? props.hoverColor : props.color}
						d="M9 14h6v7h5V7.8l-8-4.6-8 4.6V21h5v-7zm1 8H3V7.2L12 2l9 5.2V22h-7v-7h-4v7z"
					></path>
				</svg>
			) : (
				<svg role="img" height="24" width="24" viewBox="0 0 24 24">
					<path
						fill="white"
						d="M21 22V7.174l-9.001-5.195L3 7.214V22h7v-7h4v7z"
					></path>
				</svg>
			)}
		</>
	);
});
const HomeFig = (
	props: JSX.IntrinsicAttributes & React.RefAttributes<unknown>
) => (
	<Link href={"/webplayer"}>
		<a>
			<MyHomeFig {...props} />
		</a>
	</Link>
);
export default HomeFig;
