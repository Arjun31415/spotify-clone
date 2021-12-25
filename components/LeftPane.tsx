import React, { useState } from "react";

import Brand from "./figures/Brand";
import HomeFig from "./figures/HomeFig";
import LibraryFig from "./figures/LibraryFig";
import Link from "next/link";
import SearchFig from "./figures/SearchFig";

function LeftPane({ home, search, library }) {
	return (
		<div className="bg-black flex flex-col text-white pl-3">
			<div className="mb-6 mt-6">
				<Brand textColor="text-white" height="4vh" />
			</div>
			<div className="flex flex-row mb-6 ">
				<Link href="/webplayer">
					<a className="flex flex-row">
						<HomeFig hoverColor="white" color="gray" isActive={home} />
						<p className="ml-3">Home</p>
					</a>
				</Link>
			</div>
			<div className="flex flex-row mb-6">
				<Link href="/webplayer/search">
					<a className="flex flex-row">
						<SearchFig hoverColor="white" color="gray" isActive={search} />
						<p className="ml-3">Search</p>
					</a>
				</Link>
			</div>
			<div className="flex flex-row mb-6">
				<Link href="/webplayer/library">
					<a className="flex flex-row">
						<LibraryFig hoverColor="white" color="gray" isActive={library} />
						<p className="ml-3">Your Library</p>
					</a>
				</Link>
			</div>
			<div>
				<hr
					style={{
						backgroundColor: "#282828",
						border: "1px solid #282828",
					}}
					className="mr-3"
				></hr>
			</div>
			<div className="mt-2">duisfhgifduighidfhg</div>
		</div>
	);
}

export default LeftPane;
