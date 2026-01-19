<template>
  <layout-variant-two :show-loading-screen="loading">
    <template v-slot:header>
      <div class="slide-down">
        <base-nav-content />
        <base-nav-secondary />
      </div>
    </template>
    <template v-slot:body>
      <div class="events-content">
        <div class="container-2" :class="{ 'show-background': !loading }"></div>
        <div class="text-content">
          <br />
          <h1>The Travel Club goes to Japan with EtonHouse International School</h1>

          <p>The Travel Club is expanding beyond your one-stop shop for travel essentials to all things travel and experience!</p>
          <p>This 2026, The Travel Club is partnering with EtonHouse International School to invite kids to an educational, 
            fun, and memorable 5-day summer camp getaway in Japan. Beyond just your reliable travel store, 
            let us also give you experiences to make your travel even more meaningful with The Travel Club.</p>
          <br />
          <div class="inline-content">
            <div class="inline-content-item">
              <h2>About EtonHouse</h2>
              <p>
                EtonHouse is an international school from Singapore founded on the British learning system in 1995 in pursuit of high-quality, 
                research-based, and inquiry-driven education. 
                Today, they are present in over 100 schools across 12 countries, continuing to expand to meet the growing demand 
                for quality education.
                As part of the global education group, true to its name, EtonHouse International School Japan has opened its campus 
                internationally for children across the globe to fly in and join their English-language Summer Camp designed to be 
                enjoyable for all children regardless English language proficiency.
              </p>
            </div>
            <div class="inline-content-image">
              <img :src="require('@/assets/images/homepage-banner-2.jpg')" alt="EtonHouse"/>
            </div>
          </div>
        </div>
        <div class="main-content" :class="{ empty: isEmpty(filteredEvents) }">
          <div class="feeds-content">
            <div class="" 
              v-for="category in categories"
              :key="category.id">

              <div class="event-accordion"
                v-for="group in eventsGroupedBycategories(category.id)"
                :key="group.key"
              >
                <div class="accordion-header">
                  <span class="accordion-header-title">{{ category.name }}</span>
                  <span
                    @click="toggleMonth(group.key)"
                    class="accordion-toggle material-icons"
                    >{{ group.key == selectedMonth ? "remove" : "add" }}</span
                  >
                </div>
                <div
                  class="accordion-content"
                  :class="{ opened: group.key == selectedMonth }"
                >
                  <event-block
                    v-for="sess in group.sessions"
                    :key="sess.sessionTimeId"
                    :event="sess"
                    :selectedCategory="selectedCategory"
                    :enableBooking="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="feeds-divider" v-if="isEmpty(feedNavs)"></div>
          <home-empty-nudge
            v-if="allNudgesRead && !loading && showFeeds && isEmpty(feedNavs)"
            heading="Congrats"
            subHeading="You have read all the messages."
            message="Come back for more or click the above categories to read again."
          >
          </home-empty-nudge>

          <div
            class="nudge-card-con"
            v-if="showFeeds"
            :class="{ 'blurred-data': loadingData }"
          >
            <div class="loading-data-con" v-if="loadingData">
              <div class="loading-data">
                <div class="dot-loading"></div>
                <p class="body-2-regular bold loading-text primary-color-70">
                  Loading ...
                </p>
              </div>
            </div>
            <div
              class="nudge-column"
              v-for="(col, n) in nudgeColumns(validNudges)"
              :key="n"
            >
              <home-nudge-card
                v-for="nudge in col"
                :key="nudge.id"
                :nudge="nudge"
                @nudge-clicked="nudgeClicked"
              ></home-nudge-card>
            </div>
            <div class="nudge-column" v-for="n in fillerNudges" :key="n"></div>
          </div>
        </div>
        <div class="inline-content stretch">
          <div class="inline-content-item">
            <h2>Camp Activities</h2><br/>
            <p>
              EtonHouse has curated a program of indoor and outdoor activities that guarantees and prioritizes 
              the developmental needs, learning, and enjoyment of each child for every age group. 
            </p><br/>
            <p>
              Activities are subject to change depending on available resources, weather condition, group dynamics and child safety.
            </p>
          </div>
          <div class="inline-content-image">
            <activities-carousel :images="banners"/>
          </div>
        </div>
        <div class="block-content">
          <h2>Stay connected. Sign up for news, events, and offers direct to your inbox.</h2>
          <span>Unsubscribe at any time. An unsubscribe link will be included in every email.</span>
          <input type="email" class="newsletter-input" placeholder="Enter your email address"/>
          <span>By entering and submitting your email, you agree to subscribe to the The Travel Club Concierge newsletter and acknowledge that you have read and understood the The Travel Club privacy notice and consent  to the processing of your personal data for marketing purposes. </span>
        </div>
      </div>
    </template>
  </layout-variant-two>
