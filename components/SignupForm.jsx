import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";

import DatePicker, {
	utils,
} from "@amir04lm26/react-modern-calendar-date-picker";
import React, { useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "@firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";

import CrossMark from "./figures/CrossMark";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { auth } from "../lib/firebase";
import calculate_age from "../utils/AgeCalc";
import { useRouter } from "next/router";

React.useLayoutEffect = React.useEffect;

function SignupForm({ styles }) {
	const router = useRouter();

	const recaptchaRef = React.createRef();
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileName, setProfile] = useState("");
	const [dob, setDOB] = useState(null);
	// For errors
	const emailErrorElement = document.getElementById("emailError");
	const passwordErrorElement = document.getElementById("passwordError");
	const confirmEmailErrorElement = document.getElementById("confirmEmailError");
	const yearErrorElement = document.getElementById("yearError");

	const onSubmit = (e) => {
		e.preventDefault();
		const recaptchaValue = recaptchaRef.current.getValue();
		console.log(recaptchaValue);
		// TODO: do something on submit like storing the user to firebase
		// this.props.onSubmit(recaptchaValue);
	};
	function signIn(e) {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				console.log(userCredential);
				// const user = userCredential.user;
				if (userCredential) {
					router.push("/");
				}
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error({ code: errorCode, message: errorMessage });
			});
	}

	function signUp(e) {
		e.preventDefault();
		let anyError = false;
		// check for null or empty string first
		if (!dob) {
			yearErrorElement.hidden = false;
			yearErrorElement.innerText = "Please enter your date of birth.";
			anyError = true;
		}

		if (email === null || email === "") {
			emailErrorElement.hidden = false;
			emailErrorElement.innerText = "Please enter and email";
			anyError = true;
		} else {
			emailErrorElement.hidden = true;
		}
		if (password === null || password === "" || password.length < 6) {
			passwordErrorElement.hidden = false;
			passwordErrorElement.innerText =
				"Password cannot be empty and must be longer than 6 characters.";
			anyError = true;
		} else {
			passwordErrorElement.hidden = true;
		}
		if (email !== confirmEmail) {
			confirmEmailErrorElement.hidden = false;
			confirmEmailErrorElement.innerText =
				"The email addresses in the two fields do not match.";
			anyError = true;
		}

		// check if AGE is >=13 yrs
		if (!dob) return;
		let temp = !calculate_age(new Date(dob.year, dob.month, dob.day));

		calculate_age(new Date(dob.year, dob.month, dob.day));
		// Show the Error
		if (temp) return void (document.getElementById("yearError").hidden = false);
		if (anyError) return;
		document.getElementById("yearError").hidden = true;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				console.log(userCredential);
				const user = userCredential.user;
				// update the user's profileName
				updateProfile(user, { displayName: `${profileName}` });
				if (userCredential) {
					router.push("/");
				}
				console.log("Date of birth: ", user.dob);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
				console.error({ code: errorCode, message: errorMessage });
			});
	}

	const onReCAPTCHAChange = async (captchaCode) => {
		// If the reCAPTCHA code is null or undefined indicating that
		// the reCAPTCHA was expired then return early
		if (!captchaCode) {
			recaptchaRef.current.reset();
			return;
		}
		// Else reCAPTCHA was executed successfully so proceed with the
		// alert
		try {
			const response = await fetch("/api/verifyCaptcha", {
				method: "POST",
				body: JSON.stringify({ captchaCode }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				// If the response is ok than show the success alert
				// alert("Email registered successfully");
				console.log("Recaptcha successful");
			} else {
				// Else throw an error with the message returned
				// from the API
				recaptchaRef.current.reset();

				const error = await response.json();
				throw new Error(error.message);
			}
		} catch (error) {
			alert(
				error?.message ||
					"Something went wrong. Please contact admin for bug report "
			);
		} finally {
			// idk man
		}
	};
	return (
		<form className="flex flex-col" method="post">
			{/* For email */}
			<div className="flex flex-col">
				<label htmlFor={styles.email} className="font-semibold">
					{"What's your email address?"}
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
				/>
			</div>
			<div id="emailError" className="mt-2 text-red-500" hidden={true}>
				<CrossMark classes={styles.crossMark} />
				{"Sorry, you don't meet the age requirements"}
			</div>
			{/* For confirmEmail */}
			<div className="flex flex-col">
				<label htmlFor={styles.confirmEmail} className="font-semibold mt-6">
					{"Confirm your email address"}
				</label>
				<input
					type="text"
					id={styles.confirmEmail}
					name="confirmEmail"
					className={`border-solid border-gray-500 border-2 
                            rounded h-10 mt-3.5 p-5 
                            `}
					value={confirmEmail}
					placeholder="Enter your email again."
					onChange={(e) => setConfirmEmail(e.target.value)}
				/>
			</div>
			<div id="confirmEmailError" className="mt-2 text-red-500" hidden={true}>
				<CrossMark classes={styles.crossMark} />
				{"Sorry, you don't meet the age requirements"}
			</div>
			{/* For Password */}
			<div className="flex flex-col">
				<label htmlFor={styles.password} className="font-semibold mt-6">
					{"Create a password"}
				</label>
				<input
					type="password"
					id={styles.password}
					name="password"
					className={`border-solid border-gray-500 border-2 
                            rounded h-10 mt-3.5 p-5 
                            `}
					value={password}
					placeholder="Create a password."
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div id="passwordError" className="mt-2 text-red-500" hidden={true}>
				<CrossMark classes={styles.crossMark} />
				{"Sorry, you don't meet the age requirements"}
			</div>
			{/* For Profile name */}
			<div className="flex flex-col">
				<label htmlFor={styles.profileName} className="font-semibold mt-6">
					{"What should we call you?"}
				</label>
				<input
					type="text"
					id={styles.profileName}
					name="profileName"
					className={`border-solid border-gray-500 border-2 
                            rounded h-10 mt-3.5 p-5 
                            `}
					value={profileName}
					placeholder="Enter a profile name."
					onChange={(e) => setProfile(e.target.value)}
				/>
			</div>
			{/* For date of birth */}
			<div className="flex flex-col">
				<label htmlFor={styles.dob} className="font-semibold mt-6 mb-5">
					{"What's your date of Birth?"}
				</label>
				<DatePicker
					value={dob}
					onChange={setDOB}
					inputPlaceholder="Select Birth date"
					maximumDate={utils().getToday()}
					shouldHighlightWeekends={false}
				/>
			</div>
			<div id="yearError" className="mt-2 text-red-500" hidden={true}>
				<CrossMark classes={styles.crossMark} />
				{"Sorry, you don't meet the age requirements"}
			</div>

			<div className="mt-12 mb-5">
				<ReCAPTCHA
					ref={recaptchaRef}
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
					onChange={onReCAPTCHAChange}
				/>
			</div>
			<div className="flex justify-center mt-3.5">
				<button
					type="submit"
					onClick={signUp}
					className="bg-spotifyGreen rounded-full py-5 px-12 w-auto font-bold"
				>
					Sign up
				</button>
			</div>
			<p className="flex justify-center mt-10">
				Have an account? &nbsp;
				<Link href="/login">
					<a className="text-spotifyGreen underline hover:text-spotifyLightGreen2  ">
						Log in.{" "}
					</a>
				</Link>
			</p>
		</form>
	);
}

export default SignupForm;
