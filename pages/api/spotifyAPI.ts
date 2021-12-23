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
	console.log("body of request", body);
	var scopes = [
			"user-read-private",
			"user-read-email",
			"playlist-read-private",
			"playlist-modify-public",
		],
		state = body["nextURL"];
	var authorizeURL: String = spotifyApi.createAuthorizeURL(scopes, state);
	console.log(authorizeURL);
	res.json({ url: authorizeURL });
	// var code =
	// 	"AQDrrgNmiw6LI1I9-Pu1upVxwlgfcbZxtTGkQ4Dg8RhDCk1Ns_7M5Lma9cdPx5Xx-zESaXxeaV7-0kJZEnDUQvYWoDXNPWz11JmewW9fSTm8oWYjT7uqPde5rJ3BsMHxCBqVNBg0z-h2J3y53DC2YHcKCAeImBzmtHaoPmobP7b-r2dq6iDKz5kKA3uCCiwoAYN2ZLubjvaJe9DT1EtJ3fZNIJ5ysOsVETdwwmVsOtQS0B7W7maD-I_MuIV7Nh6FI5kgVoGwwMyu3XQ7bs-ygAzdDDKHGw";
	// console.log("code authing in first link");
	// spotifyApi.authorizationCodeGrant(code).then(
	// 	function (data: { body: { [x: string]: any } }) {
	// 		console.log("The token expires in " + data.body["expires_in"]);
	// 		console.log("The access token is " + data.body["access_token"]);
	// 		console.log("The refresh token is " + data.body["refresh_token"]);
	// 		// Set the access token on the API object to use it in later calls
	// 		spotifyApi.setAccessToken(data.body["access_token"]);
	// 		spotifyApi.setRefreshToken(data.body["refresh_token"]);
	// 		spotifyApi.getUserPlaylists().then(
	// 			function (data) {
	// 				console.log("Retrieved playlists", data.body);
	// 			},
	// 			function (err) {
	// 				console.log("Something went wrong!", err);
	// 			}
	// 		);
	// 	},
	// 	function (err) {
	// 		console.log("Something went wrong!", err);
	// 	}
	// );
}
export { spotifyApi };
