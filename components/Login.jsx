import React from "react";
import styles from "./Signup.module.css";
import Brand from "./figures/Brand";
import LoginForm from "./LoginForm";

export default function Login() {
	return <div className={`flex flex-row justify-center ${styles.mt2} `}>
		{/* scripts for recaptcha */}
		{/* <Script src="/reCaptcha.js"></Script>
			<script
				src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
				async
				defer
			></script> */}

		<div className={`flex flex-col`}>
			<div className={`bg-transparent flex justify-center `}>
				<Brand textColor="text-black" height="6vh"/>
			</div>
			<p className={`${styles.mt3} text-3xl font-semibold`}>
				To continue, Login to Spotify.
			</p>
			{/* TODO: Maybe facebook Login */}
			<span className={`${styles.divider}`}>or</span>
			<LoginForm styles={styles} />
		</div>
	</div>;
}
