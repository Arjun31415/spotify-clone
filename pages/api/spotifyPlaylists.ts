import type { NextApiRequest, NextApiResponse } from "next";

import Cookies from "cookies";
import { spotifyApi } from "./spotifyAPI";

type ResponseData = { message: string };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const cookies = new Cookies(req, res);
	console.log(cookies.get("isAuthenticated"));

	spotifyApi.getUserPlaylists().then(
		function (data: { body: ResponseData }) {
			console.log("Retrieved playlists", data.body);
			res.json(data.body);
		},
		function (err: any) {
			console.log("Something went wrong!");
			console.log(err);
			cookies.set("isAuthenticated", "0");
			try {
				return res.status(401).json({
					message: err["body"]["error"]["message"]
						? err["body"]["error"]["message"]
						: "error",
				});
			} catch (e) {
				return res.status(err.statusCode).json({ message: "Unknown Error" });
			}
		}
	);
}