</template>

<script>
import { eventService, homeService } from "@/bloc/services";
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import EventBlock from "./components/EventBlock.vue";

import HomeEmptyNudge from "../page-feeds/components/HomeEmptyNudge.vue";
import HomeNudgeCard from "../page-feeds/components/HomeNudgeCard.vue";
import ActivitiesCarousel from "./components/ActivitiesCarousel.vue";

export default {
  name: "EventsPage",
  mixins: [utility],
  components: {
    LayoutVariantTwo,
    EventBlock,
    HomeNudgeCard,
    HomeEmptyNudge,
    ActivitiesCarousel
  },
  data() {
    return {
      banners: [],
      customer: {},
      loading: false,
      eventNavs: [],
      activeEvent: null,
      events: [],
      activeFooterNavId: 1,
      scrollTop: 0,
      isDesktop: false,
      filteredEvents: [],
      isDestroyed: false,
      years: [],
      selectedYear: null,
      selectedMonth: null,
      selectedCategory: "",
      categories: [],
      nudges: [],
      selectedTagNames: [],
      isForYou: false,
      feedNavs: [
        {
          id: 0,
          name: "Gear Guides",
          icon: "backpack",
          isActive: true,
        },
        {
          id: 1,
          name: "Skills",
          icon: "hardware",
          isActive: false,
        },
        {
          id: 2,
          name: "Checklists",
          icon: "checklist",
          isActive: false,
        },
      ],
      activeFeed: null,
      loadingData: false,
      validNudges: [],
    };
  },
  watch: {
    activeFeed() {
      this.retrieveNudges();
    },
  },
  computed: {
    showFeeds() {
      return this.activeFooterNavId == 1;
    },
    allNudgesRead() {
      return isEmpty(this.nudges.filter((it) => it.status == "NOT_READ"));
    },
    fillerNudges() {
      return this.nudgeColumns(this.validNudges).length < 3 && this.isDesktop
        ? 3 - this.nudgeColumns(this.validNudges).length
        : 0;
    },
    videBanner() {
      let video = require("@/assets/video/hydro-video-banner.mp4");
      let hq = this.$store.getters.getHeadquarter;
      if (hq?.app?.properties?.videoBanner) {
        video = hq?.app?.properties?.videoBanner;
      }
      return video;
    },
    welcomeMessage() {
      let name = !isEmpty(this.customer)
        ? this.customer.firstName[0].toUpperCase() +
          this.customer.firstName.substring(1).toLowerCase()
        : "";
      return `${homeService.getDayGreeting()},<br>${name}`;
    },
  },
  methods: {
    setBanners(){
      this.banners = [
				require('@/assets/images/camp-activities-1.jpg'),
				require('@/assets/images/camp-activities-2.jpg'),
				require('@/assets/images/camp-activities-3.jpg'),
				require('@/assets/images/camp-activities-4.jpg'),

				require('@/assets/images/camp-activities-5.jpg'),
				require('@/assets/images/camp-activities-6.jpg'),
				require('@/assets/images/camp-activities-7.jpg'),
				require('@/assets/images/camp-activities-8.jpg'),

				require('@/assets/images/camp-activities-9.jpg'),
				require('@/assets/images/camp-activities-10.jpg'),
				require('@/assets/images/camp-activities-11.jpg'),
				require('@/assets/images/camp-activities-12.jpg'),
				require('@/assets/images/camp-activities-13.jpg')
			]
    },
    stateFeed(feed) {
      this.$store.dispatch("setStateFeedsPage", {
        currentTab: feed || null,
        scrollTop: this.scrollTop,
        scrollLeft: this.scrollLeft,
        isForYou: this.isForYou,
      });
    },
    handleFeedClick(feed) {
      console.log("feed: ", feed);
      this.isForYou = false;
      this.feedNavs.map((it) => (it.isActive = false));
      this.activeFeed = feed;
      if (!feed) return;
      this.feedNavs.find((it) => it.id == feed.id).isActive = true;
      this.stateFeed(feed);
      this.setValidNudges();
    },
    nudgeClicked(nudge) {
      console.log("nudgeClicked");
      let pageToGo = "";
      switch (nudge.type) {
        case "QUESTIONNAIRE":
          pageToGo = "SurveyPage";
          break;
        case "ARTICLE":
          pageToGo = "ArticlePage";
          break;
        case "SURPRISE":
          pageToGo = "SurprisePage";
          break;
      }

      if (pageToGo) {
        this.$router.push({
          name: pageToGo,
          params: {
            nudgeId: nudge.id,
          },
        });
      }
    },
    nudgeColumns(nudges) {
      let items = [];
      if (isEmpty(nudges)) return items;
      nudges.forEach((n, i) => {
        let idx = i % 3;
        if (!items[idx]) items[idx] = [];
        items[idx].push(n);
      });
      return items;
    },
    async retrieveNudges() {
      try {
        this.loadingData = true;
        const allNudges = await homeService.getAllNudges();
        this.nudges = homeService.getValidNudges(allNudges);
        this.loadingData = false;
      } catch (error) {
        this.loadingData = false;
      }
    },
    setValidNudges() {
      console.log("setValidNudges");

      let result = this.nudges;

      console.log("this.nudges", this.nudges);

      const activeFeed = this.feedNavs.find((feed) => feed.isActive);

      console.log("activeFeed", activeFeed);

      console.log("this.isForYou", this.isForYou);

      console.log("this.customer", this.customer);

      /*result = result.filter((it) => {
        if (!activeFeed && this.isForYou) {
          if (!isEmpty(this.customer.interests)) {
            let interests = this.customer.interests.split(",").map((item) => {
              return {
                item: item.trim(),
                selected: it.tags.includes(item.trim()),
              };
            });
            return (
              interests.filter((f) => {
                return f.selected;
              }).length > 0
            );
          }
          return false;
        }
        return it.tags.includes(activeFeed.name);
      });*/

      this.validNudges = result;
    },
    setFilteredEvents() {
      let events = [];
      if (!isEmpty(this.events)) {
        events = this.events.filter((ev) => {
          return ev.eventCategories.map((c) => c.id).includes(this.selectedCategory);
        });
      }
      this.filteredEvents = events?.map((ev) => {
        let sessions = ev.sessions.map((s) => {
          return { ...s, ...{ parent: ev } };
        });
        ev.sessions = sessions;
        return ev;
      });
      if (this.selectedCategory) {
        let data = this.eventsGroupedBycategories(this.selectedCategory);
        if(!isEmpty(data)) this.selectedMonth = data[0].key;
      }
    },
    async storeChanged() {
      try {
        this.loading = true;
        await this.refreshMainData(true);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.showNotification("alert", "error_outline", error);
      }
    },
    eventsGroupedBycategories(id){
      if (isEmpty(this.categories)) return [];
      if (!this.selectedCategory) return [];
      let events = this.events.filter((ev) => ev.eventCategories.map((c) => c.id).includes(id));
      if (isEmpty(events)) return [];
      let mapped = [];
      let sessions = [];
      for(let n = 0; n < events.length; n++){
        let ev = events[n];

        let sess = ev.sessions?.map((s) => ({ 
          ...s, 
          year: moment.tz(s.startDate, "Asia/Singapore").format("yyyy"),
          month: moment.tz(s.startDate, "Asia/Singapore").format("MMMM"),
          parent: ev 
        }));
        sessions = [...sessions, ...sess];
      }
      for(let i = 0; i < sessions.length; i++){
        let one = sessions[i];
        let ix = -1;
        if(!isEmpty(mapped)){
          ix = mapped?.findIndex((it) => it.key == `${one.month} ${one.year}`);
        }
        if(ix >= 0){
          mapped[ix].sessions.push(one);
        } else {
          mapped.push({
            key: `${one.month} ${one.year}`,
            sessions: [one]
          })
        }
      }
      return mapped;
    },
    async initEvents() {
      let stateEvent = this.$store.getters.getStateEventsPage;
      let currentTab = stateEvent.currentTab;

      this.scrollTop = stateEvent.scrollTop || 0;
      this.customer = this.$store.getters.getCustomer;
      this.years = [];
      this.events = [];
      this.categories = [];
      let json = await eventService.getEvents();
      this.loading = false;
      const hiddenEvents = this.$store.getters.getHiddenEvents || [];
      if (!isEmpty(json) && !isEmpty(json.events)) {
        let momente = moment();
        let today = moment.tz(momente, "Asia/Singapore").format("x");
        let events = json.events.filter((it) => {
          return (
            it.status == "ACTIVE" &&
            it.endDate > today &&
            !hiddenEvents.includes(it.id)
          );
        });
        if (!isEmpty(events)) {
          events.map((it) => {
            it.year = moment.tz(it.startDate, "Asia/Singapore").format("yyyy");
            it.month = moment.tz(it.startDate, "Asia/Singapore").format("MMMM");
            it.isActive = false;
            return it;
          });
          events.sort((a, b) => {
            return a.sortIndex - b.sortIndex && a.startDate - b.startDate;
          });
          events[0].isActive = true;
          this.events = events;
          this.activeEvent = events[0];

          events.forEach((ev) => {
            if (!this.years.includes(ev.year)) this.years.push(ev.year);
            let cats = ev.eventCategories.filter((ec) => !this.categories.map((c) => c.id).includes(ec.id));
            this.categories = [...this.categories, ...cats];
          });
          if(!isEmpty(this.categories)){
            this.categories.sort((a,b) => {
              if(a.sortIndex == b.sortIndex) return a.name.localeCompare(b.name);
              return a.sortIndex - b.sortIndex;
            });
            this.selectedCategory = this.categories[0].id;
            let skip = false;
            if (!isEmpty(currentTab)) {
              let curr = this.categories.find((c) => c == currentTab);
              if (curr) {
                skip = true;
                this.selectedCategory = curr;
              }
            }
            if (!skip) this.handleCategoryClick(this.selectedCategory);
          }
        }
        this.setFilteredEvents();
        this.$store.dispatch("setEvents", events);
        document.querySelector(".sd-base-con").scrollTop = this.scrollTop;

        let self = this;
        document
          .querySelector(".sd-base-con")
          .addEventListener("scroll", (e) => {
            self.scrollTop = e.target.scrollTop;
            let payload = {
              currentTab: self.selectedYear,
              scrollTop: self.scrollTop,
            };
            self.$store.dispatch("setStateEventsPage", payload);
          });
      }
      setTimeout(() => {
        this.resizeImageHandler();
      }, 20);
    },
    resizeBannerHandler() {
      this.isDesktop = window.innerWidth >= 672;
      if (this.isDestroyed) return;

      if (this.isDesktop) {
        let scrollable =
          document.querySelector(".feeds-content").scrollWidth >
          document.querySelector(".feeds-content").clientWidth;
        if (!scrollable)
          document.querySelector(".feeds-content").classList.add("centered");
        else
          document.querySelector(".feeds-content").classList.remove("centered");
      } else {
        document.querySelector(".feeds-content").classList.remove("centered");
      }
    },
    handleCategoryClick(id) {
      if (id == this.selectedCategory) return;
      this.selectedCategory = id;
      let payload = {
        currentTab: id,
        scrollTop: this.scrollTop,
      };
      this.$store.dispatch("setStateEventsPage", payload);
      this.setFilteredEvents();
    },
    toggleMonth(month) {
      this.selectedMonth = this.selectedMonth == month ? null : month;
    },
  },
  async created() {
    try {
      this.isDestroyed = false;
      this.activeFooterNavId = 1;
      this.loading = true;
      this.setBanners();
      await this.refreshMainData(true);
      this.initEvents();
      this.resizeBannerHandler();

      window.addEventListener("resize", () => {
        this.resizeBannerHandler();
      });
    } catch (error) {
      this.loading = false;
      this.showNotification("alert", "error_outline", error);
    }
  },
  beforeUnmount() {
    this.isDestroyed = true;
  },
};
</script>

