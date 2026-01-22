<template>
	<layout-variant-two :show-loading-screen="loading">
        <template v-slot:header>
			<div class="slide-down">
                <base-nav-content/>
                <base-nav-secondary/>
			</div>
		</template>
		<template v-slot:body>
            <div class="head-banner">
                <div class="back-btn" @click="goBack()">
                    <span class="material-icons">arrow_back</span>
                    <span>Back</span>
                </div>
                <div class="head-banner-overlay">
                    <img v-if="!loading" :src="eventBanner" alt="pickel ball"/>
                </div>
                <div class="head-content" v-if="selectedSession">
                    <event-block 
                        displayOnly 
                        :displayWithBookButton="eventDetails?.externalLink ? false : true"
                        overrideBgColor
                        :event="selectedSession" 
                        :selectedCategory="selectedSession.year"/>
                </div>
            </div>
            <div ref="container" class="container" v-if="!isEmpty(eventDetails)">
                <button 
                    @click="goToExternalLink" 
                    v-if="eventDetails?.externalLink" 
                    class="book-now"
                >Sign Up <i class="material-icons-outlined">launch</i></button>
                <div class="event-title">{{ eventDetails.name }}</div>
                <span class="event-date">{{ eventDate }}</span>
                <div class="event-subtitle" v-html="eventDesc"></div>
                <div class="event-img no-image" v-if="eventDetails.banners.length == 0"></div>
                <div class="event-img" v-else-if="eventDetails.banners.length == 1">
                    <img :src="getImage(eventDetails.banners[0].id)"/>
                </div>
                <activities-carousel v-else :images="bannersList"/>
                <div class="custom-blocks-section" v-if="!isEmpty(eventDetails.customBlocks)">
                    <div class="custom-block" v-for="block in eventDetails.customBlocks" :key="block.id">
                        <div class="custom-block-content">
                            <span class="block-title">{{ block.title }}</span>
                            <div class="block-body" v-html="block.body"></div>
                        </div>
                        <div class="custom-block-image" v-if="block.image">
                            <img :src="getImage(block.image)" :alt="block.title"/>
                        </div>
                    </div>
                </div>
                <div class="faq-section" v-if="!isEmpty(selectedSession.faq)">
                    <base-accordion 
                        accordion-title="Frequently Asked Questions (FAQ)" 
                        accordion-dark-header="true"
                    >
                        <base-accordion 
                            v-for="faq in selectedSession.faq" :key="faq.id"
                            :accordion-title="faq.title" 
                            accordion-dark-header="true"
                        >
                            <div class="faq-content">
                                <div class="faq-desc" v-html="faq.body"></div>
                                <div class="faq-image" v-if="faq.image">
                                    <img :src="getImage(faq.image)" :alt="faq.title"/>
                                </div>
                            </div>
                        </base-accordion>
                    </base-accordion>
                </div>
                <button 
                    @click="goToExternalLink" 
                    v-if="eventDetails?.externalLink" 
                    class="book-now"
                >Sign Up <i class="material-icons-outlined">launch</i></button>
                <div class="event-label-more bold" v-if="!isEmpty(eventDetails.moreEvents)">More Like This</div>
                <div class="cards">
                    <event-block v-for="ev in eventDetails.moreEvents"
                        :key="ev.sessionTimeId"
                        :event="ev" 
                        :enableBooking="false"
                        :selectedCategory="ev.year">
                    </event-block>
                </div>
                <div class="rating-reviews" v-if="isLoggedIn && !isHideRating">
                    <h3 class="reviews-headline">Rating & Reviews of {{ eventDetails.name }}</h3>
                    <div class="reviews-summary">
                        <div class="summary-rating">
                            <div class="summary-point">
                                <div class="point-rate">{{ ratingPoints }}</div>
                                <div class="point-max">/5</div>
                            </div>
                            <div class="rating-stars">
                                <div class="rating-star" 
                                    v-for="(rs,rx) in ratingStars" :key="rx"
                                >
                                    <div 
                                        class="rating-star-half"
                                        :class="{'selected': rs.rated > 0}"
                                    ><span class="star-odd material-icons">star</span></div>
                                    <div 
                                        class="rating-star-half"
                                        :class="{'selected': rs.rated > 1}"
                                    ><span class="star-even material-icons">star</span></div>
                                </div>
                            </div>
                            <div class="total-ratings">{{ reviewsList.length }} Ratings</div>
                            <div class="review-button" @click="clickReview">Write a review</div>
                        </div>
                        <div class="summary-charts">
                            <div class="chart-item" v-for="chart in reviewCharts" :key="chart.stars">
                                <div class="chart-stars">
                                    <span class="chart-star material-icons" 
                                        v-for="n in 5" :key="n"
                                        :class="{'fill': n <= chart.stars}"
                                    >star</span>
                                </div>
                                <div class="chart-bar">
                                    <div class="chart-bar-wrapper">
                                        <div class="chart-bar-fill" :style="{'width': chart.percentage + '%'}"></div>
                                    </div>
                                    <span class="chart-label">{{ chart.totalReviewed }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="reviews-list" v-if="reviewsList.length > 0">
                        <div class="btn-filter" @click="toggleFilter">
                            <span class="material-icons">swap_vert</span>
                            <span class="sort-label">Sort by:</span>
                            <span class="sort-by">{{ sortedByDisplay }}</span>
                        </div>
                        <div class="sort-list" v-if="showFilter">
                            <div class="sort-item" 
                                v-for="sort in sortedList" 
                                :key="sort.key"
                                @click="sortByClicked(sort)"
                            >
                                {{ sort.name }}
                            </div>
                        </div>
                        <div class="review-card" v-for="review in reviewsList" :key="review.id">
                            <div class="reviewer">
                                <div class="reviewer-icon material-icons">person</div>
                                <span class="reviewer-name">{{ review.customer.firstName }} {{ review.customer.lastName }}</span>
                            </div>
                            <div class="review-title-wrapper">
                                <div class="rating-stars">
                                    <span class="rating-star material-icons" 
                                        v-for="(star, ix) in review.stars" :key="ix"
                                    >
                                        <div 
                                            class="rating-star-half"
                                            :class="{'selected': star.rated > 0}"
                                        ><span class="star-odd material-icons">star</span></div>
                                        <div 
                                            class="rating-star-half"
                                            :class="{'selected': star.rated > 1}"
                                        ><span class="star-even material-icons">star</span></div>
                                    </span>
                                </div>
                                <div class="review-title">{{ review.title }}</div>
                            </div>
                            <div class="review-date">Reviewed on {{ review.createdDate }}</div>
                            <div class="review-attachments" v-if="review.image1 || review.image2 || review.image3">
                                <img v-if="review.image1" 
                                    :src="getImage(review.image1, true)" 
                                    :alt="review.image1"
                                    @click="zoomImage(review.image1)"
                                />
                                <img v-if="review.image2" 
                                    :src="getImage(review.image2, true)" 
                                    :alt="review.image2"
                                    @click="zoomImage(review.image2)"
                                />
                                <img v-if="review.image3" 
                                    :src="getImage(review.image3, true)" 
                                    :alt="review.image3"
                                    @click="zoomImage(review.image3)"
                                />
                            </div>
                            <div class="review-content" v-html="review.content"></div>
                        </div>
                    </div>
                </div>
            </div>

            <base-modal :show="writeReview">
                <template v-slot:header>
                    <div class="modal-header header-flex justify-between">
                        <h3>Create Review</h3>
                        <span class="close-btn material-icons-outlined" @click="closeReview()">close</span>
                    </div>
                </template>
                <template v-slot:body>
                    <div class="modal-body">
                        <div class="review-form">
                            <div class="review-field">
                                <div class="label">Overall rating</div>
                                <div class="input rating-stars">
                                    <div class="rating-star" 
                                        v-for="n in 5" 
                                        :key="n"
                                    >
                                        <div 
                                            class="rating-star-half"
                                            :class="{'selected': ((n * 2) -1) <= reviewFields.rating}"
                                            @click="reviewFields.rating = ((n * 2) -1)"
                                        ><span class="star-odd material-icons">star</span></div>
                                        <div 
                                            class="rating-star-half"
                                            :class="{'selected': (n * 2) <= reviewFields.rating}"
                                            @click="reviewFields.rating = n * 2"
                                        ><span class="star-even material-icons">star</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="review-field">
                                <div class="label">
                                    Add photo(s)<br/>
                                    <small class="sublabel">Reviews with images are more helpful than text alone.</small>
                                </div>
                                <div class="input images">
                                    <div class="input-file" v-if="allowMoreUpload">
                                        <span class="file-icon material-icons">add</span>
                                        <input ref="imageFile" type="file" accept="image/*" @change="uploadImage($event)"/>
                                    </div>
                                    <div class="input-file static" v-for="(img,ix) in reviewFields.images" :key="img.file">
                                        <span v-if="!img.loading" class="file-remove material-icons" @click="removeImage(ix)">close</span>
                                        <span v-if="img.loading" class="loading-text">Uploading...</span>
                                        <img v-else :src="getImage(img.file, true)" :alt="img.file">
                                    </div>
                                </div>
                            </div>
                            <div class="review-field">
                                <div class="label">Add a headline</div>
                                <div class="input">
                                    <input type="text" v-model="reviewFields.headline">
                                </div>
                            </div>
                            <div class="review-field">
                                <div class="label">Add written review</div>
                                <div class="input">
                                    <textarea v-model="reviewFields.content"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <div class="modal-footer">
                        <div class="review-actions">
                            <div class="review-action lite" @click="closeReview()">Cancel</div>
                            <div class="review-action" @click="submitReview">Submit</div>
                        </div>
                    </div>
                </template>
            </base-modal>

            <base-modal :show="clickedImage">
                <template v-slot:header>
                    <div class="modal-header header-flex justify-between">
                        <h3>&nbsp;</h3>
                        <span class="close-btn material-icons-outlined" @click="skipZoom()">close</span>
                    </div>
                </template>
                <template v-slot:body>
                    <div class="modal-body ratio-square">
                        <div v-if="clickedImage.loading">Loading...</div>
                        <img :src="clickedImage.url" :alt="clickedImage.url">
                    </div>
                </template>
            </base-modal>
		</template>
	</layout-variant-two>
</template>

<script>
import { eventService } from "@/bloc/services";
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import { getEunoiaCustomerDetails } from "@/connector/v4/customerConnector";
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
import moment from 'moment-timezone';
import EventBlock from './components/EventBlock.vue';
import ActivitiesCarousel from "./components/ActivitiesCarousel.vue";

export default {
	name: "EventDetails",
	mixins: [utility],
	components: {
        LayoutVariantTwo,
        EventBlock,
        ActivitiesCarousel
	},
	data() {
		return {
            loading: false,
            opened: false,
            category: "",
            eventName: null,
            eventId: null,
            timeId: null,
            eventDetails: null,
            showMore: false,
            eventsMore: [],
            sessionIndex: 0,
            loadingReview: false,
            reviewsList: [],
            reviewCharts: [],
            totalRatings: 0,
            ratingStars: [],
            ratingPoints: 0,
            writeReview: false,
            reviewFields: {
                rating: 0,
                images: [],
                headline: "",
                content: "",
            },
            uploadingImage: false,
            submittingReview: false,
            customer: null,
            sortBy: {
                recent: {
                    clicked: true,
                    selected: true,
                    name: "Recent",
                },
                highToLow: {
                    clicked: false,
                    selected: false,
                    name: "High to Low",
                },
                LowToHigh: {
                    clicked: false,
                    selected: false,
                    name: "Low to High",
                },
            },
            showFilter: false,
            clickedImage: null,
		};
	},
	watch: {},
    computed: {
        isHideRating(){
            return this.$store.getters.getHideRating == true;
        },
        eventBanner() {
            let image = this.$store.getters.getEventBanner;
            if(this.eventDetails?.banners.length > 0){
                let images = this.eventDetails.banners;
                images.sort((a,b) => a.sortIndex - b.sortIndex);
                image = images[0].image;
            }
            return image;
        },
        bannersList(){
            let images = [];
            if(this.eventDetails?.banners.length > 0){
                let data = this.eventDetails.banners;
                data.sort((a,b) => a.sortIndex - b.sortIndex);
                images = data.map((it) => it.image)
            }
            return images;
        },
        selectedSession() {
            if (isEmpty(this.eventDetails)) return;
            if (isEmpty(this.timeId)) return;
            let session = this.eventDetails.sessions?.find((it) => {
                return it.sessionTimeId == this.timeId;
            });
            session = {
                ...session, ...{
                    parent: this.eventDetails,
                    year: moment.tz(session.startDate, "Asia/Singapore").format('YYYY')
                }
            }

            return session;
        },
        allowMoreUpload() {
            return this.reviewFields.images.length < 3;
        },
        sortedByDisplay(){
            let theOne = null;
            for(var key in this.sortBy){
                if(this.sortBy[key].clicked) theOne = this.sortBy[key];
            }
            return theOne.name;
        },
        sortedList(){
            let items = [];
            for(var key in this.sortBy){
                let it = this.sortBy[key];
                it.key = key;
                items.push(it);
            }
            return items;
        },
        eventDesc() {
            let desc = this.eventDetails.description;
            if (!desc) return "";
            let arr = desc.split('\r\n');
            return arr.join("<br/>");
        },
        sessionDesc() {
            let desc = this.selectedSession.description;
            if (!desc) return "";
            let arr = desc.split('\r\n');
            return `<br/>${arr.join("<br/>")}`;
        },
        eventDate() {
            if (isEmpty(this.selectedSession)) return "";
            let a = this.selectedSession.startDate;
            let b = this.selectedSession.endDate;
            let from = moment.tz(a, 'Asia/Singapore').format('YYYYMMDD');
            let to = moment.tz(b, 'Asia/Singapore').format('YYYYMMDD');

            let fromY = moment.tz(a, 'Asia/Singapore').format('YYYY');
            let toY = moment.tz(b, 'Asia/Singapore').format('YYYY');

            let fromM = moment.tz(a, 'Asia/Singapore').format('MM');
            let toM = moment.tz(b, 'Asia/Singapore').format('MM');

            let fromD = moment.tz(a, 'Asia/Singapore').format('DD');
            let toD = moment.tz(b, 'Asia/Singapore').format('DD');

            if (from != to) {
                let dowA = moment.tz(a, 'Asia/Singapore').format('ddd');
                let dowB = moment.tz(b, 'Asia/Singapore').format('ddd');
                let dow = dowA;
                let dd = fromD;
                let mm = dd + " " + moment.tz(a, 'Asia/Singapore').format('MMM');
                if (fromD != toD) mm = `${dd} - ${toD} ${moment.tz(a, 'Asia/Singapore').format('MMM')}`;
                let yy = fromY;
                if (dowA != dowB) dow = `${dowA} - ${dowB}`;

                if (fromY != toY) yy = `${fromY} - ${toY}`;

                if (fromM != toM) {
                    mm = `${fromD} ${moment.tz(a, 'Asia/Singapore').format('MMM')} - ${toD} ${moment.tz(b, 'Asia/Singapore').format('MMM')}`;
                    if (fromY != toY) {
                        return `${moment.tz(a, 'Asia/Singapore').format('DD MMM YYYY')} - ${moment.tz(b, 'Asia/Singapore').format('DD MMM YYYY')}`;;
                    }
                    return `${mm} ${yy}`;
                }
                return `${dow}, ${mm} ${yy}`;
            }

            return moment.tz(a, 'Asia/Singapore').format("dddd, DD MMMM YYYY");
        },
    },
    methods: {
        goToExternalLink(){
            if(!this.isLoggedIn()) {
                return this.$router.push({
                    path: "/login",
                    query: {
                        // redirect: `/event/${this.selectedSession?.sessionTimeId}`,
                        externalLink: this.eventDetails.externalLink
                    },
                });
            }
            window.location.href = this.eventDetails.externalLink;
        },
        zoomImage(imageId) {
            let imgUrl = this.getImage(imageId);
            let img = new Image();
            this.clickedImage = { loading: true, url: null };
            img.onload = img.onerror = () => {
                this.clickedImage = { loading: false, url: imgUrl };
            }
            img.src = imgUrl;
        },
        skipZoom() {
            this.clickedImage = null;
        },
        toggleFilter() {
            this.showFilter = !this.showFilter;
        },
        sortByClicked(item) {
            for (var s in this.sortBy) {
                this.sortBy[s].clicked = false;
            }
            this.sortBy[item.key].clicked = true;
            this.toggleFilter();
            if (isEmpty(this.reviewsList)) return;
            this.reviewsList.sort((a, b) => {
                if (this.sortBy.recent.clicked) return b.id - a.id;
                if (this.sortBy.highToLow.clicked) return b.rating - a.rating;
                if (this.sortBy.LowToHigh.clicked) return a.rating - b.rating;
            });
        },
        closeReview() {
            if (this.uploadingImage) return;
            this.writeReview = false;
            this.reviewFields = {
                rating: 0,
                images: [],
                headline: "",
                content: "",
            }
        },
        removeImage(index) {
            this.reviewFields.images.splice(index, 1);
        },
        async submitReview() {
            if (this.uploadingImage) return;
            if (!this.reviewFields.headline) {
                return this.showNotification("alert", "error_outline", "Review title is required!");
            }
            if (!this.reviewFields.content) {
                return this.showNotification("alert", "error_outline", "Review content is required!");
            }
            if (!(this.reviewFields.rating > 0)) return this.showNotification("alert", "error_outline", "Rating is required!");
            let customer = this.$store.getters.getCustomer;
            let params = {
                title: this.reviewFields.headline,
                content: this.reviewFields.content,
                rating: this.reviewFields.rating,
                customerId: customer.eunoiaId
            }
            if (this.reviewFields.images.length > 0) {
                this.reviewFields.images.forEach((it, ix) => {
                    params[`image${ix + 1}`] = it.file
                });
            }
            this.submittingReview = true;
            let res = await eventService.submitEventReview(params, this.eventDetails.id);
            this.submittingReview = false;
            let message = "Thank you for your feedback!";
            if (!res.success) message = res.message || "Something went wrong! Unable to submit your rating & review.";
            this.showNotification(res.success ? "success" : "alert", "error_outline", message);
            this.closeReview();
        },
        async uploadImage(event) {
            if (!event.target.files) {
                return;
            }
            let image = event.target.files[0];
            this.$refs.imageFile.value = null;
            this.uploadingImage = true;
            this.reviewFields.images.push({
                loading: true,
                file: null,
            });
            let index = this.reviewFields.images.length - 1;
            let res = await eventService.uploadEventReviewImage(image);
            this.uploadingImage = false;
            this.reviewFields.images[index].loading = false;
            if (!res.success) {
                this.reviewFields.images.pop();
                return this.showNotification("alert", "error_outline", res.message || "Something went wrong! Unable to upload image");
            }
            this.reviewFields.images[index].file = res.imageId;
        },
        async clickReview() {
            if (!this.isLoggedIn()) {
                return this.$router.push({
                    path: '/login',
                    query: {
                        redirect: `/event/${this.$route.params.category}/${this.$route.params.eventId}`
                    }
                });
            }
            this.customer = this.$store.getters.getCustomer;
            let res = await getEunoiaCustomerDetails();
            if (res.success && !isEmpty(res.customer)) {
                this.customer.eunoiaId = res.customer.id;
            }
            this.writeReview = true;
        },
        async setReviewRatings() {
            if(this.isHideRating) return;
            let res = await this.retrieveReviewRatings(this.eventDetails.id);
            this.reviewsList = res.reviewsList;
            this.totalRatings = res.totalRatings;
            this.ratingPoints = res.ratingPoints;
            this.ratingStars = res.ratingStars;
            this.reviewCharts = res.reviewCharts;
        },
        async getEventDetails() {
            this.loadingReview = true;
            let json = await eventService.getEvents();
            this.loading = false;
            this.eventsMore = [];

            if (!isEmpty(json) && !isEmpty(json.events)) {
                let events = json.events.filter((it) => {
                    return it.status == "ACTIVE";
                });
                this.$store.dispatch("setEvents", events);
            }

            let events = this.$store.getters.getEvents;
            let parent = events.find((it) => {
                return it.sessions?.filter((s) => {
                    return s.sessionTimeId == this.timeId;
                }).length > 0;
            });
            if (isEmpty(parent)) return this.goTo('ErrorPage');
            this.eventId = parent.id;
            let momente = moment();
            let today = moment.tz(momente, "Asia/Singapore").format('x');
            let year = moment.tz(momente, "Asia/Singapore").format('YYYY');
            let hiddenEvents = this.$store.getters.getHiddenEvents || [];
            if (!isEmpty(parent.banners)) {
                parent.banners = parent.banners.map((it) => {
                    it.image = this.getImage(it.id);
                    return it;
                });
                parent.banners.sort((a, b) => { return a.sortIndex - b.sortIndex });
            }
            parent.moreEvents = [];
            let moreEvents = events.filter((it) => {
                let categories = it.categories.filter((c) => { return parent.categories.includes(c) });
                let y = moment.tz(it.startDate, "Asia/Singapore").format('YYYY');
                let timeIds = it.sessions.map((s) => { return s.sessionTimeId.toString() });
                if (hiddenEvents.includes(it.id)) return false;
                if (timeIds.includes(this.timeId.toString())) return false;
                return it.endDate > today && (categories.length > 0 || y == year);
            });
            if (!isEmpty(moreEvents)) {
                moreEvents.forEach((ev) => {
                    let sess = ev.sessions.map((s) => {
                        s.year = moment.tz(s.startDate, "Asia/Singapore").format('YYYY');
                        s.parent = ev;
                        return s;
                    });
                    parent.moreEvents = [...parent.moreEvents, ...sess];
                });
            }
            this.eventDetails = parent;
            this.showMore = false;
            if (!isEmpty(parent.description)) this.showMore = parent.description.length > 200;

            if(isEmpty(this.eventDetails)) {
                return this.goTo('ErrorPage');
            }
            this.setReviewRatings();
            setTimeout(() => {
                this.resizeImageHandler();
            }, 20);
        },
        getImage(image, small){
            if(!image) return "";
            let size = image;
            if(small) size = "c_fill,h_300,w_350/" + image;
            return this.$store.getters.cloudinaryURL + size;
        },
        goToBack(){
            this.$router.push({name: "EventsPage"});
        },
    },
	async created() {
		try {
			this.loading = true;
            window.addEventListener("resize", this.resizeImageHandler);
            document.addEventListener("mousedown", (event) => {
                let sorter = document.querySelector(".sort-list");
                if(sorter && sorter.contains(event.target)) return;
                if (this.showFilter) this.showFilter = false;
            });
            await this.refreshMainData(true);
            if(!isEmpty(this.$route.params)) {
                this.timeId = this.$route.params.timeId;
                return this.getEventDetails();
            }
			this.loading = false;
		} catch (error) {
			this.loading = false;
			this.showNotification("alert", "error_outline", error);
		}
	},
};
</script>

<style scoped lang="scss">
    .custom-blocks-section {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        padding-block: 24px;
        border-top: 1px solid $secondary-color-20;
        gap: 32px;
        .custom-block {
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;
        }
        .custom-block-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;
            flex: 1;
            text-align: left;
            .block-title {
                font-weight: bold;
                font-size: 22px;
            }
        }
        .custom-block-image {
            flex: 1;
            width: 100%;
            aspect-ratio: 4/3;
            overflow: hidden;
            border-radius: 24px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .faq-section {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        padding-block: 24px;
        border-top: 1px solid $secondary-color-20;
        .faq-head {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            margin-bottom: 16px;
        }
        .faq-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 24px;
            .faq-desc {
                flex: 1;
                display: block;
            }
            .faq-image {
                flex: 1;
                width: 100%;
                aspect-ratio: 4/3;
                overflow: hidden;
                border-radius: 24px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
    .book-now {
        text-decoration: none;
        flex: 1;
        padding-inline: 32px;
        padding-block: 12px;
        border-radius: 999px;
        background: $secondary-color-100;
        color: $white;
        border: 1px solid transparent;
        cursor: pointer;
        font-weight: bold;
        font-size: large;
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 32px;
        &:hover{
            filter: opacity(0.7);
        }
        &.lite {
            color: $secondary-color-100;
            background: $white;
            border-color: $secondary-color-100;
        }
    }
    .head-banner {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .head-banner-overlay {
            aspect-ratio: 16/9;
            img {
                width: 100%;
                height: 100%;
                aspect-ratio: 16/9;
                object-fit: cover;
            }
        }
        .back-btn {
            color: $secondary-color-100;
            cursor: pointer;
            font-size: 1em;
            display: flex;
            gap: 12px;
            position: absolute;
            left: 16px;
            top: 12px;
        }
        .head-content {
            width: 100%;
        }
    }
    .container {
        margin-top: 50px;
        width: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        margin-inline: auto;
        .event-img {
            width: 100%;
            margin-block: 32px;
            aspect-ratio: 4/3;
            background: $secondary-color-20;
            &.custom-carousel {
                background: transparent !important;
            }

            &.no-image {
                display: none;
            }

            img {
                width: 100%;
                height: inherit;
                object-fit: cover;
            }
        }
        .event-title {
            font-weight: bold;
            font-size: 1.4em;
            line-height: 1.4;
            text-align: left;
        }
        .event-date {
            font-size: 0.9em;
            color: $secondary-color-80;
            text-align: left;
        }
        .event-subtitle {
            font-size: 0.9em;
            color: $secondary-color-80;
            text-align: left;
            padding-top: 24px;
        }
        .event-about {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 16px;
            border-block: 1px solid $secondary-color-40;
            .about-title {
                font-weight: bold;
                font-size: 1.2em;
                width: 100%;
                padding-top: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .about-btn {
                    cursor: pointer;
                }
            }
            .about-desc {
                width: 100%;
                text-align: left;
                font-size: 0.9em;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.5s ease-in-out;
                -webkit-transition: max-height 0.5s ease-in-out;
            }
            &.opened {
                .about-desc {
                    max-height: 100000px;
                }
            }
        }
    }

    .event-label-more {
        text-align: left;
        padding-block: 24px;
        font-size: 1.2em;
        &.bold {
            font-weight: bold !important;
        }
    }

    .cards {
        display: flex;
        width: 100%;
        position: relative;
        gap: 32px;
        flex-direction: column;
    }

    .rating-reviews {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: flex-start;
		text-align: left;
		padding: 24px 0;
        margin-top: 24px;
		.reviews-headline {
			font-size: 1.2em;
			width: 100%;
            font-weight: bold;
            line-height: normal;
		}
        .reviews-summary {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding-top: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid $secondary-color-20;
            .summary-rating {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 16px;
                .summary-point {
                    display: flex;
                    .point-rate {
                        font-weight: 900;
                        font-size: 3em;
                    }
                    .point-max {
                        padding-top: 6px;
                        color: $secondary-color-50;
                        font-size: 2.5em;
                    }
                }
                .rating-stars {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    .rating-star {
                        width: 45px !important;
                        gap: 0 !important;
                        .star-odd {
                            font-size: 1.8em !important;
                        }
                        .star-even {
                            font-size: 1.8em !important;
                        }
                    }
                }
                .total-ratings {
                    color: $secondary-color-60;
                }
                .review-button {
                    padding: 12px 32px;
                    cursor: pointer;
                    background: $secondary-color-100;
                    color: $white;
                    width: fit-content;
                    font-weight: 900;
                    &:hover {
                        opacity: 0.7;
                    }
                }
            }
            .summary-charts {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 8px;
                .chart-item {
                    display: flex;
                    gap: 16px;
                    width: 100%;
                    align-items: center;
                    .chart-stars {
                        display: flex;
                        align-items: center;
                        .chart-star {
                            color: $secondary-color-20;
                            &.fill {
                                color: orange !important;
                            }
                        }
                    }
                    .chart-bar {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        gap: 12px;
                        .chart-bar-wrapper {
                            width: 85%;
                            height: 16px;
                            background: $secondary-color-20;
                            .chart-bar-fill {
                                height: 100%;
                                background: orange;
                            }
                        }
                        .chart-label {
                            text-align: right;
                        }
                    }
                }
            }
        }
        .reviews-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding-bottom: 24px;
            position: relative;

            .btn-filter {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 6px 12px;
                border-radius: 24px;
                border: 1px solid $secondary-color-20;
                width: fit-content;
                cursor: pointer;
                * {
                    white-space: nowrap;
                }
                .sort-by {
                    color: $secondary-color-50;
                }
            }
            .sort-list {
                position: absolute;
                left: 0;
                top: 32px;
                border: 1px solid $secondary-color-20;
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: $white;
                width: 120px;
                z-index: 1000;
                overflow: hidden;
                .sort-item {
                    background: $white;
                    width: 100%;
                    cursor: pointer;
                    padding: 16px;
                    & + .sort-item { padding-top: 0 !important;}
                    &:hover { opacity: 0.7;}
                }
            }
            .review-card {
                display: flex;
                flex-direction: column;
                gap: 10px;
                & + * {
                    padding-top: 16px;
                    border-top: 1px solid $secondary-color-20;
                }
                .reviewer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    .reviewer-icon {
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        background: $secondary-color-20;
                        color: $secondary-color-50;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
                .review-title-wrapper {
                    width: 100%;
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    .review-title {
                        font-weight: 900;
                    }
                }
                .review-date {
                    font-size: 0.9em;
                    color: $secondary-color-60;
                }
                .review-attachments {
                    width: calc(100% + 48px);
                    display: flex;
                    align-items: flex-start;
                    gap: 24px;
                    overflow: hidden;
                    overflow-x: auto;
                    padding: 24px;
                    transform: translateX(-24px);
                    -webkit-transform: translateX(-24px);
                    img {
                        width: 200px;
                        aspect-ratio: 3/4;
                        object-fit: contain;
                        border: 1px solid $secondary-color-20;
                        border-radius: 8px;
                        cursor: pointer;
                        &:hover { opacity: 0.7;}
                    }
                }
            }
        }
	}

    .justify-between {
        justify-content: space-between;
    }
    .close-btn { cursor: pointer;}
    .review-actions {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 24px;
        .review-action {
            padding: 8px 24px;
            cursor: pointer;
            background: $secondary-color-90;
            color: $white;
            border: 1px solid transparent;
            font-weight: 900;
            &.lite {
                border-color: $secondary-color-90;
                color: $secondary-color-90;
                background: transparent;
            }
        }
    }
    .review-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        .review-field {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 8px;
                text-align: left;
            .label {
                font-weight: 900;
            }
            .sublabel {
                color: $secondary-color-70;
                font-weight: normal !important;
            }
            .input {
                width: 100%;
                text-align: left;
                &.images {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }
                input:not([type="file"]) {
                    width: 100%;
                    border-radius: 8px;
                    padding: 6px;
                    border: 1px solid $secondary-color-20;
                    outline: none;
                    color: $secondary-color-60;

                    &:is([readonly]) {
                        background: $secondary-color-10;
                        cursor: not-allowed;
                    }

                    &:not([readonly]):focus {
                        border-color: $secondary-color-40;
                        color: $secondary-color-90;
                    }
                }
                &.rating-stars {
                    gap: 4px;
                }
                .rating-star {
                    cursor: pointer;
                    font-size: 1.7em !important;
                    width: 40px;
                    &:hover {
                        opacity: 0.6;
                    }
                    .rating-star-half {
                        .star-odd {
                            font-size: 1.5em !important;
                        }
                        .star-even {
                            font-size: 1.5em !important;
                        }
                    }
                }
                textarea {
                    border-radius: 8px;
                    height: 75px;
                    border: 1px solid $secondary-color-20;
                    padding: 6px;
                    outline: none;
                    width: 100%;
                    &:focus {
                        border: 1px solid $secondary-color-40;
                    }
                }
                .input-file {
                    width: 120px;
                    aspect-ratio: 1/1;
                    position: relative;
                    background: $secondary-color-10;
                    border-radius: 8px;
                    border: 1px dashed $secondary-color-60;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    &:not(.static) {
                        cursor: pointer;
                    }
                    &:hover {
                        opacity: 0.7;
                    }
                    .file-icon {
                        color: $secondary-color-50;
                        font-size: 2.5em !important;
                    }
                    .file-remove {
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        cursor: pointer;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                        background: $white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: $primary-color-50;
                        font-size: 0.9em;
                        border: 1px solid $primary-color-50;
                    }
                    .loading-text {
                        color: $secondary-color-50;
                        font-size: 0.8em;
                    }
                    input:is([type="file"]) {
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .rating-stars {
        display: flex;
        align-items: center;
    }
    .rating-star {
        color: $secondary-color-20;
        overflow: hidden;
        position: relative;
        display: flex;
        width: 25px;
        font-size: 1.5em;
        .rating-star-half {
            display: block;
            width: 50%;
            overflow: hidden;
            &.selected {
                color: orange !important;
            }
            .star-odd {
                transform: translateX(0%);
                -webkit-transform: translateX(0%);
            }
            .star-even {
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
            }
        }
        .rating-star-full {
            color: orange;
        }
    }
    .rating-legend {
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 16px 0;
        .rating-star-full {
            color:  $primary-color-100;
        }
        .rating-points {
            padding-top: 2px;
            font-size: 1.2em;
            font-weight: bold;
            color: $primary-color-100;
        }
        .rating-total-reviewers {
            color: $secondary-color-80;
            text-decoration: underline;
            padding: 0 6px;
        }
    }
    .ratio-square {
        width: 100%;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 !important;
        img {
            max-width: 100%;
            display: block;
            height: 100%;
            object-fit: contain;
        }
    }

    @media(min-width: 672px){
        .book-now {
            margin-bottom: 0px !important;
        }
        .custom-block {
            flex-direction: row !important;
        }
        .faq-content {
            flex-direction: row !important;
        }
        .cards {
            flex-direction: row !important;
            overflow-x: auto;
        }
        .head-banner {
            .head-banner-overlay {
                aspect-ratio: 3/1;
                min-height: 500px;
                img {
                    aspect-ratio: 3/1;
                }
            }
            .head-content {
                margin-inline: 7% !important;
                max-width: 300px;
                position: absolute;
                top: 90px;
            }
            .back-btn {
                left: 7% !important;
            }
        }
        .container {
            padding-inline: 7% !important;
            padding-top: 48px;
            gap: 24px;
            .event-img {
                &.custom-carousel {
                    border: 1px solid #ececec;
                }
            }
        }
        .event-content {
            padding: 0 !important;
        }
        .event-label-more {
            padding-bottom: 0px !important;
        }
    }
</style>