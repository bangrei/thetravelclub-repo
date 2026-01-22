<template>
  <div class="header-con default">
    <div class="header-wrapper">
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
    <div class="header-wrapper" v-else>
      <div class="header-auth bordered" v-if="isGuestCustomer()">
        <div class="auth-con">
          <span @click="goSignup()" class="auth-btn active">Create account</span>
          <span @click="goTo('LoginPage')" class="auth-btn active">Login</span>
        </div>
      </div>
      <div class="auth-content" v-else>
        <div class="nav-elems">
          <!-- <div
            class="nav-elem"
            :class="{ active: activeNav == 'feeds' }"
            @click="goTo('FeedPage')"
          >
            <span class="material-icons-outlined">person</span>
            <span class="nav-label">Feeds</span>
          </div> -->
          <div
            class="nav-elem"
            :class="{ active: activeNav == 'checkout' }"
            @click="checkOut"
          >
            <span class="material-icons-outlined">shopping_cart</span>
            <span class="nav-label">Checkout</span>
            <span class="cart-count" v-if="countCart">{{ countCart }}</span>
          </div>
          <div class="nav-elem burger-menu" @click="toggleDropdown">
            <span class="material-icons-outlined">menu</span>
          </div>
        </div>
        <div class="dropdown" :class="{ active: showDropdown }">
          <div class="dropdown-overlay"></div>
          <div class="dropdown-wrapper">
            <div class="dropdown-header">
              <div class="user-avatar">{{ avatar(customer?.firstName) }}</div>
              <div class="user-info">
                <span class="user-name">{{ customer?.firstName }}</span>
                <span class="user-email">{{ customer?.email }}</span>
              </div>
              <div class="close-dropdown">&times;</div>
            </div>
            <div class="dropdown-body">
              <div class="dropdown-item" @click="goTo('Settings')">
                <div class="dropdown-li">
                  <span class="material-icons-outlined">settings</span>
                  <span>Account Settings</span>
                </div>
                <span class="dropdown-nav-icon material-icons"
                  >chevron_right</span
                >
              </div>
              <div class="dropdown-item" @click="goTo('MyOrderPage')">
                <div class="dropdown-li">
                  <span class="material-icons-outlined">shopping_bag</span>
                  <span>My Orders</span>
                </div>
                <span class="dropdown-nav-icon material-icons"
                  >chevron_right</span
                >
              </div>
              <div class="dropdown-item" @click="logout">
                <div class="dropdown-li">
                  <span class="material-icons-outlined">logout</span>
                  <span>Log out</span>
                </div>
                <span class="dropdown-nav-icon material-icons"
                  >chevron_right</span
                >
              </div>
            </div>
            <div class="dropdown-footer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
export default {
  mixins: [utility],
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
.override-navs {
  color: $secondary-color-100;
}
.auth-content {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  .nav-elems {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    .nav-elem {
      color: $white;
      cursor: pointer;
      height: 70px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      &:hover {
        color: $primary-color-90;
      }
      &.active {
        color: $primary-color-100;
        .nav-label {
          font-weight: bold;
        }
      }
      &.burger-menu {
        height: 100%;
        padding-block: 10px;
      }
      & span {
        font-size: 1.8em !important;
      }
      .nav-label {
        font-size: 0.7em !important;
      }
      .cart-count {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: orange;
        color: $white;
        font-size: 0.6em !important;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
    }
  }
  .dropdown {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    color: $secondary-color-90;
    z-index: 10;
    width: 100%;
    display: flex;
    pointer-events: none;
    .dropdown-overlay {
      max-height: 0%;
      height: 100%;
      width: 100%;
      flex: 1;
      overflow: hidden;
    }
    .dropdown-wrapper {
      transition: all 0.2s ease-in-out;
      overflow: hidden;
      width: 0%;
      max-width: 600px;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: $white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      .dropdown-header {
        width: 100%;
        display: flex;
        align-items: center;
        padding-inline: 24px;
        height: 100px;
        gap: 16px;
        border-bottom: 1px solid $primary-color-20;
        position: relative;
        overflow: hidden;
        .user-avatar {
          pointer-events: none;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: $gold-dark;
          color: $white;
          font-weight: bolder;
          font-size: 1.5em;
          padding-top: 4px;
        }
        .user-info {
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: $gold-dark;
          .user-name {
            font-weight: bolder;
          }
          .user-email {
            font-size: 0.8em;
          }
        }
        & + * {
          margin-top: 60px;
        }
        .close-dropdown {
          cursor: pointer;
          position: absolute;
          top: 32px;
          right: 24px;
          font-size: 2em;
          color: $secondary-color-60;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .dropdown-body {
        display: flex;
        flex-direction: column;
        flex: 3;
        height: calc(100% - 200px);
        overflow: hidden;
        overflow-y: auto;
        .dropdown-item {
          padding-inline: 24px;
          padding-block: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          gap: 8px;
          &:hover {
            background: $primary-color-10;
          }
          & + .dropdown-item {
            border-top: 1px solid $secondary-color-10;
          }
          .dropdown-li {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .dropdown-nav-icon {
            color: $primary-color-70;
          }
        }
      }
      .dropdown-footer {
        border-top: 1px solid $primary-color-20;
        padding-inline: 24px;
        color: $white;
        height: 100px;
        overflow: hidden;
      }
    }
    &.active {
      pointer-events: inherit !important;
      .dropdown-overlay {
        max-height: 100%;
        background: $primary-color-20;
        filter: blur(2px);
        -webkit-filter: blur(2px);
        -moz-filter: blur(2px);
        -o-filter: blur(2px);
      }
      .dropdown-wrapper {
        flex: 2;
      }
    }
  }
}
</style>
