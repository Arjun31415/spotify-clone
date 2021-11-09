import Brand from "./figures/Brand";
import Link from "next/link";
import React from "react";

function Navbar() {
	return (
		<div className="bg-black p-5 space-x-7 flex flex-row">
			{/* Logo and Brand */}
			<div className="justify-center flex flex-auto">
				<Brand height="6vh" width="10vw" />
			</div>

			<nav className="flex items-center justify-end flex-auto">
				{/* Navigation Links */}
				<ul className="text-white flex flex-row space-x-7 mr-auto ml-16 font-bold text-lg">
					<Link href="/premium">
						<a>
							<li className="hover:text-spotifyGreen">Premium</li>
						</a>
					</Link>
					<Link href="/support">
						<a>
							<li className="hover:text-spotifyGreen">Support</li>
						</a>
					</Link>
					<Link href="/download">
						<a>
							<li className="hover:text-spotifyGreen">
								Download
							</li>
						</a>
					</Link>
					<li>|</li>
					<Link href="/signup">
						<a>
							<li className="hover:text-spotifyGreen">Sign Up</li>
						</a>
					</Link>
					<Link href="/login">
						<a>
							<li className="hover:text-spotifyGreen">Log In</li>
						</a>
					</Link>
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
