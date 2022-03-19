import { GetServerSideProps } from "next";
import React from "react";
import { spotifyApi } from "../../api/spotifyAPI";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	spotifyApi.getPlaylist("5ieJqeLJjjI8iJWaxeBLuK").then(
		function (data) {
			console.log("Some information about this playlist", data.body);
		},
		function (err) {
			console.log("Something went wrong!", err);
		}
	);
	return { props: {} };
};
function PlaylistPage() {
	const router = useRouter();
	const { pid } = router.query;

	return <p>Playlist: {pid}</p>;

	return <div></div>;
}

export default PlaylistPage;
