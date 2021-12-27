import calculate_age from "./AgeCalc";
import { regexPattern } from "./RegexObject";

export function validateEmail(email: string) {
	if (!email || email === "")
		return { value: true, message: "You need to enter your email" };
	let val = regexPattern.test(email);
	if (!val) return { value: !val, message: "It is not a valid email" };
	return { value: false, message: "" };
}
export function validatePassword(password: string) {
	if (!password || password === "")
		return { value: true, message: "You need to provide a password " };
	if (password.length < 6)
		return {
			value: true,
			message: "Your password is too short, must have more than 6 characters",
		};
	return { value: false, message: "" };
}
export function validateDOB(dob: { year: number, month: number, day: number }) {
	if (!dob) {
		return { value: true, message: "Choose your date of birth." };
	}
	// temp is true if the age is <13 years
	let temp = !calculate_age(new Date(dob.year, dob.month, dob.day));
	if (temp) {
		return {
			value: true,
			message:
				"Sorry, You do not meet the age requirements (must be 13yrs or older).",
		};
	}
	return { value: false, message: "" };
}

export function validateProfileName(profileName: string) {
	if (!profileName) {
		return {
			value: true,
			message: "Profile name cannot be empty",
		};
	}
	return { value: false, message: "" };
}
