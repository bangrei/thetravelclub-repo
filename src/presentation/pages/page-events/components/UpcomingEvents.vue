<template>
  <div class="upcoming-events-container">
    <h2 class="upcoming-events-title" v-if="events?.length">Your next travel awaits</h2>
    <div class="upcoming-events">
      <SessionCard
        v-for="sess in events"
        :key="sess.sessionTimeId"
        :event="sess"
      />
    </div>
  </div>
</template>
<script>
import { eventService } from "@/bloc/services";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import SessionCard from "./SessionCard.vue";
export default {
  name: "UpcomingEvents",
  components: {
    SessionCard,
  },
  data(){
    return {
      events: [],
      loading: true
    }
  },
  methods: {
    async initEvents() {
      try {
        this.events = [];
        let json = await eventService.getEvents();
        const hiddenEvents = this.$store.getters.getHiddenEvents || [];
        if (!isEmpty(json) && !isEmpty(json.events)) {
          let momente = moment();
          let today = moment.tz(momente, "Asia/Singapore").format("x");
          let events = json.events.filter((it) => {
            return (
              it.status == "ACTIVE" && !hiddenEvents.includes(it.id)
            );
          });
          if (!isEmpty(events)) {
            events.sort((a, b) => {
              return a.sortIndex - b.sortIndex && a.startDate - b.startDate;
            });
            let sessions = [];
            for(let n = 0; n < events.length; n++){
              let ev = events[n];
              let sess = ev.sessions?.map((s) => ({ 
                ...s,
                parent: ev,
                availability: s.endDate > today ? 1 : 0
              }));
              sessions = [...sessions, ...sess];
            }
            this.events = sessions.sort((a,b) => b.availability - a.availability );
          }
          this.$store.dispatch("setEvents", events);
        }
      } catch(err){
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.initEvents();
  }
}
</script>
<style scoped lang="scss">
.upcoming-events-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
}
.upcoming-events-title {
  padding-inline: 24px;
}
.upcoming-events {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-inline: 24px;
  padding-bottom: 16px;
}
@media (min-width: 672px) {
  .upcoming-events-title {
    padding-inline: 7%;
  }
  .upcoming-events {
    padding-inline: 7%;
    flex-direction: row;
    overflow-x: auto;
  }
}
</style>