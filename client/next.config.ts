import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.licdn.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i0.wp.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
