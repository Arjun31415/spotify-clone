import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import { auth } from "../lib/firebase";
import spotifyApi from "../lib/spotifyAPI";
import { useEffect } from "react";

export default function WebPlayer() {
	spotifyApi.getUserPlaylists("jmperezperez").then(
		function (data) {
			console.log("User playlists", data);
		},
		function (err) {
			console.error(err);
		}
	);
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
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
