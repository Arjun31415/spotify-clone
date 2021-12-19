import Brand from "./figures/Brand";
import React from "react";
import styles from "./Footer.module.css";

function Footer({ classes }) {
	return (
		<div className={`bg-black p-5 space-x-7 w-full ${classes}`}>
			<div className="flex flex-row">
				<div className="justify-center flex flex-auto mt-16 ">
					<Brand height="6vh" width="10vw" />
				</div>
				<nav className="flex justify-end flex-auto">
					{/* Navigation Links */}
					<ul
						className={`text-white font-bold text-lg flex flex-col mr-auto mt-16 list-none ${styles.navList}`}
					>
						<li>
							<small className={`${styles.small}`}>Company</small>
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer">About</li>
						<li className="hover:text-spotifyGreen cursor-pointer">Jobs</li>
						<li className="hover:text-spotifyGreen cursor-pointer">
							For the Record
						</li>
					</ul>
					<ul
						className={`text-white font-bold text-lg flex flex-col mr-auto mt-16 list-none ${styles.navList}`}
					>
						<li>
							<small className={`${styles.small}`}>Communities</small>
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer">
							For the Artists
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer">
							Developers
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer">
							Advertising
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer">
							Investors
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer">Vendors</li>
					</ul>
					<ul
						className={`text-white font-bold text-lg flex flex-col mr-auto mt-16 list-none ${styles.navList}`}
					>
						<li>
							<small className={`${styles.small}`}>USEFUL LINKS</small>
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer"> Support</li>
						<li className="hover:text-spotifyGreen cursor-pointer">
							Web Player{" "}
						</li>
						<li className="hover:text-spotifyGreen cursor-pointer">
							Free Mobile App
						</li>
					</ul>
				</nav>
			</div>

			{/* TODO: Separate div at the bottom for Privacy, TOS etc */}
			<div></div>
		</div>
	);
}

export default Footer;
