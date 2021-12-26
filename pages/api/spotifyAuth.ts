var SpotifyWebApi = require("spotify-web-api-node");

import type { NextApiRequest, NextApiResponse } from "next";

import { spotifyApi } from "./spotifyAPI";

type ResponseData = {};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	var state = req.query["state"];
	var code = req.query["code"];
	console.assert(typeof state === "string");
	// console.log(typeof state);
	spotifyApi.authorizationCodeGrant(code).then(
		function (data: { body: { [x: string]: any } }) {
			console.log("The token expires in " + data.body["expires_in"]);
			console.log("The access token is " + data.body["access_token"]);
			console.log("The refresh token is " + data.body["refresh_token"]);
			// Set the access token on the API object to use it in later calls
			spotifyApi.setAccessToken(data.body["access_token"]);
			spotifyApi.setRefreshToken(data.body["refresh_token"]);
			console.log("getting me\n");

			res.statusCode = 201;
			return res.redirect(308, state);

			// return res.end();
		},

		function (err: string) {
			console.log("Something went wrong!", err);
			res.status(500).json({ error: err });
		}
	);
}
