var SpotifyWebApi = require("spotify-web-api-node");

import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = { url: String };
var spotifyApi = new SpotifyWebApi({
	clientId: "144e5d2ce1dd4cd2a01c21516acd5fd0",
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: "http://localhost:3000/api/spotifyAuth",
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
		],
		state = body["nextURL"];
	var authorizeURL: String = spotifyApi.createAuthorizeURL(scopes, state);
	// console.log(authorizeURL);
	res.json({ url: authorizeURL });
}
export { spotifyApi };
