import Brand from "./Brand";
import React from "react";
import styles from "./Signup.module.css";

export default function Signup() {
	return (
		<div className={`flex justify-center ${styles.mt2} `}>
			<div className={`bg-transparent `}>
				<Brand textColor="text-black" height="4vh"></Brand>
			</div>
		</div>
	);
}
