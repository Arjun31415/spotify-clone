import { useEffect } from "react";
import { auth } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";

export default function WebPlayer() {
	const dispatch = useDispatch();
	//TODO: Put this in a file of its own and export it as useUserSelector
	const user = useSelector((state) => state.user.user);
	useEffect(() => {
		// will only run once when app component loads.
		auth.onAuthStateChanged((authUser) => {
			console.log("User: ", authUser);
			// console.log(user);

			if (authUser) {
				// the user just logged in or the user was already logged in
				// if you refresh the page it will log back in if you were already logged in.
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				//  the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, [dispatch]);
	return (
		<div>
			<h1>Hi{user?.displayName}</h1>
		</div>
	);
}
