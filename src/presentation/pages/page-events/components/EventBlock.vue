<template>
    <div class="card" :class="{'display-only': displayOnly, 'bg-white': overrideBgColor}">
        <div class="card-img" :class="{'hidden': displayOnly,'custom-carousel': item?.parent.banners.length > 1, 'rectangle-carousel': item?.parent.banners.length > 1 && isDesktop}">
            <img v-if="item?.parent.banners.length == 1"
                alt="rox event" 
                :src="getImage(item?.parent.banners[0].id)"/>
            <event-carousel v-if="item?.parent.banners.length > 1"
                className="square"
                :banners="item?.parent.banners"
            />
        </div>
        <div class="card-content">
            <div class="card-note">{{ item?.parent.categories.join(', ') }}</div>
            <div class="card-title">{{ item.name }}</div>
            <div class="card-inline">
                <span class="inline-icon material-icons">calendar_month</span>
                <span class="inline-text">{{ startDateDisplay }}</span>
            </div>
            <div class="card-inline">
                <span class="inline-icon material-icons-outlined">timer</span>
                <span class="inline-text">{{ timeDisplay }}</span>
            </div>
            <div class="card-inline">
                <span class="inline-icon material-icons-outlined">landscape</span>
                <span class="inline-text">{{ item?.location.string }}</span>
            </div>
            <div class="card-inline" v-if="item.ratingData?.reviewsList.length">
                <span class="inline-icon primary material-icons">star</span>
                <span class="inline-text primary">{{ item.ratingData?.ratingPoints }} from {{ item.ratingData?.reviewsList.length }} reviews</span>
            </div>
            <div class="card-price">{{ item.price == 0 ? 'FREE' : currency(item.price) }}</div>
            <div class="card-buttons" v-if="!displayOnly || displayWithBookButton">
                <div class="card-btn" v-if="enableBooking" @click="bookEvent">Book Now</div>
                <div class="card-btn lite" v-if="!displayWithBookButton" @click="clickEventDetails">Learn More</div>
            </div>
            <!-- <div class="card-footnote blue">
                <span class="material-icons">emoji_people</span> 
                <span v-if="registeredSessions > 0">{{ registeredSessions }} sign up</span>
                <span v-else-if="isEmpty(item.sessions)">coming soon</span>
                <span v-else>{{ item.spotLeft }} spots available</span>
            </div> -->
        </div>
    </div>
</template>

<script>
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
import moment from 'moment-timezone';
import EventCarousel from './EventCarousel.vue';
export default {
    mixins: [utility],
    components: {
        EventCarousel,
    },
    props: {
        event: {
            type: Object,
            default: () => {}
        },
        selectedCategory: {
            type: String,
            default: "",
        },
        emitEvent: {
            type: Boolean,
            default: false,
        },
        displayOnly: {
            type: Boolean,
            default: false,
        },
        displayWithBookButton: {
            type: Boolean,
            default: false,
        },
        overrideBgColor: {
            type: Boolean,
            default: false,
        },
        enableBooking: {
            type: Boolean,
            default: true
        }
    },
    data() {
		return {
            isDesktop: false,
            item: null
		};
    },
    computed: {
        registeredSessions() {
            if (isEmpty(this.item)) return 0;
            let reg = this.item.maxSpot - this.item.spotLeft;
            return reg;
        },
        eventYear() {
            if (isEmpty(this.item)) return;
            return moment.tz(this.item.startDate,'Asia/Singapore').format('YYYY');
        },
        startDateDisplay() {
            if (isEmpty(this.item)) return;
            const startDate = moment.tz(this.item.startDate,'Asia/Singapore').format('MMM DD, YYYY');
            const endDate = moment.tz(this.item.endDate,'Asia/Singapore').format('MMM DD, YYYY');
            if(startDate == endDate) return startDate;
            return `${startDate} - ${endDate}`;
        },
        timeDisplay() {
            if (isEmpty(this.item)) return;
            const startDate = moment.tz(this.item.startDate,'Asia/Singapore').format("HH:mm A");
            const day1 = moment.tz(this.item.startDate,'Asia/Singapore').format("ddd");
            const day2 = moment.tz(this.item.endDate,'Asia/Singapore').format("ddd");
            const endDate = moment.tz(this.item.endDate,'Asia/Singapore').format("HH:mm A");
            return `${startDate} - ${endDate} (${day1} - ${day2})`;
        },
    },
    methods: {
        clickEventDetails() {
            if (this.emitEvent) {
                return this.$emit('event-clicked', this.item);
            }
            this.$router.push({
                name: "EventDetails",
                params: {
                    timeId: this.item.sessionTimeId
                },
            });
        },
        async initEvent(event) {
            if (!isEmpty(event)) {
                if (!isEmpty(event.parent.banners)) {
                    event.parent.banners.map((banner) => {
                        banner.image = this.getImage(banner.id);
                        return banner;
                    });
                    event.parent.banners.sort((a, b) => { return a.sortIndex - b.sortIndex });
                } else {
                    event.parent.banners = [];
                }
            }
            this.item = event;
            if (this.displayOnly) return;
            let ratingData = await this.retrieveReviewRatings(event.parent.id);
            this.item.ratingData = ratingData;
        },
        doClearBookings() {
            let bookings = this.$store.getters.getBooking;
            if (!isEmpty(bookings)) {
                bookings.forEach((booking) => {
                if (!isEmpty(booking.promoCodes)) {
                    let promoCodes = this.$store.getters.getPromoCodes;
                    promoCodes = promoCodes.filter((code) => {
                    return booking.promoCodes.indexOf(code) == -1;
                    });
                    this.$store.dispatch("setPromoCodes", promoCodes);
                }
                });
                this.$store.dispatch("clearBooking");
            }
            this.$store.dispatch("clearBooking");
        },
        bookEvent() {
            let params = {
                timeId: this.item.sessionTimeId,
            };
            if (!this.isLoggedIn()) {
                return this.$router.push({
                path: "/login",
                query: {
                    redirect: `/event/${params.timeId}`,
                },
                });
            }
            this.doClearBookings();
            this.$router.push({
                name: "BookEvent",
                params: params,
            });
        }
    },
    created() {
        this.isDesktop = window.innerWidth >= 672;
        this.initEvent(this.event);
        window.addEventListener('resize', () => {
            this.isDesktop = window.innerWidth >= 672;
        });
    },
}
</script>

