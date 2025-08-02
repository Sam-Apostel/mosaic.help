import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Mosaic Helper",
		short_name: "Mosaic.Help",
		description: "track progress on your mosaic or knitting projects",
		start_url: "/",
		display: "standalone",
		background_color: "#d2cff1",
		theme_color: "#d2cff1",
		icons: [
			{
				src: "/web-app-manifest-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/web-app-manifest-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