<style scoped lang="scss">
.video-banner {
  width: 100%;
  padding-bottom: 32px;
  video {
    width: 100%;
  }
}
.header-con {
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $secondary-color-20;

  &.no-bordered {
    border-bottom-color: transparent !important;
  }

  .back-btn {
    color: $primary-color-100;
    cursor: pointer;
    font-size: 1.2em;
  }

  h1 {
    flex: 1;
    font-size: 1.2em;
    font-weight: bold !important;
    font-family: "Akzidenz Grotesk Super";
  }
}

.heading-5 {
  filter: drop-shadow(-2px -2px 6px $secondary-color-100);
  -webkit-filter: drop-shadow(-2px -2px 6px $secondary-color-100);
}

.events-content {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;

  .text-content {
    width: 100%;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    padding: 24px;
    line-height: 1.5;

    .inline-content {
      padding-inline: 0 !important;
    }

    h1 {
      font-size: 28pt;
      line-height: 1.2 !important;
    }

    p {
      padding: 20px 0;
    }
  }

  .block-content {
    width: 100%;
    padding: 24px;
    margin-top: 16px;
    padding-top: 32px;
    border-top: 1px solid $secondary-color-20;
    display: flex;
    flex-direction: column;
    gap: 10px;
    line-height: 22px;
  }
  .newsletter-input {
    width: 100%;
    max-width: 650px;
    margin-inline: auto;
    height: 50px;
    border-radius: 999px;
    border: 1px solid $gold-dark;
    padding-inline: 24px;
  }

  .inline-content {
    width: 100%;
    display: flex;
    gap: 24px;
    flex-direction: column;
    padding: 24px;
    line-height: 1.5;
    text-align: left;
    &.stretch {
      .inline-content-item {
        max-width: 100% !important;
      }
      .inline-content-image {
        max-width: 100%;
        gap: 16px;
        img {
          flex: 1;
          min-width: 300px;
          max-width: 300px;
          height: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          object-fit: cover;
        }
      }
    }
  }
  .inline-content-item {
    flex: 1;
  }
  .inline-content-image {
    width: 100%;
    max-width: 500px;
    display: flex;
    overflow-x: auto;
    img {
      flex: 1;
      aspect-ratio: 4/3;
      overflow: hidden;
      object-fit: cover;
    }
  }

  .container-1 {
    width: 100%;
    min-width: 100%;
    height: 100%;
    max-height: 540px;
    text-align: left;
    display: flex;
    flex-direction: column;
    background: $secondary-color-90;
    background-image: url("@/assets/images/event-bg-new.jpeg");
    background-position: center;
    background-size: cover;

    .back-btn {
      color: $white;
      padding: 24px;
      cursor: pointer;
    }

    .top-content {
      max-width: 450px;
      margin: 0 auto;
      padding: 24px;
      flex: 3;
      overflow: hidden;
      overflow-y: auto;
      width: 100%;
      color: $white;

      h1 {
        text-align: left;
        font-size: 2em;
        line-height: 1.4;
        font-family: "Akzidenz Grotesk Super";

        & + * {
          font-size: 1.2em;
          line-height: 1.4;
          width: 100%;
          display: block;
          margin-top: 16px;
        }
      }
    }

    & + .container-2 {
      margin-top: 24px;
    }
  }

  .container-2 {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: $secondary-color-90;
    color: $white;
    position: relative;

    &.show-background {
      min-width: 100%;
      /* background-image: url("@/assets/images/event-bg-new2.jpeg"); */
      background-image: url("@/assets/images/homepage-banner.jpg");
      background-position: center;
      background-size: cover;
      aspect-ratio: 16/9;
      max-height: 500px;
      overflow: hidden;
    }

    .top-content {
      padding: 0 24px;
      display: none;

      h1 {
        width: 100%;
        text-align: left;
        font-size: 1.6em;
        line-height: 1.4;
        font-weight: bolder;

        & + * {
          font-size: 1.2em;
          line-height: 1.4;
          width: 100%;
          display: block;
          margin-top: 16px;
        }
      }
    }

    .backdrop-content {
      display: none;
      padding: 0 24px;
      padding-top: 24px;
      height: 250px;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }
  }

  .main-content {
    padding: 0 !important;
    position: relative;
    &.empty {
      margin-top: 0 !important;
    }

    .feeds {
      margin-top: auto;
      width: 100%;

      .feeds-content {
        padding: 0 24px;
        display: flex;
        width: 100%;
        overflow-x: auto;
        align-items: center;
        justify-content: flex-start;
        background: $primary-color-100;
        position: relative;

        &.centered {
          justify-content: center !important;
        }

        .feed {
          padding: 24px 0;
          cursor: pointer;
          font-size: 1rem;
          line-height: 0.875rem;
          letter-spacing: 0.025rem;
          position: relative;
          display: flex;
          align-items: center;
          color: $white;

          .material-icons {
            font-size: 16px;
          }

          .feed-label {
            font-weight: bold;
            white-space: nowrap;
          }

          * + * {
            margin-left: 8px;
          }

          & + .feed {
            margin-left: 32px;
          }

          &.active {
            &::before {
              content: "";
              position: absolute;
              width: 100%;
              height: 2px;
              left: 0px;
              right: 0px;
              margin: 0 auto;
              bottom: 12px;
              background-color: $white;
              transition: all 0.5s;
              z-index: 10;
              animation: tabslide 0.35s ease-in-out;
              -webkit-animation: tabslide 0.35s ease-in-out;
            }
          }
        }
      }
    }
  }

  .container-3 {
    width: 100%;
    padding: 32px 0px;
    padding-bottom: 80px;

    h1 {
      width: 100%;
      text-align: left;
      font-size: 1.5em;
      line-height: 1.4;
      padding: 0 24px;
      font-weight: bolder !important;
      color: $secondary-color-50;

      & + * {
        font-size: 1.2em;
        line-height: 1.4;
        width: 100%;
        margin-top: 16px;
      }
    }

    .why {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 26px;
      overflow: hidden;
      overflow-x: auto;
      padding: 0 24px;

      .why-item {
        width: 100%;
        min-width: 200px;
        background: $secondary-color-10;
        padding: 12px 24px;
        border-radius: 10px;

        .why-img {
          width: 100px;
          height: 100px;
          margin: 0 auto;

          img {
            object-fit: cover;
          }
        }

        .why-content {
          padding-top: 24px;
          text-align: left;

          .why-title {
            font-weight: bold;
            color: $secondary-color-90;
            font-size: 0.8em;
          }

          .why-note {
            font-size: 0.6em;
            color: $secondary-color-60;
          }
        }
      }
    }

    & + * {
      margin-top: 40px;
    }
  }

  .cards {
    padding-top: 0px;
  }
}

