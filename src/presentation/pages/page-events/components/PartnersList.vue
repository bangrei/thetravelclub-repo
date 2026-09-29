<template>
  <div class="partners-container">
    <div class="partners-list">
      <carousel ref="partnersCarousel" 
        :transition="500" 
        :wrap-around="true" 
        :autoplay="autoPlayTimer"
        :itemsToShow="slidesPerView">
        <slide v-for="(img, index) in contents" :key="index">
          <div class="partner-brand">
            <img width="120" height="50" :alt="img" :src="require('@/assets/logo/' + img)"/>
          </div>
        </slide>
      </carousel>
    </div>
    <div class="partners-menu">
      <router-link :class="['menu-item', {'disabled': !item.enabled}]" v-for="item in menu" :key="item.link" :to="item.link">
        <div class="menu-image">
          <img v-if="item.image" width="120" height="50" :alt="img" :src="require('@/assets/images/' + item.image)"/>
        </div>
        <span class="menu-title">{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { ref, reactive } from "vue";
import isEmpty from "lodash/isEmpty";

export default {
  name: "PartnersList",
  components: {
		Carousel,
		Slide,
	},
  data(){
    return {
      brands: [
        "Ascott.png",
        "EtonHouse.png",
        "GCash.png",
        "HenryHotel.png",
        "Maya.png",
        "MayaBlack.png",
        "PioneerInsurance.png",
        "PNB.png",
        "Spacetastic.png",
        "Ascott.png",
        "EtonHouse.png",
        "GCash.png",
        "HenryHotel.png",
        "Maya.png",
        "MayaBlack.png",
        "PioneerInsurance.png",
        "PNB.png",
        "Spacetastic.png"
      ],
      menu: [
        {
          name: "Luggage Services",
          link: "/luggage-services",
          image: "luggage-repair.png",
          enabled: true,
        },
        {
          name: "Personalization",
          link: "/personalization",
          image: "personalization.png",
          enabled: true,
        },
        {
          name: "Experiences & Accomodation",
          link: "/experiences-and-accomodation",
          image: "experiences.png",
          enabled: true,
        },
        {
          name: "The Travel Club Events",
          link: "/the-travel-club-events",
          image: "club-events.jpg",
          enabled: true,
        },
        {
          name: "Insurance",
          link: "/insurance",
          image: "insurance.png",
          enabled: true,
        },
        {
          name: "Partnerships",
          link: "/partnerships",
          image: "partnership.jpg",
          enabled: true,
        },
        {
          name: "Rewards (Coming Soon)",
          link: "/rewards",
          image: "bulk-order.png",
          enabled: false,
        },
      ],
      slidesPerView: 10,
      autoPlayTimer: 3000,
      isDesktop: true,
      swiperRef: null,
			contents: null,
			currentContent: null,
			currentActiveIndex: 0,
    }
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
      if (!this.$refs.partnersCarousel) return;
      this.$refs.partnersCarousel.data.config.autoplay = val;
      this.$refs.partnersCarousel.restartCarousel();
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
      let wd = window.innerWidth;
      this.isDesktop = wd >= 672;
      let countSlides = this.isDesktop ? 10 : 3;
      if(wd >= 768) {
        if(wd < 1024) countSlides = 6;
        else {
          if(wd > 1024) countSlides = 10;
          else countSlides = 8;
        }
      }
			this.slidesPerView = countSlides;
    },
	},
  async created() {
		try {
			this.contents = ref(this.brands);
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
.partners-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.partners-list {
  width: 100%;
  display: flex;
  align-items: center;
  padding-block: 10px;
  background: $white;
  .partner-brand {
    height: 50px;
    overflow: hidden;
    width: 100%;
    padding-inline: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.partners-menu {
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 24px;
  overflow-x: auto;
  .menu-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 200px;
    text-decoration: none;
    .menu-image {
      border-radius: 24px;
      overflow: hidden;
      background: $secondary-color-20;
      aspect-ratio: 5/3;
      img {
        width: 100%;
        height: 100%;
        aspect-ratio: inherit;
        object-fit: cover;
      }
    }
    .menu-title {
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 16px;
      text-decoration: none;
      color: $secondary-color-90;
      cursor: pointer;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
      &:hover {
        opacity: 0.7;
      }
    }
    &:is(.disabled){
      pointer-events: none;
      img {
        filter: grayscale(1);
      }
    }
  }
}
@media (min-width: 672px) {
  .partners-menu {
    padding-inline: 7%;
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: hidden;
    .menu-item {
      width: 20% !important;
    }
  }
}
</style>