<template>
  <layout-variant-two>
    <template v-slot:header>
      <base-nav-secondary />
      <base-nav-content />
    </template>
    <template v-slot:body>
      <div class="luggage-page">
        <div class="luggage-banner-wrapper">
          <div class="luggage-banner-content">
            <span class="luggage-banner-text">Keep the journey going.</span>
            <span class="luggage-banner-text">Now servicing repairs for all luggage brands, from and beyond our catalog.</span>
          </div>
        </div>
        <div class="luggage-body">
          <base-accordion accordion-title="The Travel Club After Sales Process" initOpen largeTitle>
            <div class="sales-process">
              <div class="sales-item" v-for="(item, x) in salesContent" :key="x">
                <span class="sales-title">{{ x+1 }}. {{ item.title }}</span>
                <div class="sales-content">{{ item.content }}</div>
              </div>
            </div>
          </base-accordion>
          <br/>
          <base-accordion accordion-title="Store Drop-off" initOpen largeTitle>
            <StoresTable :table-header="tableHeader" :table-content="tableContent"/>
          </base-accordion>
          <LuggageForm/>
        </div>
      </div>
    </template>
  </layout-variant-two>
</template>
<script>
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import LuggageForm from "./components/LuggageForm.vue";
import StoresTable from "./components/StoresTable.vue";
export default {
  name: "LuggageServicesPage",
  components: {
    LayoutVariantTwo,
    LuggageForm,
    StoresTable,
  },
  data(){
    return {
      salesContent: [
        {
          title: "Request",
          content: "Fill out the form below to submit your request"
        },
        {
          title: "Assessment",
          content: "Wait for our customer care team to provide an assessment within a minimum of three (3) working days."
        },
        {
          title: "Store Turnover",
          content: "After the assessment, drop off your item in any of our drop-off stores and ﬁll out a Repair Order Form. Walk-ins will not be accommodated."
        },
        {
          title: "Service Process",
          content: "llow our customer care team to service your item between 15-20 days for NCR depending on the service concern, availability of spare parts, the extent of service coverage, and other lineup of repair from other customers."
        },
        {
          title: "Customer Turnover",
          content: "Once service is complete, pick up your item in your chosen drop-off store."
        },
      ],
      tableHeader: [
        {key: "store", name: "Drop-off Stores", wide: true, isLink: false, unwrap: false},
        {key: "address", name: "Address", wide: true, isLink: false, unwrap: false},
        {key: "contact", name: "Contact", wide: false, isLink: false, unwrap: true},
        {key: "socialMedia", name: "Social Media", wide: false, isLink: false, unwrap: false},
      ],
      tableContent: [
        {
          store: "The Travel Club+ Trinoma",
          address: "2099B and 2100B Level 2 NTDCC TriNoma Edsa Corner North, Quezon City",
          contact: "0976-571-4437",
          socialMedia: "https://facebook.com/TheTravelBuddyTrinoma",
        },
        {
          store: "The Travel Club+ Power Plant",
          address: "25R 2nd Level, Rockwell Center, Amapola St. cor Estrella St., Makati City",
          contact: "(02) 8901-1325",
          socialMedia: "http://facebook.com/TheTravelBuddyRockwell",
        },
        {
          store: "The Travel Club Estancia",
          address: "Lower Floor Unit B1-035, Estancia Capitol Commons Meralco Ave. Cor. Shaw Blvd, Oranbo, Meralco Ave. Pasig City, Metro Manila",
          contact: "(02) 8242-1056",
          socialMedia: "http://facebook.com/TheTravelBuddyEstancia",
        },
        {
          store: "The Travel Club Festival Mall",
          address: "2009A 2nd level, Festival Supermall, Filinvest Corporate City, Alabang, Muntinlupa City",
          contact: "(02) 8478-6084",
          socialMedia: "http://facebook.com/TheTravelBuddyFestivalMall",
        },
        {
          store: "The Travel Club Eastwood",
          address: "Level 3 Eastwood Mall, Eastwood Avenue, Eastwood City Cyberpark, E. Rodriguez Jr. Ave., (C-5) Bagumbayan, Quezon City 1110",
          contact: "(02) 8234-9677",
          socialMedia: "",
        },
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.luggage-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: $yellow-darker;
}
.luggage-banner-wrapper {
  width: 100%;
  aspect-ratio: 5/3;
  background: black;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    content: "";
    z-index: 2;
    pointer-events: none;
    background: rgba(0,0,0,0.1);
  }
  .luggage-banner-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    .luggage-banner-text {
      text-align: center;
      color: $white;
      font-size: 22px;
      max-width: 500px;
      margin-inline: auto;
      line-height: 1.4;
    }
  }
}
.luggage-body {
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.sales-process {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .sales-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    .sales-title {
      font-weight: bold;
      text-transform: uppercase;
    }
  }
}
@media (min-width: 672px) {
  .luggage-banner-wrapper {
    aspect-ratio: 5/2 !important;
  }
  .luggage-body {
    padding-inline: 7%;
  }
  .luggage-banner-content {
    padding-inline: 7%;
  }
}
</style>