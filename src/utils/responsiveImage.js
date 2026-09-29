import manifest from "@/assets/images/responsive-manifest.json";

const webpContext = require.context(
	"../assets/images",
	false,
	/-w\d+\.webp$/
);

export function responsiveImage(name) {
	const widths = manifest[name];
	if (!widths || !widths.length) {
		throw new Error(`Missing responsive image: ${name}`);
	}

	const sources = widths.map((width) => ({
		width,
		url: webpContext(`./${name}-w${width}.webp`),
	}));

	return {
		src: sources[sources.length - 1].url,
		srcset: sources.map((source) => `${source.url} ${source.width}w`).join(", "),
	};
}