@keyframes tabslide {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

@-webkit-keyframes tabslide {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}
.event-accordion {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  .accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding-inline: 24px;
    &::before {
      width: calc(100% - 48px);
      margin-inline: auto;
      height: 1px;
      content: "";
      border-bottom: 1px solid $primary-color-20;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -12px;
    }
    .accordion-header-title {
      font-weight: bold;
      font-size: 1.2em;
    }
    .accordion-toggle {
      color: $secondary-color-90;
      cursor: pointer;
    }
  }
  .accordion-content {
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: all 0.25s ease-in;
    -webkit-transition: all 0.25s ease-in;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow: hidden;
    padding-inline: 24px;
    opacity: 0;
    &.opened {
      padding-block: 24px;
      max-height: 10000px;
      opacity: 1;
    }
  }
}
@media (min-width: 672px) {
  .text-content {
    padding-inline: 7% !important;
    .inline-content {
      padding-inline: 0 !important;
    }
  }
  .feeds-content {
    padding-inline: 7% !important;
  }
  .block-content {
    padding-inline: 7% !important;
  }
  .inline-content {
    flex-direction: row !important;
    padding-inline: 7% !important;
    &.stretch {
      .inline-content-item {
        max-width: 40% !important;
      }
      .inline-content-image {
        flex: 2 !important;
        max-width: 100%;
      }
    }
  }
  .inline-content-image {
    max-width: 40%;
  }
  .user-dropdown {
    right: 7% !important;
    top: 80px !important;
  }

  .container-1 {
    padding: 32px 7% !important;
  }

  .container-2 {
    padding: 32px 0 !important;
    padding-bottom: 0 !important;

    .top-content {
      padding: 32px 7% !important;
    }
  }

  .main-content {
    .feeds {
      .feeds-content {
        padding: 0 7% !important;

        .feed {
          .feed-label {
            font-size: 1.2em !important;
          }
        }
      }

      .cards {
        padding-inline: 7% !important;
      }
    }
  }

  .container-3 {
    padding: 32px 7% !important;

    .why,
    h1 {
      padding: 0 !important;
    }
  }

  .top-content {
    h1 {
      font-size: 2em !important;
    }
  }
  .event-accordion {
    .accordion-content {
      flex-direction: row;
      overflow-x: auto;
      padding-inline: 0 !important;
    }
    .accordion-header {
      padding-inline: 0 !important;
    }
  }
}

