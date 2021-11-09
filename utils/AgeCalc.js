export default function calculate_age(dob) {
	// console.log("dob got: ", dob);
	// var diff_ms = Date.now() - dob.getTime();
	// var age_dt = new Date(diff_ms);
	// return Math.abs(age_dt.getUTCFullYear() - 1970);
	let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 13));
	return dob < minDate;
}
