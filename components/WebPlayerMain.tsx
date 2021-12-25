import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import styles from "./WebPlayerMain.module.css";
function WebPlayerMain() {
	return (
		<div className={`${styles.bgGray} h-64 `}>
			<div>
				<ArrowBackIosNewIcon />
			</div>
			<div>
				<ArrowForwardIosIcon />
			</div>
		</div>
	);
}

export default WebPlayerMain;
