import React from "react";
interface Props {
	width: number;
}
function Play({ width }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={width}
			height={width}
			viewBox="0 0 172 172"
			style={{ fill: "#000000" }}
		>
			<defs>
				<linearGradient
					x1="91.03906"
					y1="161.25"
					x2="91.03906"
					y2="15.44708"
					gradientUnits="userSpaceOnUse"
					id="color-1_jqxt7LSpMyNE_gr1"
				>
					<stop offset="0.322" stopColor="#8ab4ff"></stop>
					<stop offset="0.466" stopColor="#e492ff"></stop>
					<stop offset="0.752" stopColor="#e492ff"></stop>
					<stop offset="0.898" stopColor="#e492ff"></stop>
				</linearGradient>
				<linearGradient
					x1="40621.98034"
					y1="76159.43189"
					x2="40621.98034"
					y2="7301.8311"
					gradientUnits="userSpaceOnUse"
					id="color-2_jqxt7LSpMyNE_gr2"
				>
					<stop offset="0.322" stopColor="#8ab4ff"></stop>
					<stop offset="0.466" stopColor="#e492ff"></stop>
					<stop offset="0.752" stopColor="#e492ff"></stop>
					<stop offset="0.898" stopColor="#e492ff"></stop>
				</linearGradient>
				<linearGradient
					x1="35448.85944"
					y1="66451.84633"
					x2="35448.85944"
					y2="6380.99771"
					gradientUnits="userSpaceOnUse"
					id="color-3_jqxt7LSpMyNE_gr3"
				>
					<stop offset="0.322" stopColor="#8ab4ff"></stop>
					<stop offset="0.466" stopColor="#e492ff"></stop>
					<stop offset="0.752" stopColor="#e492ff"></stop>
					<stop offset="0.898" stopColor="#e492ff"></stop>
				</linearGradient>
			</defs>
			<g
				fill="none"
				fillRule="nonzero"
				stroke="none"
				strokeWidth="1"
				strokeLinecap="butt"
				strokeLinejoin="miter"
				strokeMiterlimit="10"
				strokeDasharray=""
				strokeDashoffset="0"
				fontFamily="none"
				fontWeight="none"
				fontSize="none"
				textAnchor="none"
				style={{ mixBlendMode: "normal" }}
			>
				<path d="M0,172v-172h172v172z" fill="none"></path>
				<g>
					<path
						d="M64.16406,117.50791c0.33905,0.00002 0.67262,-0.08548 0.96985,-0.24859l53.75,-29.49229c0.64501,-0.35397 1.04591,-1.03127 1.04591,-1.76703c0,-0.73576 -0.4009,-1.41306 -1.04591,-1.76703l-53.75,-29.49229c-0.62447,-0.34276 -1.38348,-0.33045 -1.9965,0.03239c-0.61302,0.36283 -0.989,1.0223 -0.98897,1.73465v58.98458c0,1.1132 0.90243,2.01563 2.01563,2.01563zM66.17969,59.91277l47.54423,26.08723l-47.54423,26.08723z"
						fill="url(#color-1_jqxt7LSpMyNE_gr1)"
					></path>
					<path
						d="M86,6.71875c-32.06623,0.00005 -60.97499,19.31631 -73.2462,48.94165c-12.27121,29.62534 -5.48827,63.72557 17.18595,86.39984c20.01802,20.08016 49.23567,27.94136 76.62705,20.61703c27.39138,-7.32434 48.78612,-28.71907 56.11046,-56.11046c7.32434,-27.39138 -0.53687,-56.60903 -20.61703,-76.62705c-14.83545,-14.9169 -35.02215,-23.27854 -56.06024,-23.22101zM139.20981,139.20981c-29.38697,29.38697 -77.03266,29.38697 -106.41962,0c-29.38697,-29.38697 -29.38697,-77.03266 0,-106.41962c29.38697,-29.38697 77.03266,-29.38697 106.41962,0c29.38697,29.38697 29.38697,77.03266 0,106.41963z"
						fill="url(#color-2_jqxt7LSpMyNE_gr2)"
					></path>
					<path
						d="M86.93088,16.80292c-31.32785,-0.41387 -58.01641,20.10452 -66.94529,48.42741c-0.19487,0.61282 -0.08594,1.28182 0.29325,1.80117c0.3792,0.51935 0.98324,0.82685 1.6263,0.82788h0.00269c0.87572,0.00036 1.65063,-0.56696 1.91484,-1.40187c8.32823,-26.43526 33.08044,-45.65491 62.23545,-45.62938c35.77264,0.03124 65.02305,29.23194 65.11376,65.00391c0.0907,36.0125 -29.1802,65.33984 -65.17187,65.33984c-35.93591,0 -65.17187,-29.23597 -65.17187,-65.17187c0,-1.97285 0.08746,-3.92397 0.26237,-5.85337c0.09515,-0.73068 -0.21598,-1.45505 -0.81142,-1.88909c-0.59544,-0.43405 -1.38027,-0.50859 -2.04677,-0.19441c-0.66651,0.31419 -1.10845,0.96702 -1.15256,1.70255c-0.18566,2.05392 -0.27995,4.13203 -0.28286,6.23433c0,38.1588 31.04432,69.20313 69.20313,69.20313c38.22062,0 69.30391,-31.1451 69.20313,-69.38856c-0.10078,-37.64751 -30.62809,-68.51378 -68.27224,-69.01164z"
						fill="url(#color-3_jqxt7LSpMyNE_gr3)"
					></path>
				</g>
			</g>
		</svg>
	);
}

export default Play;
