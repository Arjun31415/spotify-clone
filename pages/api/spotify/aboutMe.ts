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
	spotifyApi.getMe().then(
		function (data: { body: ResponseData }) {
			console.log("getting me\n");
			// console.log("Some information about the authenticated user", data.body);
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
const aboutMe = async (baseUrl: String) => {
	try {
		const res = await fetch(baseUrl + "/api/spotify/aboutMe", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			console.log("received user info ");
			return await res.json();
		}
		if (res.status >= 400 && res.status <= 500) {
			console.log("error: " + res.status);
			return { error: "true" };
		}
	} catch (error) {
		console.log("error occurred");
		console.log(
			error?.message ||
				"Something went wrong. Please contact admin for bug report "
		);
		return { error: "true" };
	}
};
export { aboutMe };
