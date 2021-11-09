import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";

import DatePicker, {
	utils,
} from "@amir04lm26/react-modern-calendar-date-picker";
import React, { useState } from "react";

React.useLayoutEffect = React.useEffect;
function SignupForm({ styles }) {
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileName, setProfile] = useState("");
	const [gender, setGender] = useState(null);
	const [dob, setDOB] = useState(null);
	return (
		<form action="POST" className="flex flex-col">
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
					value={confirmEmail}
					placeholder="Enter a profile name."
					onChange={(e) => setConfirmEmail(e.target.value)}
				/>
			</div>
			{/* For date of birth */}
			<div className="flex flex-col">
				<label htmlFor={styles.dob} className="font-semibold mt-6 mb-4">
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
		</form>
	);
}

export default SignupForm;
