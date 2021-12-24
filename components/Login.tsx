import Brand from "./figures/Brand";
import LoginForm from "./LoginForm";
import React from "react";
import styles from "./Signup.module.css";

export default function Login() {
	return (
		<div className={`flex flex-row justify-center ${styles.mt2} `}>
			<div className={`flex flex-col`}>
				<div className={`bg-transparent flex justify-center `}>
					<Brand textColor="text-black" height="6vh" />
				</div>
				<p className={`${styles.mt3} text-3xl font-semibold`}>
					To continue, Login to Spotify.
				</p>
				{/* TODO: Maybe facebook Login */}
				<span className={`${styles.divider}`}>or</span>
				<LoginForm styles={styles} />
			</div>
		</div>
	);
}
