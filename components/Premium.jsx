import React, { useState } from "react";

import Image from "next/image";
import styles from "./Premium.module.css";

function Premium() {
	const [clicked1, setClicked1] = useState(false);
	const [clicked2, setClicked2] = useState(false);

	return (
		<div className="font-sans">
			{/* Rupee symbol */}
			<section
				className={`${styles.container} bg-paleYellow justify-center`}
			>
				<div className={`flex justify-center ${styles.container}`}>
					<div className={`${styles.flexItemLeft} flex-col flex`}>
						<h2 className="font-medium">
							Save ₹250 on the 12-month one-time plan{" "}
						</h2>
						<p>
							Enjoy ad-free music listening, offline playback, and
							more .
						</p>
						<span className="flex py-5 justify-start">
							<button
								className={
									`mt-1 mr-3  rounded-full bg-black text-white 
									px-5 py-2 active:border-white 
									active:border-4 border-4 hover:scale-105 ` +
									(clicked1 === true
										? "border-white"
										: "border-transparent")
								}
								onClick={() => setClicked1(true)}
							>
								GET PREMIUM
							</button>
							<button
								className={
									`mt-1 ml-3 rounded-full bg-black text-white 
									px-5 py-2 active:border-white 
									active:border-4 border-4 hover:scale-105 ` +
									(clicked2 === true
										? "border-white"
										: "border-transparent")
								}
								onClick={() => setClicked2(true)}
							>
								VIEW PLANS{" "}
							</button>
						</span>
						<p className="items-center">
							<small
								className="flex"
								style={{ maxWidth: "300px" }}
							>
								Terms and conditions apply. Open only to users
								who aren&apos;t subscribed to a recurring
								Premium plan and who haven&apos;t purchased
								either a 12-month one-time Premium plan at a
								promotional price or a 6-month one-time Premium
								plan offering 3 additional months free.{" "}
							</small>
						</p>
					</div>
					<div
						className={`${styles.flexItemRight}`}
						style={{ width: "450px" }}
					>
						<Image
							src="https://i.scdn.co/image/ab678e040000ed3a428143ebcee76dfb7eb59637"
							alt="img"
							height={320}
							width={320}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Premium;
