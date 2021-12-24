import React, { useState } from "react";

import Brand from "./figures/Brand";
import HomeFig from "./figures/HomeFig";
import SearchFig from "./figures/SearchFig";

function LeftPane({ home, search, library }) {
	return (
		<div className="bg-black flex flex-col text-white ">
			<Brand textColor="text-white" height="6vh" />
			<div className="flex flex-row ">
				<HomeFig hoverColor="white" color="gray" isActive={home} />
				<p className="ml-3">Home</p>
			</div>
			<div className="flex flex-row ">
				<SearchFig hoverColor="white" color="gray" isActive={search} />
				<p>Search</p>
			</div>
			<div className="flex flex-row ">
				<p>Your Library</p>
			</div>
		</div>
	);
}

export default LeftPane;
