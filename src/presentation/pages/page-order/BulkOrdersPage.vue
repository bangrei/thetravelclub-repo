<template>
  <layout-variant-two>
    <template v-slot:header>
      <base-nav-secondary />
      <base-nav-content />
    </template>
    <template v-slot:body>
      <div class="bulk-container">
        <div class="bulk-banner">
          <img alt="Bulk Order" :src="require('@/assets/images/bulk-order.png')"/>
        </div>
        <div class="bulk-content">
          <div class="bulk-head">Bulk Order Process</div>
          <div class="bulk-grid-process">
            <div class="bulk-grid-item" v-for="order in process" :key="order.step">
              <span class="bulk-grid-tag">Step {{ order.step }}</span>
              <span class="bulk-grid-icon material-icons-outlined">{{ order.icon }}</span>
              <span class="bulk-grid-title">{{ order.title }}</span>
              <span class="bulk-grid-text">{{ order.text }}</span>
            </div>
          </div>
          <div class="bulk-head">Bulk Order Benefits</div>
          <div class="bulk-grid-process">
            <div class="bulk-benefit-item" v-for="item in benefits" :key="item.id">
              <span class="material-icons-outlined bulk-benefit-icon">{{ item.icon }}</span>
              <div class="bulk-benefit-content">
                <span class="bulk-benefit-title">{{ item.title }}</span>
                <span class="bulk-benefit-text">{{ item.text }}</span>
              </div>
            </div>
          </div>
          <div class="bulk-head">Product Gallery</div>
          <div class="products-container">
            <div class="category-container">
              <div class="category" v-for="(category, index) in categories" :key="index">{{ category }}</div>
            </div>
            <BulkProductsCarousel/>
          </div>
          <div class="bulk-head">Place order below</div>
          <!-- <BulkOrdersForm @form-submitted="formSubmitted"/> -->
          <iframe 
            aria-label='TTC Concierge Forms' 
            src="https://app.formcrafts.com/037682fd?iframe=true"></iframe>
        </div>
        <base-contact-us/>
      </div>
    </template>
  </layout-variant-two>
</template>
<script>
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import BulkProductsCarousel from "./components/BulkProductsCarousel.vue";
// import BulkOrdersForm from "./components/BulkOrdersForm.vue";
export default {
  name: "BulkOrdersPage",
  components: {
    LayoutVariantTwo,
    BulkProductsCarousel,
    // BulkOrdersForm,
  },
  data(){
    return {
      process: [
        {
          step: 1,
          icon: "important_devices",
          title: "SUBMIT ORDER FORM",
          text: "Fill in the required fields for your personal or business order below."
        },
        {
          step: 2,
          icon: "mark_email_unread",
          title: "FINALIZE ORDER THROUGH EMAIL",
          text: "Await acknowledgement of inquiry from The Travel Club via email and finalize details of your order with our agent."
        },
        {
          step: 3,
          icon: "inventory",
          title: "RECEIVE ORDER CONFIRMATION",
          text: "Formal quotation will be sent once availability of inventory and viability of order is confirmed."
        },
        {
          step: 4,
          icon: "add_card",
          title: "PAYMENT",
          text: "Pay remotely via bank transfer or in-store for credit card and other payment methods."
        },
        {
          step: 5,
          icon: "real_estate_agent",
          title: "PICK UP IN-STORE",
          text: "Pick-up notification will be sent via email once the order is packed and ready at your designated The Travel Club branch."
        },
      ],
      benefits: [
        {
          id: 1,
          icon: "sentiment_satisfied",
          title: "Personalization",
          text: "Elevate products with your personal branding and design of your choosing."
        },
        {
          id: 2,
          icon: "percent",
          title: "Exclusive Discount",
          text: "Enjoy 10% off regular priced items for a minimum order value of ₱100,000 and above."
        },
        {
          id: 3,
          icon: "attach_money",
          title: "Payment Methods",
          text: "Pay via cash or cashless options through bank deposits, checks, credit card, e-wallets, and more."
        }
      ],
      categories: [
        "Accessories",
        "Apparel",
        "Bags",
        "Footwear",
        "Luggage",
        "Water Bottles"
      ],
      products: [1,2,3]
    }
  },
  methods: {
    formSubmitted(res){
      console.log(res);
    }
  }
}
</script>
<style scoped lang="scss">
iframe {
  display: block;
  min-height: 2380.5px;
  height: auto;
  width: 100%;
  max-width: 650px;
  margin-top: 32px;
  margin-inline: auto;
  border: 0;
  box-shadow: 0 0 0 .5px rgba(30, 30, 30, .1), 0px 1px 2px rgb(30, 30, 30, .08);
  border-radius: 3px;
}
.bulk-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
}
.bulk-banner {
  width: 100%;
  aspect-ratio: 5/4;
  background: $secondary-color-90;
  position: relative;
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
  img {
    width: 100%;
    aspect-ratio: inherit;
    object-fit: cover;
  }
}
.bulk-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.bulk-head {
  font-size: 22px;
  line-height: 30px;
  font-weight: bold;
  padding-inline: 24px;
  margin-top: 24px;
}
.bulk-grid-process {
  width: 100%;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  gap: 24px;
  padding: 24px;
}
.bulk-grid-item {
  min-width: 220px;
  max-width: 220px;
  border-radius: 24px;
  border: 1px solid $yellow-main;
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .bulk-grid-tag {
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    width: fit-content;
    margin-inline: auto;
    padding: 1px 8px;
    background: $yellow-main;
    color: $secondary-color-80;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
  }
  .bulk-grid-icon {
    width: fit-content;
    margin-inline: auto;
    font-size: 3em;
    margin-block: 16px;
  }
  .bulk-grid-title {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
  .bulk-grid-text {
    font-size: 0.8em;
    text-align: left;
  }
}
.bulk-benefit-item {
  min-width: 300px;
  max-width: 300px;
  aspect-ratio: 5/2.5;
  border-radius: 24px;
  background: $yellow-main;
  position: relative;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  .bulk-benefit-icon {
    height: fit-content;
    font-size: 4.5em;
    margin-block: auto;
  }
  .bulk-benefit-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: auto;
    margin-block: auto;
  }
  .bulk-benefit-title {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    text-align: left;
    text-transform: uppercase;
  }
  .bulk-benefit-text {
    font-size: 0.8em;
    text-align: left;
  }
}
.products-container {
  width: 100%;
  .category-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding-block: 16px;
    padding-inline: 24px;
    max-width: 100%;
    overflow-x: auto;
    .category {
      padding: 6px 32px;
      border: 1px solid $yellow-main;
      color: $secondary-color-80;
      cursor: pointer;
      border-radius: 999px;
      white-space: nowrap;
      &:hover {
        border-color: $gold-dark;
      }
    }
  }
}
@media (min-width: 672px) {
  .bulk-banner {
    aspect-ratio: 5/1.5 !important;
  }
  .bulk-grid-process {
    padding-inline: 7%;
  }
  .bulk-head {
    padding-inline: 7%;
  }
  .bulk-grid-item {
    min-width: calc(20% - 24px);
    max-width: 100%;
    flex: 1;
  }
  .bulk-benefit-item {
    min-width: 30%;
    max-width: 100%;
    flex: 1;
  }
  .category-container {
    padding-inline: 7% !important;
  }
}
@media (min-width: 672px) and (max-width: 1024px) {
  .bulk-grid-item {
    min-width: 220px !important;
    max-width: 220px !important;
  }
  .bulk-benefit-item {
    min-width: 350px !important;
    max-width: 350px !important;
  }
}
</style>