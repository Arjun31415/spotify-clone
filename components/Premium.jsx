import Image from "next/image";
import React from "react";
import styles from "./Premium.module.css";
function Premium() {
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
						<span className="flex p-5">
							<button className="mr-1.5">GET PREMIUM</button>
							<button className="ml-1.5">VIEW PLANS </button>
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
					<div className={`${styles.flexItemRight}`}>
						<Image
							src="https://i.scdn.co/image/ab678e040000ed3a428143ebcee76dfb7eb59637"
							alt="img"
							height="320px"
							width="320px"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Premium;
