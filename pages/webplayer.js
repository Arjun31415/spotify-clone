import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import spotifyApi from "../lib/spotifyAPI";
import { useEffect, useState } from "react";

import { GetStaticProps } from "next";
import LeftPane from "../components/LeftPane";
import Router from "next/router";
import WebPlayerMain from "../components/WebPlayerMain";
import { auth } from "../lib/firebase";
import { spotifyApi } from "./api/spotifyAPI";
import { useRouter } from "next/router";

export const getStaticProps = async (context) => {
	// ...
	console.log("Hiiiii\n\n");
	let aboutUser;

	spotifyApi.getMe().then(
		function (data) {
			console.log("Some information about the authenticated user", data.body);
			aboutUser = data.body;
		},
		function (err) {
			console.log("Something went wrong!", err);
		}
	);
	return {
		props: {}, // will be passed to the page component as props
	};
};
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
			{/* set search={true} library={true} for the respective pages*/}
			<div className="flex flex-row">
				<div className="w-2/12">
					<LeftPane home={true} />
				</div>
				<div className="flex-auto">
					<WebPlayerMain profileName={user?.displayName} />
				</div>
			</div>
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
