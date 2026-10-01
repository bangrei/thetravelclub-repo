<template>
  <div class="experiences-content">
    <div class="experiences-grid" v-if="loading && !hideCategory">
      <div class="experiences-grid-item shimmer" v-for="n in arrayOfShimmer" :key="n"></div>
    </div>
    <div class="experiences-grid" v-else-if="!hideCategory">
      <div :class="`experiences-grid-item ${selectedCategory === null ? 'active' : ''}`" @click="clickCategory(null)">
        <div class="experiences-grid-title">All</div>
      </div>
      <div :class="`experiences-grid-item ${selectedCategory === category.name ? 'active' : ''}`" v-for="category in categoryNames" :key="category.id" @click="clickCategory(category.name)">
        <div class="experiences-grid-title">{{ category.name }}</div>
      </div>
    </div>
    <div class="upcoming-events">
      <div class="event-shimmer" v-for="n in eventShimmer" :key="n">
        <div class="event-shimmer-content"></div>
      </div>
      <div class="event-item" v-for="sess in filteredEvents" :key="sess.sessionTimeId">
        <SessionCard :event="sess" />
      </div>
      <div class="empty-state" v-if="!loading && filteredEvents.length === 0">
        No events available.
      </div>
    </div>
  </div>
</template>
<script>
import { eventService } from "@/bloc/services";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import SessionCard from "@/presentation/pages/page-events/components/SessionCard.vue";
import utility from "@/presentation/mixins/utility.js";
export default {
  name: "EventsList",
  mixins: [utility],
  components: {
    SessionCard
  },
  props: {
    hideCategory: {
      type: Boolean,
      default: false
    },
    eventProperty: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: true,
      categories: [],
      selectedCategory: null,
      events: [],
    };
  },
  computed: {
    filteredEvents() {
      if (this.selectedCategory === null) {
        return this.events;
      }
      return this.events.filter(event => event.parent.eventCategories.some(cat => cat.name.toLowerCase() === this.selectedCategory.toLowerCase()));
    },
    categoryNames() {
      return this.categories?.map(cat => ({
        name: cat, 
        id: Math.random().toString(12)
      }));
    },
    arrayOfShimmer() {
      if(this.loading) {
        return Array.from({ length: 4 }, (_, index) => index);
      }
      return [];
    },
    eventShimmer() {
      if(this.loading) {
        return Array.from({ length: 8 }, (_, index) => index);
      }
      return [];
    }
  },
  methods: {
    clickCategory(categoryName) {
      this.selectedCategory = categoryName;
    },
    async fetchEvents() {
      try {
        this.events = [];
        let json = await eventService.getEvents();
        const hiddenEvents = this.$store.getters.getHiddenEvents || [];
        if (!isEmpty(json) && !isEmpty(json.events)) {
          let momente = moment();
          let today = parseInt(moment.tz(momente, "Asia/Singapore").format("x"));
          let events = json.events.filter((it) => it.status == "ACTIVE" && !hiddenEvents.includes(it.id));
          if (!isEmpty(events)) {
            events.sort((a, b) => a.sortIndex - b.sortIndex && a.startDate - b.startDate);
            let sessions = [];
            for(let n = 0; n < events.length; n++){
              let ev = events[n];
              const eligible = this.eventProperty ? ev.extraFields?.some((f) => f.property == this.eventProperty && f.value == true) : true;
              if(!eligible) {
                continue; // Skip this event if it doesn't have the required property
              }
              let sess = ev.sessions?.map((s) => ({ 
                ...s,
                parent: ev,
                availability: s.endDate > today ? 1 : 0
              }));
              sessions = [...sessions, ...sess];
            }
            this.events = sessions?.sort((a,b) => b.availability - a.availability);
          }
          this.$store.dispatch("setEvents", events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        this.initCategories();
      }
    },
    initCategories() {
      try {
        const categoriesSet = new Set();
        this.events?.forEach(event => {
          event.parent.eventCategories.forEach(cat => {
            categoriesSet.add(cat.name);
          });
        });
        this.categories = Array.from(categoriesSet)
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    try {
      this.loading = true;
      if (!this.$store.getters.hasInited) {
        await this.refreshMainData(true);
        this.$store.dispatch('setInited', true);
      }
    } catch (error) {
      console.error("Error during created hook:", error);
    } finally {
      this.fetchEvents();
    }
  },
};
</script>
<style scoped lang="scss">
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
@-webkit-keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.empty-state {
  width: 100%;
  text-align: left;
  color: $secondary-color-80;
  font-size: 16px;
  line-height: 22px;
}
.experiences-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 40px;
  .experiences-grid {
    width: 100%;
    display: flex;
    max-width: 100%;
    overflow-x: auto;
    padding: 20px;
    gap: 20px;
    .experiences-grid-item {
      min-height: 35px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: $secondary-color-80;
      background: $yellow-main;
      border-radius: 999px;
      padding: 6px 20px;
      cursor: pointer;
      white-space: nowrap;
      &:is(.active) {
        color: $yellow-main;
        background: $secondary-color-80;
        .experiences-grid-icon,
        .experiences-grid-title {
          color: $yellow-main;
        }
      }
      &.shimmer {
        content: "";
        min-width: 150px;
        max-width: 150px;
        border-radius: 999px;
        background: $secondary-color-20;
        animation: shimmer 2.5s infinite;
        border: 1px solid $secondary-color-20;
      }
      .experiences-grid-icon {
        width: fit-content;
        margin-inline: auto;
        font-size: 5em;
      }
      .experiences-grid-title {
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
      }
    }
  }
}
.upcoming-events {
  width: 100%;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  padding-inline: 20px;
  .event-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .event-shimmer {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .event-shimmer-content {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      min-height: 400px;
      background: linear-gradient(180deg, $secondary-color-20 45%, $secondary-color-10 25%, $secondary-color-10 50%, $secondary-color-10 75%);
      animation: shimmer 2.5s infinite;
      border: 1px solid $secondary-color-20;
    }
  }
}
@media (min-width: 672px) {
  .upcoming-events {
    padding-inline: 7%;
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  }
  .experiences-grid {
    padding-inline: 7% !important;
  }
}
@media (min-width: 672px) and (max-width: 1024px) {
  .experiences-grid {
    padding-inline: 20px !important;
  }
  .upcoming-events {
    padding-inline: 20px !important;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr)) !important;
  }
}
@media (min-width: 672px) and (max-width: 768px) {
  .upcoming-events {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)) !important;
  }
}
</style>