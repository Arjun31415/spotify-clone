import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import spotifyApi from "../lib/spotifyAPI";
import { useEffect, useState } from "react";

import LeftPane from "../components/LeftPane.tsx";
import Router from "next/router";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function WebPlayer() {
	const [playlists, setPlaylists] = useState([]);

	const getPlaylists = async () => {
		try {
			const response = await fetch("/api/spotifyPlaylists", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response);
			if (response.ok) {
				// If the response is ok than show the success
				console.log("Playlists received");
				setPlaylists(await response.json());
			}
			if (response.status >= 400 && response.status < 500) {
				console.log("error");
				Router.reload(window.location.pathname);
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
	console.log("typeof playlists", typeof playlists);
	console.log(playlists);

	return (
		<div>
			<LeftPane home={true} search={true} />
			{/* <h1>Hi{user?.displayName}</h1>
			<button onClick={getPlaylists}>Load spotify URL</button>
			{playlists.items?.map((playlist) => (
				<div key={playlist["id"]} id={playlist["id"]}>
					{playlist["name"]}
				</div>
			))} */}
		</div>
	);
}
