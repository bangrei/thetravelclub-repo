<template>
  <layout-variant-two>
    <template v-slot:header>
      <base-nav-secondary />
      <base-nav-content />
    </template>
    <template v-slot:body>
      <div class="pr-container white-smokey">
        <div class="pr-banner">
          <div class="pr-banner-content">
            <div class="pr-banner-text">Join our network of global partners today.</div>
          </div>
        </div>
        <div class="pr-content">
          <button>Inquire Partnership <i class="material-icons-outlined">launch</i></button>
          <partnerships-item 
            v-for="(block, index) in blocks" 
            :key="index"
            :title="block.title" 
            :items="block.items" 
            :banners="block.banners"
            :reversed="block.reversed"/>
          <base-contact-us/>
        </div>
      </div>
    </template>
  </layout-variant-two>
</template>
<script>
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import PartnershipsItem from "./components/PartnershipsItem.vue";
import { responsiveImage } from "@/utils/responsiveImage";
export default {
  name: "PartnershipsPage",
  components: {
    LayoutVariantTwo,
    PartnershipsItem,
  },
  data(){
    return {
      blocks: [
        {
          title: "Merchant Partners",
          items: [
            "As the definitive, one-stop shop for travel essentials, The Travel Club has carefully curated a world-class portfolio of premium brands that bring together smart solutions, on-the-go convenience, and quality performance for the modern traveler.",
            "Discover our collection, and join The Travel Club’s complete travel ecosystem."
          ],
          banners: [
            { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
            require('@/assets/images/camp-activities-2.jpg'),
            require('@/assets/images/camp-activities-3.jpg'),
          ],
          reversed: false
        },
        {
          title: "Experience Providers",
          items: [
            "The Travel Club goes beyond traditional retail in partnership with expert providers across tour itineraries, accommodations, and experience packages to offer the full travel lifecycle. We align with each partner to ensure a seamless transition from pre-departure preparations to on-ground adventures. After all, travel is not just about the destination, but the quality of the journey.",
            "Be part of the full experience our customers pack for."
          ],
          banners: [
            { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
            require('@/assets/images/camp-activities-2.jpg'),
            require('@/assets/images/camp-activities-3.jpg'),
          ],
          reversed: true
        },
        {
          title: "F&B Vendors",
          items: [
            "Available in select doors, The Travel Club+ features a rotating line-up of cafes and vendors serving exclusive menu items intentionally located by our intimate lounge area to create the perfect third space for our community.",
            "Be the next pop-up and share with us your menu."
          ],
          banners: [
            { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
            require('@/assets/images/camp-activities-2.jpg'),
            require('@/assets/images/camp-activities-3.jpg'),
          ],
          reversed: false
        },
        {
          title: "...And Beyond",
          items: [
            "The Travel Club continues to grow its platform for all things travel and serves as a strategic gateway for like-minded partners who share our vision. There is an opportunity for every stage of the customer journey.",
            "Let’s explore a partnership and redefine travel together."
          ],
          banners: [
            { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
            require('@/assets/images/camp-activities-2.jpg'),
            require('@/assets/images/camp-activities-3.jpg'),
          ],
          reversed: true
        }
      ],
      registerLink: "https://products.pioneer.com.ph/PrimerGroup/Gfz96737O2kLWMdQxttX8M4dnFy9e7e4bHtVxEQwlV8l2OxQJhOBT6paz9REMk3rKw1KzbNHJvSewzunTpoLyw"
    }
  }
}
</script>
<style scoped lang="scss">
.pr-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
}
.pr-banner {
  width: 100%;
  aspect-ratio: 5/3;
  background: $secondary-color-90;
  .pr-image {
    width: 100%;
    aspect-ratio: inherit;
  }
  .pr-banner-content {
    width: 100%;
    height: 100%;
    max-width: 600px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    color: $white;
    .pr-banner-text {
      font-size: 20px;
      display: block;
      margin-bottom: 24px;
      line-height: 28px;
      &:is(.short){
        max-width: 300px;
        width: fit-content;
        overflow: hidden;
        margin-inline: auto;
      }
    }
  }
}
.pr-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  button,
  .button {
    text-decoration: none;
    cursor: pointer;
    outline: none;
    padding: 8px 24px;
    border-radius: 999px;
    background: $yellow-main;
    color: $secondary-color-80;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 8px;
    width: fit-content;
    margin-inline: auto;
    margin-block: 24px;
    &:hover {
      color: $yellow-main;
      background: $secondary-color-80;
    }
  }
}
.pr-title {
  font-size: 22px;
  line-height: 30px;
  font-weight: bold;
  padding-inline: 24px;
  margin-top: 24px;
}
.pr-grid-container {
  width: 100%;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  gap: 24px;
  padding: 24px;
}
.pr-grid-item {
  min-width: 150px;
  max-width: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  .pr-grid-icon {
    width: fit-content;
    margin-inline: auto;
    font-size: 5em;
  }
  .pr-grid-title {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
}
.pr-body {
  width: 100%;
  padding: 24px;
}
@media (min-width: 672px) {
  .pr-banner {
    aspect-ratio: 5/2;
    .pr-banner-content {
      padding-inline: 7% !important;
    }
  }
  .pr-title {
    padding-inline: 7%;
  }
  .pr-grid-container {
    padding: 32px 7%;
    justify-content: center;
    gap: 60px;
  }
  .pr-body {
    padding-inline: 7%;
  }
}
</style>