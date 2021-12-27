import type { NextFetchEvent, NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { getCookieParser } from "next/dist/server/api-utils";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	let response = NextResponse.next();
	console.log("Middleware\n\n\n\n\n");
	const spotifyAuthUrl = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/spotifyAPI", {
				method: "POST",
				body: JSON.stringify({ nextURL: "/webplayer" }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const authURL = await response.json();
			if (response.ok) {
				// If the response is ok than show the success
				console.log("Url received");
				console.log(authURL);
				return authURL;
			}
		} catch (error) {
			console.log("error occurred");
			console.log(error);
			console.log(
				error?.message ||
					"Something went wrong. Please contact admin for bug report "
			);
		} finally {
			// idk man
		}
	};
	console.log(req.cookies);
	if (
		"isAuthenticated" in req.cookies &&
		req.cookies["isAuthenticated"] === "1"
	) {
		console.log("Authentication is done blyat");
		// response.cookie("isAuthenticated", "0");
		return response;
	} else if (req.cookies["isAuthenticated"] === "2") {
		console.log("Doing authentication cyka");
	}
	if (
		req["url"] == "/webplayer" ||
		("isAuthenticated" in req.cookies && req.cookies["isAuthenticated"] === "0")
	) {
		const authURL = await spotifyAuthUrl();
		console.log(req.cookies);
		return NextResponse.redirect(authURL["url"]).cookie("isAuthenticated", "2");
	}
	return response;
}
