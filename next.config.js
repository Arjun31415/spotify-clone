// noinspection SpellCheckingInspection

module.exports = {
	webpack5: true,
	images: {
		domains: ["i.scdn.co"],
	},
	webpack(config, options) {
		const { dir, defaultLoaders } = options;
		config.resolve.extensions.push(".ts", ".tsx");
		config.module.rules.push({
			test: /\\.+(ts|tsx)$/,
			include: [dir],
			exclude: /node_modules/,
			use: [
				defaultLoaders.babel,
				{ loader: "ts-loader", options: { transpileOnly: true } },
			],
		});
		return config;
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
