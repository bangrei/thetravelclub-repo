<template>
  <layout-variant-two>
    <template v-slot:header>
      <base-nav-secondary />
      <base-nav-content />
    </template>
    <template v-slot:body>
      <div class="pr-container white-smokey">
        <div class="pr-banner">
          <base-responsive-image
            class="pr-image"
            name="personalization-banner"
            alt="Personalization"
            sizes="100vw"
            loading="eager"
          />
          <div class="pr-banner-content">
            <div class="pr-banner-text">Make it yours. Make it you.</div>
            <div class="pr-banner-text">
              Item customization is now available in all The Travel Club+ branches nationwide.
            </div>
          </div>
        </div>
        <div class="pr-content">
          <div class="pr-title">Personalize your travel items at The Travel Club</div>
          <div class="pr-grid-container">
            <div class="pr-grid-item" v-for="item in items" :key="item.id">
              <img v-if="item.image" class="pr-grid-image" :alt="item.name" :src="require('@/assets/images/'+ item.image)"/>
              <span v-else class="pr-grid-icon material-icons-outlined">{{ item.icon }}</span>
              <span class="pr-grid-title">{{ item.name }}</span>
            </div>
          </div>
          <div class="pr-body">
            <StoresTable :table-content="tableContent" :table-header="tableHeader"/>
          </div>
          <div class="pr-title">Cricut Printing</div>
          <PersonalizeItem :banners="cricutBanners" :title="cricutTitle" :howItems="cricutItems"/>
          <div class="pr-title">Heat Press Printing</div>
          <PersonalizeItem reversed :banners="heatPressBanners" :title="heatPressTitle" :howItems="heatPressItems"/>
          <div class="pr-title">Leather Monogramming</div>
          <PersonalizeItem :banners="monogramBanners" :title="monogramTitle" :howItems="monogramItems"/>
          <div class="pr-title">Embroidery</div>
          <PersonalizeItem reversed :banners="embroideryBanners" :title="embroideryTitle" :howItems="embroideryItems"/>
          <base-contact-us/>
        </div>
      </div>
    </template>
  </layout-variant-two>
