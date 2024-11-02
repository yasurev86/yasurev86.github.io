/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/strapi/:path*",
				destination: process.env.STRAPI_URL + "/:path*",
			},
		];
	},
	reactStrictMode: false,
	sassOptions: {
		includePaths: ['./src'],
		prependData: `@import "@/shared/styles/variables.scss"; @import "@/shared/styles/mixins.scss";`,
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg'),
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: {
					not: [...fileLoaderRule.resourceQuery.not, /url/, /icon/],
				},
				use: ['@svgr/webpack'],
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: /icon/,
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							svgoConfig: {
								plugins: [
									{
										name: 'convertColors',
										params: {
											currentColor: true,
										},
									},
								],
							},
						},
					},
				],
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default nextConfig;
