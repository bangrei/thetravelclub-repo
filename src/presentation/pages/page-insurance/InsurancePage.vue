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
            <div class="pr-banner-text short">Travel is unpredictable. Your response shouldn't be.</div>
            <div class="pr-banner-text">
              Safeguard your trip with The Travel Club’s trusted insurance providers.
            </div>
          </div>
        </div>
        <div class="pr-content">
          <a :href="registerLink" class="button" target="_blank">Register Here <i class="material-icons-outlined">launch</i></a>
          <div class="pr-title">Pioneer Insurance</div>
          <InsuranceItem :image="pioneerImage" :items="pioneerItems"/>
          <base-contact-us/>
        </div>
      </div>
    </template>
  </layout-variant-two>
</template>
<script>
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import InsuranceItem from "./components/InsuranceItem.vue";
export default {
  name: "PersonalizationPage",
  components: {
    LayoutVariantTwo,
    InsuranceItem,
  },
  data(){
    return {
      items: [
        {
          id: 1,
          name: "CRICUT PRINTING",
          icon: "print"
        },
        {
          id: 2,
          name: "HEAT PRESS PRINTING",
          icon: "iron"
        },
        {
          id: 3,
          name: "LEATHER MONOGRAMMING",
          icon: "monitor_heart"
        },
        {
          id: 4,
          name: "EMBROIDERY",
          icon: "palette"
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
      pioneerImage: require('@/assets/images/camp-activities-3.jpg'),
      pioneerItems: [
        `Travel insurance isn’t everyone’s priority, but it might as well be.`,
        `Baggage loss, flight delays, trip cancellations, and even travel accidents resulting in medical treatments can definitely ruin any traveler’s much awaited adventure. It can also be time consuming and stress-inducing to navigate unforeseen circumstances when they happen. "Unforeseen" does not have to mean "unprepared".`,
        `SafeTrip by Pioneer Insurance clarifies what’s covered, so you don’t have to wait for the chaos to make decisions for you`,
        `Stay insured and get your trip back on track.`
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