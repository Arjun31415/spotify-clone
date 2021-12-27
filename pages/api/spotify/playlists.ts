import type { NextApiRequest, NextApiResponse } from "next";

import Cookies from "cookies";
import { spotifyApi } from "../spotifyAPI";

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

const getPlaylists = async (baseUrl: String) => {
	try {
		const response = await fetch(baseUrl + "/api/spotify/playlists", {
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
export { getPlaylists };
type PlayList = {
	collaborative: boolean,
	description: string,
	external_urls: { spotify: string },
	href: string,
	id: string,
	images: Array<{ height: number, url: string, width: number }>,
	// name of the playlist
	name: string,
	owner: object,
	primary_color: any,
	public: Boolean,
	snapshot_id: string,
	tacks: any,
	type: string,
	uri: string,
};
export type { PlayList };
export type PlayLists = {
	href: string,
	items: Array<PlayList>,
	limit: number,
	next: any,
	offset: number,
	previous: any,
	total: number,
};
