var SpotifyWebApi = require("spotify-web-api-node");

import type { NextApiRequest, NextApiResponse } from "next";

import { spotifyApi } from "./spotifyAPI";

type ResponseData = {};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const { body, method } = req;
	console.log("body of request");
	console.log(body);
	console.log("request method");
	console.log(method);
	console.log(req.query);
	// res.status(200).json([{ title: "GeeksforGeeks" }]);

	var scopes = [
			"user-read-private",
			"user-read-email",
			"playlist-read-private",
			"playlist-modify-public",
		],
		state = req.query["state"];
	console.log("code authing");
	var code = req.query["code"];
	console.assert(state instanceof String);
	spotifyApi.authorizationCodeGrant(code).then(
		function (data: { body: { [x: string]: any } }) {
			console.log("The token expires in " + data.body["expires_in"]);
			console.log("The access token is " + data.body["access_token"]);
			console.log("The refresh token is " + data.body["refresh_token"]);
			// Set the access token on the API object to use it in later calls
			spotifyApi.setAccessToken(data.body["access_token"]);
			spotifyApi.setRefreshToken(data.body["refresh_token"]);
			return history.go(-1);
			// return res.redirect(301, state);
			// IF THE ABOVE DOES NOT WORK, USE THIS-
			// res.writeHead(303, {
			// 	// or 301
			// 	Location: "/hiiiii",
			// });
			// return res.end();
		},

		function (err: string) {
			console.log("Something went wrong!", err);
			res.status(500).json({ error: err });
		}
	);
}
