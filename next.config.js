// noinspection SpellCheckingInspection

module.exports = {
	webpack5: true,
	images: {
		domains: ["i.scdn.co"],
	},
	async headers() {
		return [
			{
				source: "/:path*{/}?",
				headers: [
					{
						key: "x-custom-header",
						value: "my custom header value",
					},
					{
						key: "x-another-custom-header",
						value: "my other custom header value",
					},
				],
			},
		];
	},
};
