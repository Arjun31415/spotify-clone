import type { NextApiRequest, NextApiResponse } from "next";

import { spotifyApi } from "./spotifyAPI";

type ResponseData = { message: string };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	spotifyApi.getUserPlaylists().then(
		function (data: { body: ResponseData }) {
			console.log("Retrieved playlists", data.body);
			res.json(data.body);
		},
		function (err: any) {
			console.log("Something went wrong!", err);
		}
	);
}
