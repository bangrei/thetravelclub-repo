<template>
  <div class="brands-carousel-container">
		<carousel ref="activitiesCarousel" 
      :transition="500" 
      :wrap-around="true" 
      :autoplay="autoPlayTimer"
      :itemsToShow="isDesktop ? 3 : 2"
    >
			<slide v-for="(img, index) in contents" :key="index">
				<div class="slide-wrapper">
					<img class="carousel-img" alt="image" :src="img"/>
				</div>
			</slide>
			<template #addons v-if="contentLength > 1">
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
  name: "ActivitiesCarousel",
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
			swiperRef: null,
			contents: null,
			currentContent: null,
			currentActiveIndex: 0,
			isDesktop: true,
			slidesPerView: 3,
			autoPlayTimer: 3000,
		};
	},
	computed: {
		contentLength(){
			let num = this.contents.length;
			let perView = this.slidesPerView;
			let len = Math.ceil(num/perView);
			if(num % perView > 0) len += 1;
			return len;
		}
	},
	watch: {
		autoPlayTimer(val) {
			if (!this.$refs.activitiesCarousel) return;
			this.$refs.activitiesCarousel.data.config.autoplay = val;
			this.$refs.activitiesCarousel.restartCarousel();
		}
	},
  methods: {
		setSwiperRef(swiper) {
			this.swiperRef = swiper;
		},
		onSlideChange() {
			this.currentContent.value = this.contents[this.swiperRef.activeIndex];
		},
		slideTo(index) {
			this.swiperRef.slideTo(index);
			this.currentActiveIndex = index;
		},
		slidePrev() {
			this.swiperRef.slidePrev();
			this.currentActiveIndex--;
		},
		resizeBannerHandler(){
      this.isDesktop = window.innerWidth >= 672;
			this.slidesPerView = this.isDesktop ? 7 : 4;
    },
	},
  async created() {
		try {
			this.contents = ref(this.images);
			this.currentContent = reactive({});
			if(!isEmpty(this.contents)) this.currentContent.value = this.contents[0];
			if (this.contentLength <= 1) this.autoPlayTimer = 0;
			if (this.manualSlide == true) this.autoPlayTimer = 0;
			window.addEventListener("resize",  this.resizeBannerHandler);
      setTimeout(() => {
        this.resizeBannerHandler();
      }, 500);
		} catch (error) {
			console.log(error);
		}
	},
	beforeUnmount(){
		window.removeEventListener("resize",  this.resizeBannerHandler);
	}
}
</script>
<style scoped lang="scss">
.brands-carousel-container {
  padding-block: 24px;
}
.slide-wrapper {
	min-height: 250px;
	max-height: 250px;
	margin-right: 16px;
}
.carousel-img {
	height: 100%;
	aspect-ratio: 4/3;
  object-fit: cover;
  mix-blend-mode: multiply;
}
</style>