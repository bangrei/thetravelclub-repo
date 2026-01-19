<template>
  <layout-variant-two :show-loading-screen="loading" :hideFootNote="true">
    <template v-slot:header>
      <div class="slide-down">
        <div class="header-con float" @click="goBack()">
          <div class="material-icons">arrow_back</div>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <landing-layout :is-loading="!inited">
        <template v-slot:content>
          <template v-if="proceedOTP">
            <div class="otp-con">
              <one-time-password :email="email"></one-time-password>
            </div>
          </template>
          <template v-else>
            <login-email
              @proceed-otp="handleProceedOTP"
              @proceed-register="handleProceedRegister"
              @toggle-loading="toggleLoading"
            ></login-email>
            <div class="body-footnote">
              <!--<span>&copy; {{ thisYear }} Columbia Hike Society 2</span>
							<div class="footnote-tnc">
								<span class="tnc-item" @click="goTo('TermsOfUse')">Terms of Use</span>
								<span class="tnc-item" @click="goTo('PrivacyPolicy')">Privacy Policy</span>
							</div>-->
              <div class="inner">
                <img src="@/assets/images/ttc-logo-black.png" />
                <div class="copyright">
                  © Copyright {{ thisYear }}, Hydroflask. All rights reserved.
                </div>
                <div class="links">
                  <router-link to="/terms-of-use">Terms of Use</router-link>
                  <router-link to="/privacy-policy">Privacy Policy</router-link>
                </div>
              </div>
            </div>
          </template>
        </template>
      </landing-layout>
    </template>
  </layout-variant-two>
</template>
<script>
import LandingLayout from "@/components/layout/LandingLayout.vue";
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import OneTimePassword from "@/presentation/components/OneTimePassword.vue";
import utility from "@/presentation/mixins/utility.js";
import LoginEmail from "./components/LoginEmail.vue";
export default {
  name: "LoginPage",
  mixins: [utility],
  components: {
    OneTimePassword,
    LoginEmail,
    LayoutVariantTwo,
    LandingLayout,
  },
  props: {
    passedEmail: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      email: "",
      proceedOTP: false,
      isError: false,
      showBack: false,
      loading: false,
      thisYear: null,
      inited: false,
    };
  },
  methods: {
    toggleLoading(val) {
      this.loading = val == true;
    },
    async handleProceedOTP(email) {
      this.proceedOTP = true;
      this.email = email;
    },
    async handleProceedRegister(email) {
      let params = { passedEmail: email };
      if (this.$route.query.redirect)
        params.redirect = this.$route.query.redirect;
      this.goToWithParams("RegisterPage", params);
    },
  },
  async created() {
    this.showBack = this.$route.query.redirect != null;
    const date = new Date();
    this.thisYear = date.getFullYear();
    this.inited = false;
    await this.refreshMainData(true);
    this.inited = true;
  },
  mounted() {
    if (this.passedEmail) {
      this.handleProceedOTP(this.passedEmail);
    }
  },
};
</script>

<style lang="scss" scoped>
.otp-con {
  padding: 0 24px;
}

.header-con {
  justify-content: flex-start;
  gap: 16px;
  color: $secondary-color-80;

  &.float {
    background: rgba($color: $white, $alpha: 0.7);
    padding: 8px !important;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    left: 16px;
    right: 0;
    z-index: 2;
    width: fit-content;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }

  * {
    cursor: pointer;
  }
}

.body-footnote {
  .copyright {
    font-size: 14px;
    line-height: 20px;
    color: $secondary-color-90;
  }

  .inner {
    margin: 0 auto;

    .links {
      margin-top: 10px;

      a {
        color: $secondary-color-90;
        font-size: 13px;
        margin: 0 7px;
      }
    }

    img {
      margin: 0 auto;
      width: 115px;
      display: block;
      margin-bottom: 10px;
    }
  }

  background: $primary-color-100;
  margin-top: auto;
  padding: 16px;
  color: $white;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 0.85em;

  &.invisible {
    display: none !important;
  }

  .footnote-tnc {
    display: flex;
    gap: 48px;
    align-items: center;

    .tnc-item {
      font-weight: bold;
      cursor: pointer;
      color: $white;
      text-decoration: none;
    }
  }
}
</style>
