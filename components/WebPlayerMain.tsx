import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Collapsible from "react-collapsible";
import Link from "next/link";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import React from "react";
import Script from "next/script";
import styles from "./WebPlayerMain.module.css";

function WebPlayerMain({ profileName }) {
	const options = ["logout", "two", "three"];
	// const defaultOption = options[0];
	return (
		<div className={`${styles.bgGrayGradient} ${styles.hFull} flex`}>
			<div className={`flex flex-row ml-4 container ${styles.wrapper}`}>
				<button
					className={`mt-3 mr-2 bg-black text-white
					px-2 py-2 font-sans font-semibold rounded-full`}
				>
					<ArrowBackIosNewIcon />
				</button>
				<button
					className="mt-3 ml-2 bg-black text-white \
					px-2 py-2 \
					font-sans font-semibold rounded-full"
				>
					<ArrowForwardIosIcon />
				</button>
			</div>
			<Collapsible
				trigger={
					<>
						<div>
							<div
								className={` ${styles.textGray} pr-4 py-1 ml-auto mr-5 bg-black rounded-full flex flex-row justify-center items-center`}
								id="profileBtn"
							>
								<span className={`${styles.profilePic} mr-2`}>
									<PermIdentityOutlinedIcon />
								</span>
								<span className={`mr-2`}>{profileName}</span>
							</div>
						</div>
					</>
				}
				tabIndex={0}
				easing={"cubic-bezier(0.175, 0.885, 0.32, 2.275)"}
			>
				<Link href="/logout">
					<a href="">
						<div
							className={` ${styles.textGray} ${styles.bgGray} ml-auto mr-3 mt-1 flex flex-row justify-center items-center rounded-t`}
						>
							Logout
						</div>
					</a>
				</Link>
				<Link href="/profile">
					<a href="">
						<div
							className={` ${styles.textGray} ${styles.bgGray} ml-auto mr-3 flex flex-row justify-center items-center rounded-t`}
						>
							Profile
						</div>
					</a>
				</Link>
			</Collapsible>
		</div>
	);
}

export default WebPlayerMain;
