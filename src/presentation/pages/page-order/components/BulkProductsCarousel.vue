<template>
  <div class="product-carousel-container">
		<carousel ref="bulkProductsCarousel" 
      :transition="500" 
      :wrap-around="true" 
      :autoplay="autoPlayTimer"
			v-model="currentActiveIndex"
      :itemsToShow="isDesktop ? 3 : 2"
			snap-align="start"
			:gap="60">
			<!-- <slide v-for="(img, index) in contents" :key="index">
				<div class="slide-wrapper">
					<div class="carousel-img">
						<img alt="image" v-for="it in imagesArray(img)" :key="it" :src="it"/>
					</div>
				</div>
			</slide> -->
			<slide v-for="content in dummyContent" :key="content.index">
				<div class="slide-wrapper">
					<div class="carousel-img"></div>
				</div>
			</slide>
			<template #addons v-if="dummyContent.length > 1">
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
  name: "BulkProductsCarousel",
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
		},
		dummyContent(){
			return Array.from({length: 3}).map((_, index) => ({index}));
		}
	},
	watch: {
		autoPlayTimer(val) {
			if (!this.$refs.bulkProductsCarousel) return;
			this.$refs.bulkProductsCarousel.data.config.autoplay = val;
			this.$refs.bulkProductsCarousel.restartCarousel();
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
	width: 100%;
	max-height: auto;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-right: 10px;
	aspect-ratio: 5/3;
	&:last-child {
		padding-right: 0 !important;
	}
}
.carousel-img {
	width: 100%;
	aspect-ratio: 5/3;
	background: $secondary-color-20;
  img {
		width: 100%;
		aspect-ratio: inherit;
		object-fit: cover;
  	mix-blend-mode: multiply;
	}
}
@media (min-width: 672px) {
	.slide-wrapper {
		min-height: auto;
	}
}
</style>