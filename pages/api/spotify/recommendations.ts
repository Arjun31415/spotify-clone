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
	spotifyApi
		.getRecommendations({
			min_energy: 0.4,
			seed_genres: ["pop"],
			min_popularity: 50,
		})
		.then(
			function (data: { body: any }) {
				let recommendations = data.body;
				console.log("recommendations:\n");
				// console.log(recommendations);
				return res.json(recommendations);
				// return recommendations;
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
const getRecommendations = async (baseUrl: String) => {
	try {
		const response = await fetch(baseUrl + "/api/spotify/recommendations", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response);
		if (response.ok) {
			// If the response is ok than show the success
			console.log("recommendations received");
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
export { getRecommendations };