<style scoped lang="scss">
    .card {
        background: transparent;
        height: auto;
        min-height: 610px;
        width: 100%;
        display: flex;
        gap: 16px;
        flex-direction: column;
        &.bg-white {
            background: $white !important;
        }
        &.display-only {
            min-height: unset !important;
            padding: 24px;
            background: $secondary-color-20;
        }
        .card-img {
            aspect-ratio: 1/1;
            background: $secondary-color-20;
            &.hidden {
                display: none !important;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .card-content {
            flex: 1;
            width: 100%;
            color: $secondary-color-100;
            display: flex;
            flex-direction: column;
            gap: 4px;
            .card-inline {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                min-height: 16px;
                .inline-icon {
                    font-size: 1em !important;
                    color: $secondary-color-70;
                    margin-top: 3px;
                    &.primary {
                        color: $primary-color-100;
                    }
                }
                .inline-text {
                    font-size: 1em;
                    color: $secondary-color-100;
                    text-align: left;
                    display: block;
                    overflow: hidden;
                    white-space: break-spaces;
                    max-height: 78px;
                    &.primary {
                        color: $primary-color-100;
                    }
                }
            }

            .card-buttons {
                width: 100%;
                display: flex;
                flex-direction: row;
                gap: 12px;
                .card-btn {
                    flex: 1;
                    padding-inline: 16px;
                    padding-block: 6px;
                    border-radius: 20px;
                    background: $secondary-color-100;
                    color: $white;
                    border: 1px solid transparent;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: small;
                    &:hover{
                        filter: opacity(0.7);
                    }
                    &.lite {
                        color: $secondary-color-100;
                        background: $white;
                        border-color: $secondary-color-100;
                    }
                }
            }

            .card-more-title {
                color: $primary-color-50;
                font-weight: bold;
                text-align: center;
            }

            .card-subtitle {
                color: $primary-color-100;
                font-size: 10pt;
                line-height: 14px;
                font-weight: bold;
                text-align: left;
                text-transform: uppercase;
            }
            .card-title {
                font-size: 14pt;
                line-height: 22px;
                font-weight: bold;
                width: 100%;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: break-spaces;
                color: $secondary-color-100;
                text-align: left;
                max-height: 70px;
            }
            .card-price {
                font-weight: bold;
                display: block;
                width: 100%;
                padding: 10px 0;
                color: $secondary-color-100;
                font-size: 1.2em;
                line-height: 20px;
                text-align: left;
            }
            .card-desc {
                color: $secondary-color-100;
                font-size: 10pt;
                line-height: 14px;
                text-align: left;
            }
            .card-note {
                font-size: 10pt;
                line-height: 16px;
                color: $secondary-color-100;
                text-align: left;
                white-space: break-spaces;
                max-height: 32px;
                display: block;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .card-footnote {
                font-size: 10pt;
                line-height: 14px;
                color: $secondary-color-100;
                display: flex;
                align-items: center;
                &.blue {
                    color: $info-light;
                }

                .material-icons {
                    font-size: 1.4em;
                }

                * + * {
                    margin-left: 4px;
                }
            }
        }
    }
    .rating-legend {
        display: flex;
        gap: 4px;
        padding: 6px 0;
        .rating-star {
            color:  $primary-color-100;
            font-size: 1.1em !important;
        }
        .rating-points {
            font-size: 1em;
            font-weight: bold;
            color: $primary-color-100;
        }
        .rating-total-reviewers {
            color: $secondary-color-50;
            padding: 0 6px;
            font-size: 0.9em;
        }
    }
    @media(min-width: 672px){
        .card {
            flex-direction: row;
            height: 350px;
            min-height: 350px;
            &.display-only {
                min-height: unset !important;
                height: auto !important;
            }
            .card-img {
                height: 100%;
                aspect-ratio: 2/3;
            }
            .card-content {
                max-width: 250px;
                min-width: 250px;
                .card-inline {
                    font-size: 0.8em !important;
                }
                .card-buttons {
                    flex-direction: column;
                    max-width: 175px;
                }
                .card-subtitle {
                    font-size: 12pt !important;
                    line-height: 16px !important;
                }
                .card-price {
                    font-size: 1.4em !important;
                    line-height: 20px !important;
                }
                .card-desc {
                    font-size: 12pt !important;
                    line-height: 16px !important;
                }
                .card-footnote {
                    font-size: 12pt !important;
                    line-height: 16px !important;
                    .material-icons {
                        font-size: 1.6em !important;
                    }
                }
            }
        }
    }
</style>
