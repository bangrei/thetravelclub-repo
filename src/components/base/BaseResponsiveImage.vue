<template>
	<img
		:alt="alt"
		:src="image.src"
		:srcset="image.srcset"
		:sizes="sizes"
		:loading="loading"
		decoding="async"
	/>
</template>
<script>
import { responsiveImage } from "@/utils/responsiveImage";

export default {
	name: "BaseResponsiveImage",
	props: {
		name: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			default: "",
		},
		sizes: {
			type: String,
			default: "100vw",
		},
		loading: {
			type: String,
			default: "lazy",
		},
	},
	computed: {
		image() {
			return responsiveImage(this.name);
		},
	},
};
</script>
