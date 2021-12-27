import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";

import Cookies from "cookies";
import { GetServerSideProps } from "next";
import LeftPane from "../components/LeftPane";
import WebPlayerMain from "../components/WebPlayerMain";
import { aboutMe } from "./api/spotify/aboutMe";
import { auth } from "../lib/firebase";
import { getPlaylists } from "./api/spotify/playlists";

const spotifyAuthUrl = async (baseUrl) => {
	try {
		const response = await fetch(baseUrl + "/api/spotifyAPI", {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// ...
	const req = ctx.req;
	const res = ctx.res;
	const protocol = req.headers["x-forwarded-proto"] || "http";
	const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
	let playlists = await getPlaylists(baseUrl);
	let me = await aboutMe(baseUrl);

	// console.log(req.headers);

	if ("error" in playlists) {
		const cookies = new Cookies(req, res);
		cookies.set("isAuthenticated", "0");

		return {
			redirect: {
				permanent: false,
				destination: "/webplayer",
			},
			props: {},
		};
	}

	console.log(me);
	return {
		props: { playlists, me },
	};
};
export default function WebPlayer({ playlists, me }) {
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

	return (
		<div>
			{/* set search={true} library={true} for the respective pages*/}
			<div className="flex flex-row">
				<div className="w-2/12">
					<LeftPane home={true} playlists={playlists} />
				</div>
				<div className="flex-auto">
					<WebPlayerMain profileName={user?.displayName} />
				</div>
			</div>
		</div>
	);
}
