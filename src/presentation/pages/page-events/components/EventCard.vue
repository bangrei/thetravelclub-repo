<template>
    <div class="cards">
        <event-block 
            v-for="(ev, i) in filteredEvents" 
            :event="ev"
            :selectedCategory="selectedCategory"
            :emitEvent="emitEvent"
            :key="i">
        </event-block>
    </div>
</template>

<script>
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
import EventBlock from "./EventBlock.vue";
export default {
    mixins: [utility],
    components: {
        EventBlock
    },
    props: {
        events: {
            type: Array,
            default: () => []
        },
        selectedCategory: {
            type: String,
            default: "",
        },
        emitEvent: {
            type: Boolean,
            default: false,
        }
    },
    data() {
		return {
            isDesktop: false,
            filteredEvents: [],
		};
    },
    computed: {},
    methods: {
        gotoResult(res){
            if(!res) {
                return this.$router.push({
                    name: "EventsView"
                });
            }
            this.$router.push({
                name: "EventSearch",
                params: {
                    eventName: res
                },
            });
        },
        clickEventDetails(event) {
            if (this.emitEvent) {
                return this.$emit('event-clicked', event);
            }
            this.$router.push({
                name: "EventDetails",
                params: {
                    eventId: event.id,
                    category: this.selectedCategory,
                    eventName: event.name,
                },
            });
        },
        async initEvents(events) {
            if (!isEmpty(events)) {
                events = events.map((it) => {
                    if (!isEmpty(it.banners)) {
                        it.banners.map((banner) => {
                            banner.image = this.getImage(banner.id);
                            return banner;
                        });
                        it.banners.sort((a, b) => { return a.sortIndex - b.sortIndex });
                    } else {
                        it.banners = [];
                    }
                    return it;
                });
            }
            this.filteredEvents = events;
            // if (this.filteredEvents.length > 0) {
            //     this.filteredEvents.forEach(async (ev) => {
            //         let ratingData = await this.retrieveReviewRatings(ev.id);
            //         ev.ratingData = ratingData;
            //     });
            // }
        }
    },
    created() {
        this.initEvents(this.events);
    },
}
</script>

<style scoped lang="scss">
    .cards {
        display: flex;
        width: 100%;
        overflow-x: auto;
        position: relative;
        padding: 24px;
    }
    @media(min-width: 672px){
        .cards {
            padding: 24px 7% !important;
        }
    }
</style>
