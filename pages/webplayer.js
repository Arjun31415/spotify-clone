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

const getPlaylists = async (baseUrl) => {
	try {
		const response = await fetch(baseUrl + "/api/spotifyPlaylists", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response);
		if (response.ok) {
			// If the response is ok than show the success
			console.log("Playlists received");
			// setPlaylists(await response.json());
			return await response.json();
		}
		if (response.status >= 400 && response.status < 500) {
			console.log("error");
			return { error: "true" };
		}
	} catch (error) {
		console.log("error occurred");
		console.log(
			error?.message ||
				"Something went wrong. Please contact admin for bug report "
		);
		return { error: "true" };
	} finally {
		// idk man
	}
};
const spotifyAuthUrl = async () => {
	try {
		const response = await fetch("http://localhost:3000/api/spotifyAPI", {
			method: "POST",
			body: JSON.stringify({ nextURL: "/webplayer" }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const authURL = await response.json();
		if (response.ok) {
			// If the response is ok than show the success
			console.log("Url received");
			console.log(authURL);
			return authURL;
		}
	} catch (error) {
		console.log("error occurred");
		console.log(error);
		console.log(
			error?.message ||
				"Something went wrong. Please contact admin for bug report "
		);
	} finally {
		// idk man
	}
};
export const getServerSideProps = async (ctx) => {
	// ...
	const req = ctx.req;
	const protocol = req.headers["x-forwarded-proto"] || "http";
	const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
	let aboutMe;
	let playlists = await getPlaylists(baseUrl);

	console.log("Hiiiii\n\n");
	const authURL = await spotifyAuthUrl();
	console.log("Get server props");
	console.log("Playlists");
	console.log(playlists);
	if ("error" in playlists)
		return {
			redirect: {
				permanent: false,
				destination: authURL["url"],
			},
			props: {},
		};
	// aboutMe = await spotifyApi.getMe().then(
	// 	function (data) {
	// 		console.log("getting me\n");

	// 		// console.log("Some information about the authenticated user", data.body);
	// 		aboutMe = data.body;
	// 		return aboutMe;
	// 	},
	// 	function (err) {
	// 		console.log("ERERERERER");
	// 		console.log("Something went wrong!", err);
	// 	}
	// );
	// console.log(aboutMe);
	return {
		props: { playlists },
	};
};
export default function WebPlayer({ playlists, aboutMe }) {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	useEffect(() => {
		// will only run once when app component loads.
		auth.onAuthStateChanged((authUser) => {
			// console.log("User: ", authUser);
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
