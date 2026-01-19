<template>
  <div class="layout-flex">
    <div class="flex-item-image">
      <img v-if="!isLoading" :src="loginBanner" alt="Landing" />
    </div>
    <div class="flex-item-content">
      <img
        class="logo"
        width="160"
        height="80"
        alt="rxc logo"
        :src="require('@/assets/images/hydro-logo-black.png')"
      />
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutLanding",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    loginBanner() {
      return this.$store.getters.getLoginBanner;
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.layout-flex {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .flex-item-image {
    flex: 2;
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .flex-item-content {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    img {
      width: 100%;
      max-width: 200px;
      object-fit: contain;
    }
  }
}
@media (max-width: 800px) {
  .layout-flex {
    flex-direction: column;
    .flex-item-image {
      max-height: 50%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .flex-item-content {
      width: 100%;
      position: relative;
      max-width: 100% !important;

      .logo {
        z-index: 2;
        position: absolute;
        top: -40px;
      }

      &::before {
        content: "";
        position: absolute;
        top: -24px;
        left: 0;
        right: 0;
        height: 25px;
        z-index: 1;
        background: linear-gradient(180deg, transparent, $white);
      }
    }
  }
}
</style>
