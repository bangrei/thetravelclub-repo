<template>
  <div class="header-con">
    <div :class="['header-wrapper', {'fit-content': !overrideNavs}]">
      <div class="header-logo-con left" @click="goTo('EventsPage')">
        <picture>
          <!-- <source type="image/avif" :srcset="require('@/assets/images/hydro-logo-black.png')"/> -->
          <source
            type="image/png"
            :srcset="require('@/assets/images/ttc-logo-white.png')"
          />
          <img
            width="250"
            height="100"
            alt="TTC logo"
            :src="require('@/assets/images/ttc-logo-white.png')"
          />
        </picture>
      </div>
    </div>
    <div class="override-navs" v-if="overrideNavs" v-html="overrideNavs"></div>
    <div class="header-wrapper desktop-menu" v-if="!overrideNavs">
      <ul class="list-of-menu">
        <li><router-link to="/services">Services</router-link></li>
        <li><router-link to="/experiences-and-events">Experiences & Events</router-link></li>
        <li><router-link to="/partnerships">Partnerships</router-link></li>
        <li><router-link to="/rewards">Rewards</router-link></li>
        <li><router-link to="/bulk-orders">Bulk Orders</router-link></li>
      </ul>
    </div>
    <WidgetAuth v-if="!overrideNavs" 
      :customer="customer" 
      :flexEnd="!overrideNavs" 
      :isGuestCustomer="isGuestCustomer()"/>
  </div>
</template>

<script>
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
import WidgetAuth from "../widgets/WidgetAuth.vue";
export default {
  mixins: [utility],
  components: {
    WidgetAuth,
  },
  props: {
    preventCheckout: {
      type: Boolean,
      default: false,
    },
    overrideNavs: {
      type: String,
      default: "",
    },
    activeNav: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showDropdown: false,
      customer: {},
    };
  },
  computed: {
    countCart() {
      let carts = this.$store.getters.getCarts.length || 0;
      if (carts > 0) return carts;
      let booking = this.$store.getters.getBooking;
      return !isEmpty(booking) ? 1 : 0;
    },
  },
  methods: {
    checkOut() {
      if (this.preventCheckout == true) {
        return;
      }
      this.goTo("CheckoutPage");
    },
    goSignup() {
      this.goToWithParams("LoginPage", {
        signup: true,
      });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (!this.showDropdown) return;
      this.customer = this.$store.getters.getCustomer;
    },
  },
  created() {
    let self = this;
    this.showDropdown = false;
    window.addEventListener("click", (e) => {
      if (e.target.closest(".dropdown-overlay")) {
        self.showDropdown = false;
        return;
      }
      if (e.target.closest(".dropdown-item")) {
        self.showDropdown = false;
        return;
      }
      if (e.target.closest(".close-dropdown")) {
        self.showDropdown = false;
        return;
      }
      if (e.target.closest(".dropdown")) {
        self.showDropdown = true;
        return;
      }
      if (!e.target.closest(".auth-content")) {
        self.showDropdown = false;
      }
    });
  },
};
</script>

<style lang="scss">
.list-of-menu {
  display: flex;
  gap: 32px;
  list-style-type: none;
  padding-inline: 0;
  margin-block: 0;
  text-decoration: none;
  li {
    cursor: pointer;
    font-weight: bold;
    color: $white;
    white-space: nowrap;
    &:hover {
      color: $yellow-main;
    }
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: inherit;
      }
    }
  }
}
.override-navs {
  color: $secondary-color-100;
}
.desktop-menu {
  display: none;
}
@media (min-width: 672px) {
  .desktop-menu {
    display: flex;
  }
}
@media (min-width: 672px) and (max-width: 1024px) {
  .desktop-menu {
    display: none !important;
  }
}
</style>