@media (max-width: 670px) {
  .events-content {
    .text-content {
      width: 100%;

      h1 {
        font-size: 20pt;
        line-height: 30px;
      }

      p {
        padding: 20px 0;
      }
    }
  }
}

.feeds {
  display: flex;
  width: 100%;
  overflow-x: auto;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-inline: 24px;
  max-width: 1709px;
  margin: 0 auto;

  .feed {
    padding: 24px 0;
    cursor: pointer;
    font-size: 0.75rem;
    line-height: 0.875rem;
    letter-spacing: 0.025rem;
    position: relative;
    display: flex;
    align-items: center;

    .material-icons {
      font-size: 16px;
    }

    .feed-label {
      white-space: nowrap;
    }

    * + * {
      margin-left: 8px;
    }

    & + .feed {
      margin-left: 32px;
    }

    &.points {
      padding: 24px 8px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 12px;
        z-index: -1;
        background: linear-gradient(
          90deg,
          $secondary-color-50,
          $secondary-color-20
        );
        color: $secondary-color-80;
      }

      .feed-label {
        border-radius: 8px;
        padding: 6px 24px;
        background: $white;
        color: $secondary-color-70;
      }
    }

    &.active {
      color: $primary-color-100;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        left: 0px;
        bottom: 12px;
        background-color: $primary-color-100;
        transition: all 0.5s;
        z-index: 2;
      }
    }
  }
}

.nudge-card-con {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;

  .nudge-column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &.blurred-data {
    .nudge-card {
      filter: blur(2px);
      -webkit-filter: blur(2px);
      -moz-filter: blur(2px);
      -o-filter: blur(2px);
    }
  }
}

@media (min-width: 672px) {
  .feeds {
    padding: 0 7% !important;
  }
  .nudge-card-con {
    display: flex;
    justify-content: unset !important;
    flex-direction: row;
    padding: 16px 7% !important;
    flex-wrap: wrap;

    /*
			&::after {
				content: "";
				flex-grow: 999;
			}
			*/

    .nudge-column {
      flex-basis: 30%;
      flex-grow: 1;
      display: flex;
      gap: 1.2em;
      flex-direction: column;
    }
  }
}
</style>
