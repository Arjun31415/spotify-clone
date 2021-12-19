import CrossMark from "./figures/CrossMark";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { validateEmail, validatePassword } from "../utils/Validator.ts";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function LoginForm({styles}){

	// for form control
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [checkEmail, setCheckEmail] = useState(-1);
	const [checkPassword, setCheckPassword] = useState(-1);
	const [emailError, setEmailError] = useState({ value: false, message: "" });
	const [passwordError, setPasswordError] = useState({
		value: false,
		message: "",
	});
	const isFirstRun = useRef(new Array(2).fill(true));
	function login(e) {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				console.log(userCredential);
				// const user = userCredential.user;
				if (userCredential) {
					router.push("/");
				}
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error({ code: errorCode, message: errorMessage });
			});
	}
	// for email error
	useEffect(() => {
		if (isFirstRun.current[0]) {
			isFirstRun.current[0] = false;
			return;
		}
		if (!validateEmail) return;
		try {
			if (validateEmail(email).value)
				setEmailError({ value: true, message: validateEmail(email).message });
		} catch (e) {
			console.error(e);
		}

		return () => {
			setEmailError({ value: false, message: "" });
		};
	}, [email, checkEmail]);

	// Password error
	useEffect(() => {
		if (isFirstRun.current[1]) {
			isFirstRun.current[1] = false;
			return;
		}
		try {
			const temp = validatePassword(password);
			if (temp.value) {
				setPasswordError({ value: true, message: temp.message });
			}
		} catch (e) {
			console.error(e);
		}

		return () => {
			setPasswordError({ value: false, message: "" });
		};
	}, [password, checkPassword]);


	return <form className="flex flex-col" method="post" style={{ maxWidth: "460px" }}>
		{/* For email */}
		<div className="flex flex-col">
			<label htmlFor={styles.email} className="font-semibold">
				{"Enter email address"}
			</label>
			<input
				type="text"
				id={styles.email}
				name="email"
				className={`border-solid border-gray-500 border-2 
                            rounded h-10 mt-3.5 p-5  
                            `}
				value={email}
				placeholder="Enter your email."
				onChange={(e) => setEmail(e.target.value)}
				onBlur={() => {
					setCheckEmail(1);
				}}
				tabIndex={0}
			/>
		</div>
		{/* emailError */}
		<div
			id="emailError"
			className="mt-2 text-red-500 text-sm"
			hidden={!emailError.value}
		>
			<CrossMark classes={styles.crossMark} />
			{emailError.message}
		</div>


		{/* For Password */}
		<div className="flex flex-col">
			<label htmlFor={styles.password} className="font-semibold mt-6">
				{"Password"}
			</label>
			<input
				type="password"
				id={styles.password}
				name="password"
				className={`border-solid border-gray-500 border-2 
                            rounded h-10 mt-3.5 p-5 
                            `}
				value={password}
				placeholder="Enter password."
				onChange={(e) => setPassword(e.target.value)}
				onBlur={() => {
					setCheckPassword(1);
				}}
				tabIndex={0}
			/>
		</div>
		<div
			id="passwordError"
			className="mt-2 text-red-500 text-sm"
			hidden={!passwordError.value}
		>
			<CrossMark classes={styles.crossMark} />
			{passwordError.message}
		</div>


		{/* SignUp */}
		<div className="flex justify-center mt-3.5">
			<button
				type="submit"
				onClick={login}
				className={
					"bg-spotifyGreen rounded-full py-5 px-12 w-auto font-bold mt-3 disabled:opacity-40"
				}
				disabled={
					emailError.value ||
					passwordError.value
				}
			>
				Log In
			</button>
		</div>
		<p className="flex justify-center mt-10">
			Don&apos;t have an account? &nbsp;
			<Link href="/signup">
				<a className="text-spotifyGreen underline hover:text-spotifyLightGreen2  ">
					Sign Up.
				</a>
			</Link>
		</p>
	</form>

}