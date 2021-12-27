var SpotifyWebApi = require("spotify-web-api-node");

import type { NextApiRequest, NextApiResponse } from "next";

import Cookies from "cookies";
import { spotifyApi } from "./spotifyAPI";

type ResponseData = {};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	var state: any = req.query["state"];
	var code = req.query["code"];
	console.assert(typeof state === "string");
	const cookies = new Cookies(req, res);

	// console.log(typeof state);
	spotifyApi.authorizationCodeGrant(code).then(
		function (data: { body: { [x: string]: any } }) {
			console.log("The token expires in " + data.body["expires_in"]);
			console.log("The access token is " + data.body["access_token"]);
			console.log("The refresh token is " + data.body["refresh_token"]);
			// Set the access token on the API object to use it in later calls
			spotifyApi.setAccessToken(data.body["access_token"]);
			spotifyApi.setRefreshToken(data.body["refresh_token"]);
			console.log(cookies.get("isAuthenticated"));
			cookies.set("isAuthenticated", "1");

			res.statusCode = 201;
			return res.redirect(308, state);

			// return res.end();
		},

		function (err: string) {
			console.log("Something went wrong!", err);
			return res.status(500).json({ error: err });
		}
	);
}
