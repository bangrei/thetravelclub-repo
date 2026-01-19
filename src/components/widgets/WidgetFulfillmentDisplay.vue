<template>
  <div class="cart-options">
    <div class="cart-fulfillment-title">Fulfillment Options</div>
    <div class="cart-fulfillment-wrapper">
      <div class="cart-fulfillment-icon">
        <span class="material-icons-outlined">{{
          dineType == "DELIVERY" ? "local_shipping" : "hail"
        }}</span>
      </div>
      <div class="cart-fulfillment-content">
        <div class="inline-info">
          <span>{{ dineTypeDisplay }}</span>
          <span class="free-text" v-if="dineType == 'TAKE_AWAY'">Free</span>
        </div>
        <div
          class="cart-fulfillment-content-wrapper"
          v-for="store in stores"
          :key="store.id"
        >
          <span class="cart-fulfillment-store">{{ store.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utility from "@/presentation/mixins/utility.js";

export default {
  name: "WidgetFulfillmentDisplay",
  mixins: [utility],
  data() {
    return {};
  },
  computed: {
    dineType() {
      return this.$store.getters.getDineType;
    },
    dineTypeDisplay() {
      let type = this.$store.getters.getDineType;
      let isMultipleOutlets = this.cartOutlets().length > 1;
      let atStore = isMultipleOutlets ? "outlets" : "store";
      if (type == "TAKE_AWAY") return `Pick up at ${atStore}`;
      return "Delivery";
    },
    stores() {
      return this.cartOutlets().reduce(
        (outlet, obj) => ({ ...outlet, [obj.id]: obj }),
        {}
      );
    },
  },
  methods: {
    cartOutlets() {
      let outletList = this.$store.getters.getOutlets;
      let carts = this.$store.getters.getCarts;
      return carts.map((cart) => {
        return outletList.find((outlet) => {
          return (
            outlet.stores.filter((s) => {
              return s.id == cart.storeId;
            }).length > 0
          );
        });
      });
    },
  },
};
</script>
<style scoped lang="scss">
.cart-options {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 2px 8px $secondary-color-20;
  -webkit-box-shadow: 0 2px 8px $secondary-color-20;

  .cart-fulfillment-title {
    width: 100%;
    font-family: "Akzidenz Grotesk Super";
    font-size: 1.3em;
    border-bottom: 1px solid $secondary-color-10;
    padding-bottom: 16px;
  }
  .cart-fulfillment-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 16px;

    .cart-fulfillment-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .cart-fulfillment-content-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;

        + .cart-fulfillment-content-wrapper {
          padding-top: 8px;
          border-top: 1px solid $secondary-color-10;
        }
      }

      .cart-fulfillment-store {
        font-family: "Akzidenz Grotesk Super";
        font-size: 0.8em;
      }
      .inline-info {
        display: flex;
        gap: 8px;

        .free-text {
          color: $success-green;
          display: flex;
          gap: 8px;
          align-items: center;

          &::before {
            content: "";
            width: 8px;
            height: 2px;
            background: $success-green;
          }
        }
      }
    }
  }
}
</style>