</template>
<script>
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import StoresTable from "../page-luggage/components/StoresTable.vue";
import PersonalizeItem from "./components/PersonalizeItem.vue";
import { responsiveImage } from "@/utils/responsiveImage";
export default {
  name: "PersonalizationPage",
  components: {
    LayoutVariantTwo,
    StoresTable,
    PersonalizeItem,
  },
  data(){
    return {
      items: [
        {
          id: 1,
          name: "CRICUT PRINTING",
          icon: "print",
          image: "cricut-printing-icon.png",
        },
        {
          id: 2,
          name: "HEAT PRESS PRINTING",
          icon: "iron",
          image: "heatpress-icon.png",
        },
        {
          id: 3,
          name: "LEATHER MONOGRAMMING",
          icon: "monitor_heart",
          image: "leather-monogramming-icon.png",
        },
        {
          id: 4,
          name: "EMBROIDERY",
          icon: "palette",
          image: "embroidery-icon.png"
        }
      ],
      tableHeader: [
        {key: "store", name: "Available Stores", wide: true, isLink: false, unwrap: false},
        {key: "address", name: "Address", wide: true, isLink: false, unwrap: false},
        {key: "contact", name: "Contact", wide: false, isLink: false, unwrap: true},
      ],
      tableContent: [
        {
          store: "The Travel Club+ Trinoma",
          address: "2099B and 2100B Level 2 NTDCC TriNoma Edsa Corner North, Quezon City",
          contact: "0976-571-4437",
        },
        {
          store: "The Travel Club+ Power Plant",
          address: "25R 2nd Level, Rockwell Center, Amapola St. cor Estrella St., Makati City",
          contact: "(02) 8901-1325",
        },
        {
          store: "The Travel Club+ Shangri-La",
          address: "Unit 245-248 Level 2, Main Wing Shangrila Plaza Mall, Edsa Corner Shaw Blvd. Wack Wack, Mandaluyong City 1552",
          contact: "0976-001-8854",
        },
      ],
      cricutTitle: "Create precision-cut decals from custom designs or text for a quick and easy way to personalize items like water bottles, mugs, tablets, and more. Materials and colors for adhesive vinyls are subject to availability.",
      cricutBanners: [
        { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
        require('@/assets/images/camp-activities-2.jpg'),
        require('@/assets/images/camp-activities-3.jpg'),
      ],
      cricutItems: [
        "Select: Provide your own design or choose a font for custom text",
        "Customize: Pick a size and material that fits your item",
        "Apply: Once cut, these decals can be applied to most smooth, flat surfaces"
      ],
      heatPressTitle: "Apply custom designs or text on fabric items like tote bags or backpacks. Specialized vinyls used in this process is considered durable and can withstand regular washing, but still subject to natural wear-and-tear. For heat-press compatibility and expert guidance, please consult at any The Travel Club+ branches.",
      heatPressBanners: [
        { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
        require('@/assets/images/camp-activities-2.jpg'),
        require('@/assets/images/camp-activities-3.jpg'),
      ],
      heatPressItems: [
        "Design: Choose your custom text or provide a digital graphic for the transfer",
        "Position: Precisely align the location of your design on your chosen fabric item",
        "Press: The Travel Club sales associate will use the heat press to apply  consistent heat and pressure to set the design",
        "Finish: After a brief cooling period, the backing is removed, and your personalized item is ready for use"
      ],
      monogramTitle: "Permanently etch symbols, names, or initials on small leather goods like luggage tags or keychains for a more elevated, subtle approach to personalization. For leather types and colors compatible with our engraving equipment, please consult at any The Travel Club+ branches. ",
      monogramBanners: [
        { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
        require('@/assets/images/camp-activities-2.jpg'),
        require('@/assets/images/camp-activities-3.jpg'),
      ],
      monogramItems: [
        "Select: Choose a font and submit your custom text for your item",
        "Configure: We calibrate the laser settings based on the thickness and tone of the leather",
        "Engrave: The machine will precisely remove a thin layer of the surface to etch the chosen engraving",
        "Clean: The item is wiped down to remove any residue, leaving a clean, professional finish"
      ],
      embroideryTitle: "Customize Spacetastic packing cubes and organizers through The Travel Club Concierge. For  orders and inquiries, please consult at any The Travel Club+ branches.",
      embroideryBanners: [
        { ...responsiveImage("camp-activities-1"), alt: "Camp activity" },
        require('@/assets/images/camp-activities-2.jpg'),
        require('@/assets/images/camp-activities-3.jpg'),
      ],
      embroideryItems: [
        'Select: Click "Customize Now" above and choose the product you want embroidered',
        '"Make It Yours": Submit your custom text and pick the font, size, color, and alignment of your choice',
        'Purchase: Complete transaction through the Spacetastic website',
        'Delivery: Wait for order confirmation and delivery as specified'
      ]
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
  aspect-ratio: 5/4;
  background: black;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    content: "";
    z-index: 1;
    pointer-events: none;
    background: rgba(0,0,0,0.4);
  }
  .pr-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .pr-banner-content {
    z-index: 2;
    width: 100%;
    height: 100%;
    max-width: 650px;
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
    }
  }
}
.pr-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
  .pr-grid-image {
    height: 100px;
    object-fit: contain;
  }
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
    max-width: 100px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.pr-body {
  width: 100%;
  padding: 24px;
}
@media (min-width: 672px) and (max-width: 1024px) {
  .pr-banner {
    aspect-ratio: 16/9;
  }
}
@media (min-width: 1025px) {
  .pr-banner {
    aspect-ratio: 5/1.5;
  }
}
@media (min-width: 672px) {
  .pr-banner {
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