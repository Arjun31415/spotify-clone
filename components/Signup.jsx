import Brand from "./Brand";
import React from "react";
import SignupForm from "./SignupForm";
import styles from "./Signup.module.css";

export default function Signup() {
	return (
		<div className={`flex flex-row justify-center ${styles.mt2} `}>
			<div className={`flex flex-col`}>
				<div className={`bg-transparent flex justify-center `}>
					<Brand textColor="text-black" height="4vh"></Brand>
				</div>
				<p className={`${styles.mt3} text-3xl font-semibold`}>
					Sign up for free to start listening.
				</p>
				{/* TODO: Maybe facebook signup */}
				<span className={`${styles.divider}`}>or</span>
				<SignupForm styles={styles} />
			</div>
		</div>
	);
}
