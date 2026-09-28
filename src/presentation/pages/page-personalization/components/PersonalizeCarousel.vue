<template>
  <div class="brands-carousel-container">
		<carousel ref="personalizeCarousel" 
      :transition="500" 
      :wrap-around="true" 
      :autoplay="autoPlayTimer"
      :itemsToShow="1"
    >
			<slide v-for="(img, index) in contents" :key="index">
				<div class="slide-wrapper">
					<img class="carousel-img" alt="image" v-for="it in imagesArray(img)" :key="it" :src="it"/>
				</div>
			</slide>
			<template #addons v-if="contents.length > 1">
				<navigation>
					<template #next><span class="carousel__icon material-icons-outlined md-32">chevron_right</span></template>
					<template #prev><span class="carousel__icon material-icons-outlined md-32">chevron_left</span></template>
				</navigation>
			</template>
		</carousel>
	</div>
</template>
<script>
import utility from "@/presentation/mixins/utility.js";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref, reactive } from "vue";
import isEmpty from "lodash/isEmpty";

export default {
  name: "PersonalizeCarousel",
  mixins: [utility],
	components: {
		Carousel,
		Slide,
		Navigation
	},
  props: {
		images: {
			type: Array,
			default: () => []
		},
	},
  data() {
		return {
			contents: null,
			currentContent: null,
			currentActiveIndex: 0,
			slidesPerView: 3,
			autoPlayTimer: 3000,
		};
	},
	watch: {
		autoPlayTimer(val) {
			if (!this.$refs.personalizeCarousel) return;
			this.$refs.personalizeCarousel.data.config.autoplay = val;
			this.$refs.personalizeCarousel.restartCarousel();
		}
	},
  methods: {
		imagesArray(item){
			if(!item) return [];
			if(Array.isArray(item)){
				return item
			}
			return [item];
		},
	},
  async created() {
		try {
			this.contents = ref(this.images);
			this.currentContent = reactive({});
			if(!isEmpty(this.contents)) this.currentContent.value = this.contents[0];
			if (this.contents.length <= 1) this.autoPlayTimer = 0;
		} catch (error) {
			console.log(error);
		} finally {
			window.addEventListener("resize",  this.resizeBannerHandler);
      this.$nextTick(() => {
        this.resizeBannerHandler();
      });
		}
	},
	beforeUnmount(){
		window.removeEventListener("resize",  this.resizeBannerHandler);
	}
}
</script>
<style scoped lang="scss">
.slide-wrapper {
	max-height: auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.carousel-img {
	height: 100%;
	aspect-ratio: 4/3;
  object-fit: cover;
  mix-blend-mode: multiply;
}
@media (min-width: 672px) {
	.slide-wrapper {
		min-height: auto;
	}
}
</style>