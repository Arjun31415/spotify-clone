import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import spotifyApi from "../lib/spotifyAPI";
import { useEffect, useState } from "react";

import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function WebPlayer() {
	const [authURL, setAuthURL] = useState({});
	const [playlists, setPlaylists] = useState({});

	const router = useRouter();
	const spotifyAuthUrl = async () => {
		try {
			const response = await fetch("/api/spotifyAPI", {
				method: "POST",
				body: JSON.stringify({ nextURL: "/webplayer" }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			setAuthURL(await response.json());
			if (response.ok) {
				// If the response is ok than show the success
				console.log("Url received");
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
	const getPlaylists = async () => {
		try {
			const response = await fetch("/api/spotifyPlaylists", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			setPlaylists(await response.json());
			if (response.ok) {
				// If the response is ok than show the success
				console.log("Playlists received");
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
				if (!authURL.hasOwnProperty("url")) {
					console.log("authhing");
					spotifyAuthUrl();
				}
			} else {
				//  the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, [dispatch]);
	useEffect(() => {
		console.log(authURL);
		try {
			console.log("AUTHURL: ");
			console.log(authURL);
			router.push(authURL["url"]);
		} catch (error) {
			return;
		}
	}, [authURL]);
	return (
		<div>
			<h1>Hi{user?.displayName}</h1>
			<button onClick={getPlaylists}>Load spotify URL</button>
		</div>
	);
}
