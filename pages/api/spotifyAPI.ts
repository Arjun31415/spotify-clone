import type { NextApiRequest, NextApiResponse } from "next";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import SpotifyWebApi from "spotify-web-api-node";

type ResponseData = { url: String };
var spotifyApi = new SpotifyWebApi({
	clientId: "144e5d2ce1dd4cd2a01c21516acd5fd0",
	clientSecret: process.env.CLIENT_SECRET,
	// redirectUri: "http://localhost:3000/api/spotifyAuth/",
});

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const { body, method } = req;

	// console.log("body of request", body);
	var scopes = [
			"user-read-private",
			"user-read-email",
			"playlist-read-private",
			"playlist-modify-public",
			"user-read-playback-state",
			"user-modify-playback-state",
			"user-read-currently-playing",
			"user-library-modify",
			"user-library-read",
			"user-top-read",
		],
		state = body["nextURL"];
	const protocol = req.headers["x-forwarded-proto"] || "http";
	const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
	console.log("redirectUri: ", baseUrl + "/api/spotifyAuth/");
	spotifyApi.setRedirectURI(baseUrl + "/api/spotifyAuth/");
	console.log(spotifyApi.getRedirectURI());
	var authorizeURL: String = spotifyApi.createAuthorizeURL(scopes, state);
	console.log(authorizeURL);
	res.json({ url: authorizeURL });
}
export { spotifyApi };

const spotifyAuthUrl = async (baseUrl: string) => {
	try {
		const response = await fetch(baseUrl + "/api/spotifyAPI", {
			method: "POST",
			body: JSON.stringify({ nextURL: "/webplayer" }),
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
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
export { spotifyAuthUrl };
