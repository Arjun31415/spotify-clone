import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";

import DatePicker, {
	utils,
} from "@amir04lm26/react-modern-calendar-date-picker";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
	validateDOB,
	validateEmail,
	validatePassword,
	validateProfileName,
} from "../utils/Validator";

import CrossMark from "./figures/CrossMark";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

export default function SignupForm({ styles }) {
	const router = useRouter();

	const recaptchaRef = createRef();
	// for form control
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileName, setProfile] = useState("");
	const [dob, setDOB] = useState(null);

	const [checkEmail, setCheckEmail] = useState(-1);
	const [checkPassword, setCheckPassword] = useState(-1);
	const [checkConfirmEmail, setCheckConfirmEmail] = useState(-1);
	const [checkProfileName, setCheckProfileName] = useState(-1);
	const [checkDOB, setCheckDOB] = useState(-1);

	let captchaErrorElement: HTMLElement;

	if (process.browser) {
		captchaErrorElement = document.getElementById("captchaError");
	}
	const [emailError, setEmailError] = useState({ value: false, message: "" });
	const [passwordError, setPasswordError] = useState({
		value: false,
		message: "",
	});
	const [confirmEmailError, setConfirmEmailError] = useState({
		value: false,
		message: "",
	});
	const [dobError, setDobError] = useState({ value: false, message: "" });
	// const [captchaError, setCaptchaError] = useState({
	// 	value: false,
	// 	message: "",
	// });
	const [profileError, setProfileError] = useState({
		value: false,
		message: "This appears on your profile.",
	});

	const isFirstRun = useRef(new Array(7).fill(true));
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

	// Confirm Email Error
	useEffect(() => {
		if (isFirstRun.current[1]) {
			isFirstRun.current[1] = false;
			return;
		}
		// console.log("confirmEmailError", confirmEmail);
		if (!confirmEmail || confirmEmail === "") {
			setConfirmEmailError({
				value: true,
				message: "You need to confirm your email.",
			});
			// console.log("confirmEmailError", confirmEmailError);
		} else if (confirmEmail !== email) {
			setConfirmEmailError({
				value: true,
				message: "The email addresses don't match.",
			});
		}
		return () => {
			setConfirmEmailError({ value: false, message: "" });
		};
	}, [confirmEmail, checkConfirmEmail, email]);
	// Password error
	useEffect(() => {
		if (isFirstRun.current[2]) {
			isFirstRun.current[2] = false;
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
	// Profile Name error
	useEffect(() => {
		if (isFirstRun.current[3]) {
			isFirstRun.current[3] = false;
			return;
		}
		try {
			const temp = validateProfileName(profileName);
			if (temp.value) {
				setProfileError({ value: true, message: temp.message });
			}
		} catch (e) {
			console.error(e);
		}

		return () => {
			setProfileError({
				value: false,
				message: "This appears on your profile",
			});
		};
	}, [profileName, checkProfileName]);
	// DOB error
	useEffect(() => {
		if (isFirstRun.current[4]) {
			isFirstRun.current[4] = false;
			return;
		}
		try {
			const temp = validateDOB(dob);
			if (temp.value) setDobError({ value: true, message: temp.message });
		} catch (e) {
			console.error(e);
		}

		return () => {
			setDobError({ value: false, message: "" });
		};
	}, [dob, checkDOB]);

	function signUp(e: { preventDefault: () => void }) {
		e.preventDefault();
		const recaptchaValue = recaptchaRef.current.getValue();
		console.log(recaptchaValue);
		let anyError = false;
		// validate the form

		if (!recaptchaValue) {
			captchaErrorElement.hidden = false;
			anyError = true;
		} else captchaErrorElement.hidden = true;

		if (validateEmail(email).value) {
			setEmailError(validateEmail(email));
			anyError = true;
		}
		if (validatePassword(password).value) {
			setPasswordError(validatePassword(password));
			anyError = true;
		}

		if (!confirmEmail || confirmEmail === "") {
			setConfirmEmailError({
				value: true,
				message: "You need to confirm your email.",
			});
			anyError = true;
			// console.log("confirmEmailError", confirmEmailError);
		} else if (confirmEmail !== email) {
			setConfirmEmailError({
				value: true,
				message: "The email addresses don't match.",
			});
			anyError = true;
		}
		if (validateDOB(dob).value) {
			setDobError({ value: true, message: validateDOB(dob).message });
			anyError = true;
		}
		if (validateProfileName(profileName).value) {
			setProfileError({
				value: true,
				message: validateProfileName(profileName).message,
			});
		}

		if (anyError) return;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				console.log(userCredential);
				const user = userCredential.user;
				// update the user's profileName
				updateProfile(user, { displayName: `${profileName}` });
				if (userCredential) {
					router.push("/webplayer");
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

	const onReCAPTCHAChange = async (captchaCode: any) => {
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
				// If the response is ok than show the success
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
		<form className="flex flex-col" method="post" style={{ maxWidth: "460px" }}>
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
					onBlur={() => {
						setCheckConfirmEmail(1);
					}}
					tabIndex={0}
				/>
			</div>
			{/* confirmEmailError */}
			<div
				id="confirmEmailError"
				className="mt-2 text-red-500 text-sm"
				hidden={!confirmEmailError.value}
			>
				<CrossMark classes={styles.crossMark} />
				{confirmEmailError.message}
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
					onBlur={() => {
						setCheckPassword(1);
					}}
					tabIndex={0}
				/>
			</div>

			{/* passwordError */}
			<div
				id="passwordError"
				className="mt-2 text-red-500 text-sm"
				hidden={!passwordError.value}
			>
				<CrossMark classes={styles.crossMark} />
				{passwordError.message}
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
					tabIndex={0}
					onBlur={() => {
						setCheckProfileName(1);
					}}
				/>
			</div>
			<div
				id="profileError"
				className={"mt-2 text-sm " + (profileError.value && "text-red-500")}
				hidden={false}
			>
				{profileError.value && <CrossMark classes={styles.crossMark} />}
				{profileError.message}
			</div>

			{/* For date of birth */}
			<div className="flex flex-col" onBlur={() => setCheckDOB(1)}>
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
			{/* yearError */}
			<div
				id={styles.dobError}
				className="mt-2 text-red-500 text-sm"
				hidden={!dobError.value}
			>
				<CrossMark classes={styles.crossMark} />
				{/* "Sorry, you don't meet the age requirements" */}
				{dobError.message}
			</div>

			<div className="mt-12 mb-2">
				<ReCAPTCHA
					ref={recaptchaRef}
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
					onChange={onReCAPTCHAChange}
				/>
			</div>
			{/* captchaError */}
			<div
				id="captchaError"
				className="mt-2 text-red-500 text-sm"
				hidden={true}
			>
				<CrossMark classes={styles.crossMark} />
				{"Confirm you are not a robot"}
			</div>
			{/* SignUp */}
			<div className="flex justify-center mt-3.5">
				<button
					type="submit"
					onClick={signUp}
					className={
						"bg-spotifyGreen rounded-full py-5 px-12 w-auto font-bold mt-3 disabled:opacity-40"
					}
					disabled={
						emailError.value ||
						confirmEmailError.value ||
						passwordError.value ||
						profileError.value ||
						dobError.value
					}
				>
					Sign up
				</button>
			</div>
			<p className="flex justify-center mt-10 mb-20">
				Have an account? &nbsp;
				<Link href="/login">
					<a className="text-spotifyGreen underline hover:text-spotifyLightGreen2  ">
						Log in.
					</a>
				</Link>
			</p>
		</form>
	);
}
