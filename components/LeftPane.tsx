import React, { useState } from "react";

import Brand from "./figures/Brand";
import HomeFig from "./figures/HomeFig";
import LibraryFig from "./figures/LibraryFig";
import Link from "next/link";
import type { PlayLists } from "../pages/api/spotify/playlists";
import SearchFig from "./figures/SearchFig";
import styles from "./WebPlayerMain.module.css";

interface Props {
	home?: boolean;
	search?: boolean;
	library?: boolean;
	playlists: PlayLists;
}
function LeftPane({ home, search, library, playlists }: Props) {
	console.log(playlists);
	return (
		<div
			className={`bg-black flex flex-col pl-3 ${styles.textGray} ${styles.hFull}`}
		>
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
					className="mr-3 mb-3"
				></hr>
			</div>
			{playlists.items.map((playlist) => {
				return (
					<Link
						href={`/webplayer/playlist/${playlist.id}`}
						key={`${playlist.id}`}
					>
						<a>
							<div
								key={playlist.id}
								id={playlist.id}
								className={`mt-1 mb-2 hover:text-white cursor-default`}
							>
								{playlist.name}
							</div>
						</a>
					</Link>
				);
			})}
		</div>
	);
}

export default LeftPane;
