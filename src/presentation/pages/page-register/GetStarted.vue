<template>
  <start-page-layout id="get-started">
    <template v-slot:body>
      <div class="pg-container">
        <div class="body-wrapper">
          <div class="body-con">
            <base-icon
              class="sd-icon-btn-ghost sd-icon-btn-xl unset-cursor align-middle"
              iconName="thumb_up"
              iconSize="xxlg"
              iconStyle="outlined"
            ></base-icon>
            <p class="title-text heading-4 primary-color-80">
              <span>Congrats!</span>
            </p>
            <p class="title-text heading-4">
              <span>Welcome to {{ appName }}</span>
            </p>
            <p class="sub-title-text body-1-normal regular secondary-color-60">
              Let’s onboard together!
            </p>
          </div>
          <div class="welcome-button-con">
            <base-button
              btnLabel="Get Started!"
              :isRightIcon="true"
              class="sd-btn-primary sd-btn-md body-1-normal medium"
              @click="start"
            />
          </div>
        </div>
      </div>
    </template>
  </start-page-layout>
</template>

<script>
import StartPageLayout from "@/components/layout/StartPageLayout.vue";
import utility from "@/presentation/mixins/utility.js";

export default {
  name: "GetStarted",
  components: {
    StartPageLayout,
  },
  mixins: [utility],
  data() {
    return {
      getStarted: false,
      messages: [],
    };
  },
  computed: {
    appName(){
      return this.$store.getters.getAppName;
    }
  },
  methods: {
    start() {
      if (this.$route.query.externalLink) {
				// return window.location.href = this.$route.query.externalLink;
        let externalLink = this.$route.query.externalLink
        return this.openExternalLink(externalLink, () => {
          this.$router.push({
            name: "EventsPage",
          });
        });
			}
      if (this.$route.query.redirect) {
        return this.$router.replace(this.$route.query.redirect);
      }
      this.$router.push({
        name: "EventsPage",
      });
    },
  },
  created(){
    this.messages = [`Get started with ${this.appName}`];
  }
};
</script>

<style scoped lang="scss">
#get-started {
  height: 100%;

  &.fade-out {
    animation-duration: 1s;
    animation-name: fadeout;
    animation-fill-mode: forwards;
  }
}

.sd-main-con {
  .pg-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    background-image: url("@/assets/images/registration-bg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &.get-start {
      height: 100% !important;
      padding-top: 24px;
      .body-wrapper {
        max-width: 450px;
        margin: 0 auto;
      }
      .title-text,
      .header-text {
        text-align: left;
        padding: 0 24px;
      }
      .sub-title-text {
        text-align: left;
        &:last-child {
          padding-bottom: 24px;
        }
      }
    }

    * {
      width: 100%;
    }
    .body-wrapper {
      width: 90%;
      max-width: 600px;
      margin: 0 auto;
      background: $white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    }
    .welcome-button-con {
      position: relative;
      height: auto;
      display: flex;
      flex-direction: column;
      padding: 20px;
      justify-content: flex-end;
      gap: 20px;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      font-weight: bold;
    }
  }
}

.sd-icon-btn-xl {
  transform: scale(1.5);
}

@keyframes fadeout {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.title-text,
.header-text {
  margin: 22px auto 16px;
}
.header-text {
  font-size: 1.6em;
}

.sub-title-text {
  padding: 0 24px;
}
.sub-title-text + .sub-title-text,
:not(.sub-title-text) + .sub-title-text {
  margin-top: 24px;
}
@media (min-width: 672px) {
  .sd-main-con {
    .pg-container {
      &.get-start {
        height: 100% !important;
        margin-top: 0;
      }
    }
  }
}
</style>
