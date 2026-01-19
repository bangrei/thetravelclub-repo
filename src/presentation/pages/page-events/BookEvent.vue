<template>
	<layout-variant-two :show-loading-screen="loading">
        <template v-slot:header>
			<div class="slide-down">
				<base-nav-content :preventCheckout="!haveCurrentBooking"/>
			</div>
		</template>
		<template v-slot:body>
            <div class="back-btn" @click="goBack">
                <span class="material-icons">arrow_back</span>
                <span>Back</span>
            </div>
            <div class="container" v-if="!isEmpty(eventDetails)">
                <div class="event-content">
                    <div class="event-content-left">
                        <div class="event-header">
                            <span>Booking Summary</span>
                        </div>
                        <event-block displayOnly
                            :event="selectedDate" 
                            :selectedCategory="selectedDate.year">
                        </event-block>
                        <div class="event-buttons">
                            <span class="btn-min material-icons" @click="minus()">remove</span>
                            <span class="num">{{numPax}}</span>
                            <span class="btn-plus material-icons" @click="plus()">add</span>
                        </div>
                    </div>
                    <div class="event-content-right">
                        <div class="participants" v-if="!isEmpty(participants)">
                            <div class="participant__tabs">
                                <div class="participant__tab" 
                                    :class="{'active': i == participantIndex}"
                                    v-for="(p,i) in participants" 
                                    :key="i"
                                >
                                    <span @click="participantIndex = i">Participant {{ i + 1 }}</span>
                                    <span class="tab-remover" 
                                        v-if="participants.length > 1"
                                        @click="removeParticipant(i)"
                                    >&times;</span>
                                </div>
                            </div>
                            <div class="participant" 
                                :class="{'active': i == participantIndex}"
                                v-for="(p,i) in participants" 
                                :key="i"
                            >
                                <div class="participant__content">
                                    <div class="participant__form-input" :class="{'disabled': isParticipating && i == 0}">
                                        <div class="participant__label">
                                            <span>First Name</span>
                                            <span class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <input type="text" v-model="participants[i].participantFirstName">
                                        </div>
                                    </div>
                                    <div class="participant__form-input" :class="{'disabled': isParticipating && i == 0}">
                                        <div class="participant__label">
                                            <span>Last Name</span>
                                            <span class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <input type="text" v-model="participants[i].participantLastName">
                                        </div>
                                    </div>
                                    <div class="participant__form-input" :class="{'disabled': isParticipating && i == 0}">
                                        <div class="participant__label">
                                            <span>Email Address</span>
                                            <span class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <input type="email" v-model="participants[i].participantEmail">
                                        </div>
                                    </div>
                                    <div class="participant__form-input" :class="{'disabled': isParticipating && i == 0}">
                                        <div class="participant__label">
                                            <span>Phone</span>
                                            <span class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <input type="text" v-model="participants[i].participantPhone">
                                        </div>
                                    </div>
                                    <div class="participant__form-input" 
                                        :class="{'disabled': isParticipating && i == 0}"
                                        v-for="(ai, ix) in p.additionalInfo"
                                        :key="ai.id">
                                        <div class="participant__label">
                                            <span>{{ ai.name }}</span>
                                            <span v-if="ai.type == 'MANDATORY'" class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <div class="radio-list left-radio" v-if="ai.fieldType == 'OPTION' && ai.optionType == 'RADIO'">
                                                <div class="radio" v-for="(info, n) in ai.fieldValues" :key="info.id">
                                                    <input :name="'participant' + i + '_' + ai.id + '_radio'" type="radio" 
                                                        :checked="info.checked == true"
                                                        @click="radioAdditionalInfo(ix,n)"
                                                    >
                                                    <div class="radio-label" :class="{'inline': info.cost > 0}">
                                                        <span>{{ info.value }}</span>
                                                        <span class="checkbox-cost" 
                                                            :class="{'active': info.checked}"
                                                            v-if="info.cost > 0"
                                                        >+{{ currency(info.cost) }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="checkbox-wrapper" v-else-if="ai.fieldType == 'OPTION' && ai.optionType == 'CHECKBOX'">
                                                <div class="checkbox" v-for="(info, n) in ai.fieldValues" :key="info.id">
                                                    <input type="checkbox" :name="'participant' + i + '_' + ai.id + '_checkbox'"
                                                        :disabled="isCheckBoxDisabled(ix,n)"
                                                        :checked="info.checked == true"
                                                        @click="checkListAdditionalInfo(ix,n)"
                                                    >
                                                    <div class="checkbox-label" :class="{'inline': info.cost > 0}">
                                                        <span>{{ info.value }}</span>
                                                        <span class="checkbox-cost" 
                                                            :class="{'active': info.checked}"
                                                            v-if="info.cost > 0"
                                                        >+{{ currency(info.cost) }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <input v-else-if="ai.fieldType == 'TEXT'" v-model="participants[i].additionalInfo[ix].value" type="text">
                                            <input v-else-if="ai.fieldType == 'NUMERIC'" v-model="participants[i].additionalInfo[ix].value" @keypress="isNumber($event)" type="text">
                                        </div>
                                    </div>
                                    <h1 class="heading-5 center" v-if="eventDetails.isRequiredEmergencyContact">In case of Emergency:</h1>
                                    <div class="participant__form-input" v-if="eventDetails.isRequiredEmergencyContact">
                                        <div class="participant__label">
                                            <span>Emergency Contact Name</span>
                                            <span class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <input type="text" v-model="participants[i].emergencyContactName">
                                        </div>
                                    </div>
                                    <div class="participant__form-input" v-if="eventDetails.isRequiredEmergencyContact">
                                        <div class="participant__label">
                                            <span>Emergency Contact Number</span>
                                            <span class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <input type="text" v-model="participants[i].emergencyContactPhone" @keypress="isNumber($event)">
                                        </div>
                                    </div>
                                    <div class="participant__form-input" v-if="eventDetails.isRequiredEmergencyContact">
                                        <div class="participant__label">
                                            <span>Relation to Emergency Contact</span>
                                            <span class="required">*</span>
                                        </div>
                                        <div class="participant__input">
                                            <input type="text" v-model="participants[i].emergencyContactRelation">
                                        </div>
                                    </div>
                                    <!--
                                    <div class="checkbox-wrapper" v-if="i==0 && isLoggedIn()">
                                        <div class="checkbox">
                                            <input type="checkbox" v-model="isParticipating">
                                            <span class="checkbox-label" style="white-space:nowrap;">I am participating</span>
                                        </div>
                                    </div>
                                    -->
                                </div>
                            </div>
                        </div>
                        <div class="agreement" v-if="!isEmpty(participants)">
                            <div class="agreement__wrapper">
                                <h4>DATA PRIVACY ACT</h4>
                                <div class="agreement__content">
                                    <p class="justify">
                                        By submitting this form, I expressly give consent to Primer Resources Corp. (PRC), 
                                        and its affiliates under the Primer Group of Companies (referred collectively as PRIMER) 
                                        to collect, use, store or otherwise process my personal data to verify 
                                        and process my membership with the said company.{{ morePrivacy ? '' : '..' }}
                                    </p>
                                    <p class="justify" v-if="morePrivacy">
                                        I agree to the use of the said data for commercial or marketing purposes & for analytics. 
                                    </p>
                                    <p class="justify" v-if="morePrivacy">
                                        I understand that my information may be shared with its affiliates 
                                        and/or third party service providers for the purpose of delivering the items to my designated location. 
                                    </p>
                                    <p class="justify" v-if="morePrivacy">
                                        In this regard, PRC implements reasonable and appropriate security measures to maintain the confidentiality, 
                                        integrity and availability of your personal data.
                                    </p>
                                    <p v-if="morePrivacy">
                                        You may review the full PRC Privacy Policy posted in-store or online at 
                                        <a href="https://www.primergrp.com/primer-privacy-policy" class="link" target="_blank">https://www.primergrp.com/primer-privacy-policy</a>.
                                    </p>
                                    <span class="link red" @click="togglePrivacy">See {{ morePrivacy ? 'less' : 'more' }}</span>
                                </div>
                            </div>
                            <div class="checkbox-custom" @click="toggleAgree()">
                                <span class="checkbox-icon material-icons-outlined" :class="{'checked': dataPrivacyAgreement}">
                                    {{ dataPrivacyAgreement ? 'check_box' : 'check_box_outline_blank' }}
                                </span>
                                <span class="checkbox-label" style="white-space:nowrap;">
                                    I agree  to the <a :href="tncLink" target="_blank" class="link no-underlined">Terms and Conditions</a> 
                                    and <a :href="privacyPolicyLink" target="_blank" class="link no-underlined">Privacy Policy</a>
                                </span>
                            </div>
                        </div>
                        <!-- <widget-promo-code v-if="!isEmpty(participants)" @emit-promocode="emitPromoCode" /> -->
                        <br/>
                        <widget-voucher v-if="!isEmpty(participants)" 
                            :is-event="true" 
                            @select-voucher="showVouchers"
                            @on-apply-voucher="onApplyVoucher"/>
                        <br/>
                        <div class="event-summary">
                            <div class="event-summary__header">Summary</div>
                            <div class="event-summary__body">
                                <div class="event-summary-row">
                                    <span class="row-note">{{ numPax }}x {{eventDetails.name}}</span>
                                    <span class="row-note" v-if="selectedDate">{{ currency(selectedDate.price * numPax) }}</span>
                                </div>
                                <div class="event-extracharge-row" v-for="(extra, n) in groupedExtracharges" :key="n">
                                    <div class="extracharge-head">{{ extra.parentName }}</div>
                                    <div class="extracharge-body">
                                        <div class="extracharge-title">{{ extra.qty }}x {{ extra.value }}</div>
                                        <div class="extracharge-amount">{{ currency(extra.cost) }}</div>
                                    </div>
                                </div>
                                <div style="width:100%">
                                    <div class="event-summary-row" v-for="(disc, x) in discounts" :key="x">
                                        <div class="row-icon" @click="removeDiscount(disc)"><span class="material-icons-outlined">highlight_off</span></div>
                                        <div class="row-title custom-voucher">{{ disc.reason }} {{disc.percentage ? '(' + disc.percentage + '%)' : ''}}</div>
                                        <div class="row-title custom-voucher" style="white-space:nowrap;">-{{ currency(disc.amount) }}</div>
                                    </div>
                                </div>
                                <div class="event-summary-row">
                                    <div class="row-title">Total</div>
                                    <div class="row-title">{{ priceDisplay }}</div>
                                </div>
                            </div>
                            <div class="event-summary__footer" v-if="numPax > 0">
                                <div class="actions" v-if="!bookNum">
                                    <div class="action-button" @click="confirmBooking()">Book Now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</template>
	</layout-variant-two>
</template>

<script>
import { eventService } from "@/bloc/services";
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
// import WidgetPromoCode from "@/components/widgets/WidgetPromoCode.vue";
import WidgetVoucher from "@/components/widgets/WidgetVoucher.vue";
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
import EventBlock from './components/EventBlock.vue';

export default {
	name: "BookEvent",
	mixins: [utility],
	components: {
        LayoutVariantTwo,
        WidgetVoucher,
        // WidgetPromoCode,
        EventBlock,
	},
	data() {
		return {
			loading: false,
            sessionId: null,
            eventId: null,
            eventDetails: null,
            numPax: 0,
            selectedDate: null,
            showSummary: false,
            bookNum: null,
            participants: [],
            participantIndex: 0,
            isParticipating: false,
            dataPrivacyAgreement: false,
            morePrivacy: false,
            promoCode: "",
            isApplyingPromo: false,
            discounts: [],
            extraCharges: [],
            isDesktop: true,
            totalAmount: 0,
		};
	},
	watch: {
        selectedDate(val){
            if(isEmpty(val)) return;
            this.eventDetails.maxCapacity = val.maxSpot;
            this.eventDetails.max = val.maxSpot;
            this.eventDetails.min = 1;
            if(this.eventDetails.maxCapacity < this.eventDetails.min){
                if(this.eventDetails.maxCapacity > 0) this.eventDetails.min = this.eventDetails.maxCapacity
            }
            if(this.eventDetails.maxCapacity < this.eventDetails.max){
                if(this.eventDetails.maxCapacity > 0) this.eventDetails.max = this.eventDetails.maxCapacity
            }
            this.numPax = 0;
            this.participants = [];
            this.isParticipating = false;
            this.totalAmount = 0;
            this.discounts = [];
            this.extraCharges = [];
            /*
            if(this.numPax > this.remainingSales) this.numPax = this.eventDetails.min;
            if(this.numPax == 0) this.numPax = this.eventDetails.min;
            if(this.eventDetails.maxCapacity <= 0) this.numPax = 0;
            */
        },
        isParticipating(val){
            if(isEmpty(this.participants)) return;
            let customer = this.$store.getters.getCustomer;
            if(isEmpty(customer)) return;
            this.participants[0] = {
                participantEmail: val ? customer.email : "",
                participantPhone: val ? customer.phone : "",
                participantFirstName: val ? customer.firstName : "",
                participantLastName: val ? customer.lastName : ""
            }
        }
    },
    computed: {
        eventPrice() {
            if (isEmpty(this.eventDetails)) return 0;
            return this.eventDetails.selectedSession.price;
        },
        haveCurrentBooking() {
            return !isEmpty(this.$store.getters.getBooking);
        },
        priceDisplay(){
            return this.currency(this.totalAmount);
        },
        remainingSales(){
            if(isEmpty(this.selectedDate)) return 0;
            return parseFloat(this.selectedDate.spotLeft) - this.numPax;
        },
        tncLink(){
            let r = this.$router.resolve({ name: "TermsOfUse" });
			return r.path;
        },
        privacyPolicyLink(){
            let r = this.$router.resolve({ name: "PrivacyPolicy" });
			return r.path;
        },
        groupedExtracharges() {
            let extras = [];
            if (isEmpty(this.extraCharges)) return [];
            this.extraCharges.forEach((it) => {
                let item = {
                    parentName: it.parent.name,
                    value: it.value,
                    qty: 1,
                    cost: it.cost,
                }
                let idx = extras.findIndex((x) => {
                    return x.parentName == item.parentName && x.value == item.value;
                });
                if (idx > -1) {
                    extras[idx].qty++;
                    extras[idx].cost += item.cost;
                } else {
                    extras.push(item);
                }
            });
            return extras;
        }
    },
    methods: {
        removeParticipant(index) {
            if (this.participants.length <= 1) return;
            this.minus(index);
        },
        setTotalAmount() {
            if (isEmpty(this.selectedDate)) {
                this.totalAmount = 0;
                this.discounts = [];
                this.extraCharges = [];
                return;
            }
            let price = this.numPax * parseFloat(this.selectedDate.price);
            let disc = 0;
            if(!isEmpty(this.discounts)){
                this.discounts.forEach((it) => { disc += it.amount })
            }
            if(!isEmpty(this.extraCharges)){
                this.extraCharges.forEach((it) => { price += it.cost });
            }
            this.totalAmount = price - disc;
        },
        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                evt.preventDefault();
                return;
            }
            return true;
        },
        radioAdditionalInfo(ix, n) {
            let i = this.participantIndex;
            let info = this.participants[i].additionalInfo[ix].fieldValues[n];
            this.participants[i].additionalInfo[ix].fieldValues.forEach((it) => {
                it.checked = false;
                if (this.extraCharges && this.extraCharges.findIndex((ex) => { return ex.id == it.id && ex.participantIndex == i }) >= 0) {
                    this.extraCharges.splice(this.extraCharges.findIndex((ex) => { return ex.id == it.id && ex.participantIndex == i }), 1);
                }
            });
            setTimeout(() => {
                this.participants[i].additionalInfo[ix].fieldValues[n].checked = true;
                this.participants[i].additionalInfo[ix].value = info.value;
                let pExtra = this.extraCharges.find((ex) => { return ex.id == info.id && ex.participantIndex == i });
                if (Math.abs(info.cost) > 0 && !pExtra) {
                    let extra = this.participants[i].additionalInfo[ix].fieldValues[n];
                    extra.parent = this.participants[i].additionalInfo[ix];
                    extra.participantIndex = i;
                    this.extraCharges.push(extra);
                }
                this.setTotalAmount();
            }, 150);
        },
        isCheckBoxDisabled(ix, n){
            let i = this.participantIndex;
            let info = this.participants[i].additionalInfo[ix].fieldValues[n];
            let selectedValues = this.participants[i].additionalInfo[ix].fieldValues.filter((it) => {
                return it.checked;
            }).map((it) => { return it.id });
            return selectedValues.indexOf(info.id) == -1 && selectedValues.length >= this.participants[i].additionalInfo[ix].maxOptions;
        },
        checkListAdditionalInfo(ix, n){
            let i = this.participantIndex;
            this.participants[i].additionalInfo[ix].fieldValues[n].checked = !this.participants[i].additionalInfo[ix].fieldValues[n].checked;
            let isChecked = this.participants[i].additionalInfo[ix].fieldValues[n].checked == true;
            let info = this.participants[i].additionalInfo[ix].fieldValues[n];
            let convertValues = () => {
                let values = this.participants[i].additionalInfo[ix].fieldValues.filter((it) => {
                    return it.checked == true;
                }).map((it) => { return it.value });
                this.participants[i].additionalInfo[ix].value = values.join(',');
                this.setTotalAmount();
            }
            if (!isChecked) {
                let infoIndex = this.extraCharges.findIndex(ex => ex.id == info.id && ex.participantIndex == i);
                if (this.extraCharges && infoIndex >= 0) {
                    this.extraCharges.splice(infoIndex, 1);
                }
            } else {
                if (info && Math.abs(info.cost) > 0 && !this.extraCharges.find(ex => ex.id == info.id && ex.participantIndex == i)) {
                    info.checked = true;
                    info.parent = this.participants[i].additionalInfo[ix];
                    info.participantIndex = i;
                    this.extraCharges.push(info);
                }
            }
            convertValues();
        },
        setFields(){
            let emergency = {
                emergencyContactName: "",
                emergencyContactPhone: "",
                emergencyContactRelation: "",
            }
            let fields = {
                participantEmail: "",
                participantPhone: "",
                participantFirstName: "",
                participantLastName: "",
                additionalInfo: []
            }
            if(!isEmpty(this.eventDetails.customFields)){
                this.eventDetails.customFields.sort((a,b) => { return a.sortIndex - b.sortIndex }).forEach((it) => {
                    let one = {value: ""}
                    let item = {...it, ...one};
                    if(item.fieldValues) {
                        item.fieldValues = item.fieldValues.map((v) => {
                            return {...v, ...{ checked: false } }
                        })
                        item.fieldValues.sort((a,b) => { return a.id - b.id });
                    }
                    fields.additionalInfo.push(item);
                });
            }
            if(this.eventDetails.isRequiredEmergencyContact) fields = {...fields, ...emergency}
            return fields;
        },
        minus(index) {
            if (isEmpty(this.selectedDate)) return this.showNotification("alert", "error_outline", "Please select a session!");
            if (this.numPax <= this.eventDetails.min) return this.showNotification("warning", "error_outline", "Minimum of " + this.eventDetails.min + " pax is required!");
            this.numPax--;
            if (!isEmpty(this.participants)) {
                let idx = this.participants.length - 1;
                if (index != null) idx = index;
                this.participants.splice(idx, 1);
                if (this.participantIndex == idx) {
                    this.participantIndex = 0;
                }
                if (!isEmpty(this.extraCharges)) {
                    let ex = this.extraCharges.findIndex((e) => { return e.participantIndex == idx });
                    if (ex >= 0) this.extraCharges.splice(ex, 1);
                }
            }
            this.setTotalAmount();
        },
        plus(){
            if(isEmpty(this.selectedDate)) return this.showNotification("alert", "error_outline", "Please select a session!");
            if(this.remainingSales == 0) return this.showNotification("alert", "error_outline", "Remaining 0 ticket!");
            if(this.numPax >= this.eventDetails.max) return this.showNotification("warning", "error_outline", "Maximum of " + this.eventDetails.max + " pax is required!");
            this.numPax++;
            let fields = this.setFields();
            this.participants.push(fields);
            this.participantIndex = this.participants.length - 1;
            this.setTotalAmount();
        },
        async getEventDetails() {
            let json = await eventService.getEvents();
            this.loading = false;
            if(!isEmpty(json) && !isEmpty(json.events)){
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
            if (isEmpty(parent)) return;
            this.eventId = parent.id;
            if (isEmpty(parent.sessions)) return;

            let selectedSession = parent.sessions.find((sess) => {
                return sess.sessionTimeId == this.timeId;
            });
            if (isEmpty(selectedSession)) {
                return;
            }
            this.sessionId = selectedSession.sessionId;
            selectedSession = {
                ...selectedSession, ...{
                    parent: parent
                }
            }
            parent.selectedSession = selectedSession;
            this.eventDetails = parent;
            this.selectDate(selectedSession);
            let preSelectSession = this.$store.getters.getBookingEventSession;
            if (!isEmpty(preSelectSession)) {
                this.$store.dispatch("setBookingEventSession", null);
                this.sessionId = preSelectSession.sessionId;
                let sessionTimeId = preSelectSession.sessionTimeId;
                let ss = parent.sessions.find((x) => { return x.filter((it) => { return it.sessionTimeId == sessionTimeId }).length > 0 });
                if (!isEmpty(ss)) {
                    this.selectDate(ss);
                }
            }
            setTimeout(() => {
                this.plus();
            }, 200);
            let currentBooking = this.$store.getters.getBooking;
            if(!isEmpty(currentBooking)){
                currentBooking = currentBooking[0];
                this.selectedDate = currentBooking.selectedSession;
                
                setTimeout(() => {
                    this.discounts = currentBooking.discounts;
                    this.extraCharges = currentBooking.extraCharges;
                    this.promoCode = currentBooking.promoCode;
                    this.numPax = currentBooking.quantity;
                    this.participants = currentBooking.participantsDetails;
                    this.participantIndex = this.participants.length - this.participants.length;
                    this.dataPrivacyAgreement = true;
                    this.setTotalAmount();
                }, 500);
            }
        },
        selectDate(d){
            if(!d) return;
            if(!isEmpty(this.selectedDate)){
                if(this.selectedDate.sessionTimeId == d.sessionTimeId) return;
            }
            this.selectedDate = d;
            this.setTotalAmount();
        },
        isSelectedSession(d){
            if(isEmpty(this.selectedDate)) return false;
            return d.sessionTimeId == this.selectedDate.sessionTimeId;
        },
        toggleSummary(){
            this.showSummary = !this.showSummary;
        },
        async emitPromoCode(currentPromocode, promoCodes, callbackEmit) {
            let self = this;
            if (self.eventPrice <= 0 && self.totalAmount <= 0) {
                return self.showNotification("alert", "error_outline", "Unable to apply promo code for free events!");
            }
            self.promoCode = currentPromocode;
            self.resetOrderRequest();
            self.isApplyingPromo = true;
            await self.validateBooking((res) => {
                callbackEmit();
                if (res.success) return self.executePromo();
                promoCodes = promoCodes.filter((code) => { return code !== self.promoCode });
                self.$store.dispatch("setPromoCodes", promoCodes);
                self.showNotification("alert", "error_outline", res.message);
            });
        },
        onApplyVoucher(callback) {
            let self = this;
            let booking = self.generateBooking();
            self.$store.dispatch("clearBooking");
            self.$store.dispatch("addToBooking", booking);
            return self.checkoutEvent({
                booking: booking
            }, true, (res) => {
                callback(res);
                if (!res.success) {
                    let msg = res.message || "Something went wrong!";
                    return self.showNotification("alert", "error_outline", msg);
                }
                if (!isEmpty(res.order)) {
                    self.discounts = res.order.discounts;
                    self.totalAmount = res.order.total;
                }
                booking = self.generateBooking();
                self.$store.dispatch("clearBooking");
                self.$store.dispatch("addToBooking", booking);
            });
        },
        generateBooking(){
            this.resetOrderRequest();
            let customer = this.$store.getters.getCustomer;
            if(this.isGuestCustomer()){
                customer = {
                    firstName: this.participants[0].participantFirstName,
                    lastName: this.participants[0].participantLastName,
                    email: this.participants[0].participantEmail,
                    phone: this.participants[0].participantPhone,
                }
            }
            if(!customer.lastName) customer.lastName = "null";

            let booking = {
                type: "TICKET",
                name: this.eventDetails.name,
                eventId: this.eventId,
                sessionId: this.sessionId,
                sessionTimeId: this.selectedDate.sessionTimeId,
                customer: customer,
                details: this.eventDetails,
                selectedSession: this.selectedDate,
                quantity: this.numPax,
                price: parseFloat(this.selectedDate.price),
                total: this.totalAmount,
                discounts: this.discounts,
                extraCharges: this.extraCharges,
                promoCode: this.promoCode,
                participantsDetails: this.participants,
                promoCodes: this.$store.getters.getPromoCodes || []
            }
            booking.participants = booking.participantsDetails.map((p, ix) => {
                let pExtra = 0;
                if (!isEmpty(this.extraCharges)) {
                    let dExtras = this.extraCharges.filter((it) => { return it.participantIndex == ix });
                    if (!isEmpty(dExtras)) {
                        pExtra = dExtras.map(x => x.cost).reduce((prev, next) => prev + next);
                    }
                }
                let part = {
                    participantFirstName: p.participantFirstName,
                    participantLastName: p.participantLastName,
                    participantEmail: p.participantEmail,
                    participantPhone: p.participantPhone,
                    additionalInfo: p.additionalInfo.map((info) => {
                        return `${info.name}: ${info.value}`
                    }),
                    addOnAmount: pExtra,
                }
                if(this.eventDetails.isRequiredEmergencyContact){
                    let emergency = {
                        emergencyContactName: p.emergencyContactName,
                        emergencyContactPhone: p.emergencyContactPhone,
                        emergencyContactRelation: p.emergencyContactRelation,
                    }
                    part = {...part, ...emergency}
                }
                return part;
            });
            return booking;
        },
        resetOrderRequest(){
            let self = this;
            let order = self.$store.getters.getOrderRequest;
            if(!isEmpty(order)){
                if(!isEmpty(order.promoCodes)) {
                    let promoCodes = self.$store.getters.getPromoCodes;
                    promoCodes = promoCodes.filter((code) => { return order.promoCodes.indexOf(code) == -1 && code != self.promoCode });
                    self.$store.dispatch("setPromoCodes", promoCodes);
                }
                self.$store.dispatch("setOrderRequest", {});
                self.$store.dispatch("setCarts", []);
            }
        },
        gotoLoginPage() {
            let routeParams = this.$route.params;
            return this.$router.push({
                path: '/login',
                query: {
                    redirect: `/BookEvent/${routeParams.eventId}/${routeParams.sessionId}/${routeParams.timeId}`
                }
            });
        },
        async bookNow() {
            let accounts = this.getPaymentAccounts();
            let paymentTypes = accounts.filter((pm) => {
                return this.$store.getters.getAllowedPaymentTypes.includes(pm.type);
            });
            if(isEmpty(paymentTypes) && this.totalAmount > 0) return this.showNotification("alert", "error_outline", "Payment method is unavailable!");

            let booking = this.generateBooking();

            this.$store.dispatch("clearBooking");
            this.$store.dispatch("addToBooking", booking);
            if (!this.isLoggedIn()) {
                this.gotoLoginPage()
            }
            let self = this;
            this.checkoutEvent({
                booking: booking
            }, true, (res) => {
                if (!res.success) {
                    let msg = res.message || "Something went wrong!";
                    return self.showNotification("alert", "error_outline", msg);
                }
                if(!isEmpty(res.order)){
                    self.discounts = res.order.discounts;
                    self.totalAmount = res.order.total;
                }
                booking = self.generateBooking();
                self.$store.dispatch("clearBooking");
                self.$store.dispatch("addToBooking", booking);
                self.$router.push({name: "CheckoutPage"});
            });
        },
        async showVouchers(callback) {
            if (this.eventPrice <= 0 && this.totalAmount <= 0) {
                return this.showNotification("alert", "error_outline", "Unable to apply voucher for free events!");
            }
            if (!this.isLoggedIn()) {
                this.gotoLoginPage();
            }
            await this.validateBooking((res) => {
                if (!res.success) return this.showNotification("alert", "error_outline", res.message);
                callback();
            });
        },
        validateBooking() {
            let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () { };
            let res = {success: true};
            if(isEmpty(this.selectedDate)) {
                return callback({success: false, message: "Please select date & time!"});
            }
            if(this.eventDetails.maxCapacity == 0) {
                return callback({success: false, message: "Ticket sold out!"});
            }
            if(this.numPax == 0 || this.numPax < this.eventDetails.min) {
                return callback({success: false, message: "Minimum of " + this.eventDetails.min + " pax is required!"});
            }

            let foundInvalid = [];
			this.participants.forEach((p, i) => {
				let no = i + 1;
				if(isEmpty(p.participantFirstName)) {
                    foundInvalid.push({index: i, message:`First name of participant ${no} is required!`});
                }
                if(isEmpty(p.participantLastName)) {
                    foundInvalid.push({index: i, message:`Last name of participant ${no} is required!`});
                }
				if(!this.isValidEmail(p.participantEmail)) {
                    foundInvalid.push({index: i, message:`Please input a valid email address of participant ${no} ${p.participantEmail}`});
                }
				if(!this.isValidPhone(p.participantPhone)) {
                    foundInvalid.push({index: i, message:`Please input a valid phone number of participant ${no} ${p.participantPhone}`});
                }
                let invalidInfo = p.additionalInfo.filter((info) => {
                    let value = info.value.toString();
                    if (info.type == "MANDATORY" && info.fieldType == "OPTION") {
                        if (info.optionType == "CHECKBOX" || info.optionType == "RADIO") {
                            let valuesLength = info.fieldValues.filter(it => it.checked).length;
                            if (valuesLength < info.minOptions) return true;
                            if (valuesLength > info.maxOptions) return true;
                        }
                    }
                    return info.type == "MANDATORY" && value == "";
                });
                if (!isEmpty(invalidInfo)) {
                    let msg = `${invalidInfo[0].name} of participant ${no}`;
                    if (invalidInfo.type == "MANDATORY" && invalidInfo.fieldType == "OPTION") {
                        if (invalidInfo.optionType == "CHECKBOX" || invalidInfo.optionType == "RADIO") {
                            let valuesLength = invalidInfo.fieldValues.filter(it => it.checked).length;
                            if (valuesLength < invalidInfo.minOptions) {
                                msg = `${msg} min. of ${invalidInfo.minOptions} selection`;
                            }
                            if (valuesLength > invalidInfo.maxOptions) {
                                msg = `${msg}: max. of ${invalidInfo.minOptions} selection`;
                            }
                        }
                    }
                    foundInvalid.push({index: i, message: `${msg} is required!`});
                }
                if(this.eventDetails.isRequiredEmergencyContact){
                    if(isEmpty(p.emergencyContactName)) {
                        foundInvalid.push({index: i, message:`Emergency contact name of participant ${no} is required!`});
                    }
                    if(isEmpty(p.emergencyContactPhone)) {
                        foundInvalid.push({index: i, message:`Emergency contact number of participant ${no} is required!`});
                    }
                    if(!this.isValidPhone(p.emergencyContactPhone)) {
                        foundInvalid.push({index: i, message:`Please input a valid emergency contact number of participant ${no}`});
                    }
                    if(isEmpty(p.emergencyContactRelation)) {
                        foundInvalid.push({index: i, message:`Relation to emergency contact of participant ${no} is required!`});
                    }
                }
			});
			if(!isEmpty(foundInvalid)) {
                this.participantIndex = foundInvalid[0].index;
                return callback({success: false, message: foundInvalid[0].message});
            }
            if(!this.dataPrivacyAgreement) {
                return callback({success: false, message: "Please check Terms and Conditions and Privacy Policy!"});
            }
            return callback(res);
        },
        async confirmBooking(){
            if(this.bookNum) return;
            if(this.isApplyingPromo) return;
            this.validateBooking((res) => {
                if(res.success) return this.bookNow();
                this.showNotification("alert", "error_outline", res.message);
            });
        },
        toggleAgree(){
            this.dataPrivacyAgreement = !this.dataPrivacyAgreement;
        },
        togglePrivacy(){
            this.morePrivacy = !this.morePrivacy;
        },
        removeDiscount(disc){
            if (isEmpty(disc)) return;
            if (disc.voucher) return this.removeVoucher(disc);
            let reason = disc.reason.split(' ');
            let code = !isEmpty(reason) ? reason[reason.length - 1] : "";
            let promoCodes = this.$store.getters.getPromoCodes;
            promoCodes = promoCodes.filter((it) => { return it != code });
            this.$store.dispatch("setPromoCodes", promoCodes);

            this.executePromo();
        },
        removeVoucher(disc) {
            let voucher = this.$store.getters.getAppliedVouchers.find((it) => { return it.id == disc.voucher });
            if (!voucher) voucher = this.$store.getters.getAppliedCashVouchers.find((it) => { return it.id == disc.voucher });
            if (!voucher) return;

            voucher.isCashVoucher = voucher.promotion.publishType ? false : true;
            
            if (voucher.isCashVoucher) {
                this.$store.dispatch('removeAppliedCashVoucher', voucher.id);
            } else {
                this.$store.dispatch('removeAppliedVoucher', voucher.id);
            }
            let self = this;
            let booking = self.generateBooking();
            this.checkoutEvent({
                booking: booking
            }, true, (res) => {
                if (res.success) {
                    self.discounts = res.order.discounts;
                    self.totalAmount = res.order.total;
                    
                    booking = self.generateBooking();
                    self.$store.dispatch("clearBooking");
                    self.$store.dispatch("addToBooking", booking);
                    if(!self.isDesktop) self.showSummary = true;
                    self.showNotification("success", "error_outline", `Voucher has been removed!`);
                    return;
                }
                if (voucher.isCashVoucher) {
                    self.$store.dispatch('addAppliedCashVouchers', voucher);
                } else {
                    self.$store.dispatch('addAppliedCashVouchers', voucher);
                }
                if (res.promoCodes) {
                    res.message = res.promoCodes.map((prm) => {
                        return `${prm.message} : ${prm.code}`;
                    }).join('. ');
                }
                self.showNotification("alert", "error_outline", `Something went wrong! ${res.message}`);
            });
        },
        executePromo(){
            let self = this;
            if (!this.isLoggedIn()) {
                let promoCodes = self.$store.getters.getPromoCodes;
                let xpromoCodes = promoCodes.filter((code) => { return code != self.promoCode });
                self.$store.dispatch("setPromoCodes", xpromoCodes);
                this.gotoLoginPage();
            }
            let booking = this.generateBooking();
            let request = {
                booking: booking
            }
            this.checkoutEvent(request, true, (res) => {
                self.isApplyingPromo = false;
                let promoCodes = self.$store.getters.getPromoCodes;
                if(!res.success) {
                    let xpromoCodes = promoCodes.filter((code) => { return code != self.promoCode });
                    self.$store.dispatch("setPromoCodes", xpromoCodes);
                    return self.showNotification("alert", "error_outline", `Something went wrong! ${res.message}`);
                }
                if(!isEmpty(res.order)){
                    self.discounts = res.order.discounts;
                    self.totalAmount = res.order.total;
                }
                booking = self.generateBooking();
                self.$store.dispatch("clearBooking");
                self.$store.dispatch("addToBooking", booking);
                if(!self.isDesktop) self.showSummary = true;
            });
        }
    },
	async created() {
		try {
            let self = this;
            this.isDesktop = window.innerWidth >= 672;
			this.loading = true;
            await this.refreshMainData(true);
            if (!isEmpty(this.$route.params)) {
                this.timeId = this.$route.params.timeId;
                return this.getEventDetails();
            }
			this.loading = false;
            window.addEventListener("resize",  () => {
                self.isDesktop = window.innerWidth >= 672;
                if(self.isDesktop) self.showSummary = true;
            });
		} catch (error) {
			this.loading = false;
			this.showNotification("alert", "error_outline", error);
		}
	},
};
</script>

<style scoped lang="scss">
    .header-con {
        padding: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $secondary-color-20;
        background: $white;
        color: $primary-color-60;

        .more {
            color: $primary-color-60;
            cursor: pointer;
            font-size: 1.2em;
        }

        h1 {
            flex: 3;
            color: $secondary-color-90;
            font-size: 1.2em;
        }
    }
    .back-btn {
        color: $secondary-color-100;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 1em;
        width: fit-content;
        padding: 24px;
        gap: 12px;
    }
    .container {
        width: 100%;
        height: 100%;
        padding: 0 24px;
        display: flex;
        flex-direction: column;
        text-align: left;

        .event-header {
            padding: 32px 0;
            padding-top: 0;
            font-weight: bold;
            font-size: 1.4em;
            display: flex;
            gap: 24px;
            color: $secondary-color-90;
            align-items: center;
            justify-content: center;
        }

        .event-content {
            padding: 24px 0;
            width: 100%;
            flex: 3;

            .event-title {
                font-weight: bold;
                font-size: 28px;
                line-height: 1.4;
                font-family: 'Akzidenz Grotesk Super';

                & + * {
                    margin-top: 30px;
                }

                & + .event-note {
                    margin-top: 12px;

                    & + * {
                        margin-top: 30px;
                    }
                }
            }

            .sess-name {
                font-weight: bold;
                color: $primary-color-100;
                margin-top: 24px;
                display: block;
            }

            .event-label {
                font-weight: bold;
                font-size: 1em;

                & + .event-label {
                    margin-top: 30px;
                }
                & + .event-note {
                    margin-top: 10px;
                }
            }

            .event-note {
                font-size: 1em;

                &.btn {
                    cursor: pointer;
                }

                .see-more {
                    margin-top: 4px;
                    color: $primary-color-100;
                    cursor: pointer;
                }
            }

            .event-footnote {
                font-size: 0.8em;
                color: $secondary-color-50;

                & + .footnote {
                    margin-top: 8px;
                }
            }

            .blue {
                color: #91A7FF !important;
            }

            .event-buttons {
                width: fit-content;
                margin: 24px auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: $primary-color-10;
                border-radius: 12px;
                padding: 4px 12px;
                cursor: pointer;
                gap: 24px;

                .btn-min {
                    color: $secondary-color-70;
                }
                .num {
                    font-weight: bold;
                }
                .btn-plus {
                    color: $primary-color-100;
                }
            }
        }

        .event-block {
            flex: 1;
            width: 100%;
            color: $secondary-color-90;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 24px;
            background: $secondary-color-10;
            margin-bottom: 32px;

            .block-title {
                font-size: 1.4em;
                font-weight: 700;
                width: 100%;
                color: $secondary-color-90;
                text-align: left;
            }
            .block-inline {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                min-height: 16px;
                .inline-icon {
                    font-size: 1em !important;
                    color: $secondary-color-70;
                    margin-top: 3px;
                }
                .inline-text {
                    font-size: 1em;
                    color: $secondary-color-70;
                    text-align: left;
                    display: block;
                    overflow: hidden;
                    white-space: break-spaces;
                    max-height: 78px;
                }
            }
            .block-note {
                font-size: 10pt;
                line-height: 16px;
                color: $secondary-color-60;
                text-align: left;
                white-space: break-spaces;
                max-height: 32px;
                display: block;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .block-price {
                font-weight: bold;
                display: block;
                width: 100%;
                padding: 10px 0;
                color: $secondary-color-90;
                font-size: 1.2em;
                text-align: left;
            }
        }

        .actions {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 12px 0;
            gap: 24px;

            .action-button {
                flex: 1;
                border-radius: 12px;
                background: $secondary-color-100;
                border: 1px solid $secondary-color-100;
                padding: 12px;
                color: $white;
                font-weight: bold;
                text-align: center;
                cursor: pointer;

                &.light {
                    border: 1px solid $secondary-color-100;
                    background: $white;
                    color: $secondary-color-100;
                }
            }
        }

        .modal {
            padding: 24px;
            width: 100%;

            .event-overlay {
                display: none;
            }
            .modal-header {
                display: none;
            }

            &.bordered {
                padding-top: 16px;
                border-top: 1px solid $secondary-color-10;
            }
            &.float-right {
                position: relative;
                .note {
                    display: flex;
                    align-items: center;
                    float: right;
                    font-weight: bold;
                    cursor: pointer;
                    padding-top: 12px;
                }
            }
            &.show-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 0;
                display: flex;
                flex-direction: column;

                .modal-overlay {
                    display: block;
                    flex: 3;
                    background: $secondary-color-50;
                    opacity: 0.3;
                }
                .modal-dialog {
                    width: 100%;
                    border-radius: 12px 12px 0 0;
                    background: $white;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transition: all 0.15s ease-in-out;
                }
                .modal-header {
                    display: flex;
                    padding: 24px;
                    font-weight: bold;
                    font-size: 1.5em;
                    border-bottom: 1px solid $secondary-color-10;
                }
                .modal-content {
                    padding: 24px;
                    background: $white;

                    .modal-row {
                        width: 100%;
                        display: flex;
                        gap: 24px;
                        align-items: center;
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px solid $secondary-color-10;

                        .row-title {
                            font-weight: bold;
                            font-size: 1.1em;
                        }

                        .row-note {
                            color: $secondary-color-50;
                            font-weight: bold;
                        }
                        .row-icon {
                            cursor: pointer;
                            color: $primary-color-50;
                        }
                    }
                }
            }
        }

        .map-icon {
            font-size: 1em;
            color: $primary-color-100;
        }
        .participants {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 16px;
            border: 1px solid $secondary-color-20;
            max-width: 600px;
            background: $white;

            & + * {
                padding-top: 24px;
            }

            .participant {
                width: 100%;
                display: none;

                &.active {
                    display: block;
                }

                &__tabs {
                    width: 100%;
                    overflow: hidden;
                    overflow-x: auto;
                    gap: 24px;
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    position: relative;
                    border-bottom: 1px solid $secondary-color-20;
                }
                &__tab {
                    white-space: nowrap;
                    width: fit-content;
                    color: $secondary-color-60;
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    cursor: pointer;
                    .tab-remover {
                        display: none;
                    }

                    &.active {
                        color: $primary-color-100;
                        .tab-remover {
                            display: flex;
                            font-size: 1.2em;
                        }
                        &::before {
                            content: "";
                            width: 100%;
                            height: 2px;
                            position: absolute;
                            bottom: -17px;
                            left: 0;
                            right: 0;
                            background: $primary-color-100;
                        }
                    }
                }

                &__content {
                    padding: 16px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                &__form-input {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    &.disabled {
                        //pointer-events: none;

                        input{
                            background: $secondary-color-10;
                        }
                    }
                }

                &__label {
                    font-weight: 400;

                    .required {
                        padding: 0 4px;
                        color: red;
                    }
                }
                &__input {
                    width: 100%;

                    input {
                        border-radius: 6px;
                        border: 1px solid $secondary-color-20;
                        padding: 8px 16px;
                        outline: none;
                        width: 100%;

                        &:focus {
                            border: 1px solid $secondary-color-40;
                        }
                    }

                    textarea {
                        border-radius: 6px;
                        row: 3;
                        border: 1px solid $secondary-color-20;
                        padding: 8px 16px;
                        outline: none;
                        width: 100%;

                        &:focus {
                            border: 1px solid $secondary-color-40;
                        }
                    }
                }
            }
        }
        .link {
            color: $link-blue-color;
            cursor: pointer;

            &.no-underlined {
                text-decoration: none;
            }
            &.red {
                color: $primary-color-100;
            }
        }
        .agreement {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 16px;

            &__wrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            &__content {
                display: flex;
                flex-direction: column;
                gap: 8px;
                font-size: 0.95em;
                color: $secondary-color-80;

                .justify {
                    text-align: justify;
                }
            }
        }
        .checkbox-custom {
            display: flex;
            gap: 8px;
            align-items: flex-start;
            cursor: pointer;

            .checkbox-icon {
                color: $secondary-color-50;
                line-height: unset;

                &.checked {
                    color: $primary-color-100;
                }
            }

            .checkbox-label {
                white-space: normal !important;
            }
        }
        .event-summary {
            display: flex;
            flex-direction: column;
            gap: 16px;
            border-radius: 12px;
            border: 1px solid $secondary-color-20;
            background: $white;

            &__header {
                padding: 16px;
                font-weight: bold;
                border-bottom: 1px solid $secondary-color-20;
            }
            &__body {
                padding: 0 16px;

                .event-summary-row {
                    width: 100%;
                    display: flex;
                    gap: 24px;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid $secondary-color-10;

                    .row-title {
                        font-weight: bold;
                        font-size: 1.1em;
                        &.custom-voucher {
                            font-size: 1em !important;
                            color: $success-green;
                        }
                    }

                    .row-note {
                        color: $secondary-color-50;
                        font-weight: bold;
                    }
                    .row-icon {
                        cursor: pointer;
                        color: $primary-color-50;
                    }
                }
                .event-extracharge-row {
                    padding: 8px 0;
                    display: flex;
                    flex-direction: column;
                    .extracharge-head {
                        font-size: 0.7em;
                        color: $secondary-color-60;
                    }
                    .extracharge-body {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 0.8em;
                        padding: 4px 0;
                        color: $secondary-color-60;
                        .extracharge-title {
                            font-weight: bold;
                        }
                        .extracharge-amount {
                            font-weight: bold;
                            white-space: nowrap;
                        }
                    }
                }
            }
            &__footer {
                padding: 0 16px;
            }
        }
    }

    @media(min-width: 672px){
        .back-btn {
            padding-inline: 7% !important;
        }
        .container {
            max-width: 900px;
            margin-inline: auto;
            .event-content {
                display: flex;
                flex-direction: row;
                gap: 24px;

                .boxes {
                    flex-wrap: wrap;
                    width: 100% !important;
                }

                .event-title {
                    display: none;
                }

                .event-content-left {
                    flex: 1;

                    .event-buttons {
                        display: flex !important;
                        align-items: center;
                        justify-content: space-between;
                    }
                }

                .event-content-right {
                    flex: 1;
                }
            }
            .modal {
                display: none;
            }
        }
    }
    @media(max-width: 672px){
        .event-buttons-desktop{
            display: none !important;
        }
        .event-summary {
            display: none;
        }
    }
    .promo-con {
        margin: 12px 0;
        width: 100%;
        background: $white;
        border: 1px solid $secondary-color-20;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 12px;

        input {
            border: none;
            outline: none;
            background: transparent;
            font-size: 1.3em;
        }
        .promo-btn {
            cursor: pointer;
            border-radius: 12px;
            padding: 8px 24px;
            background: $white;
            border: 1px solid $secondary-color-20;
            text-align: center;
            width: fit-content;
            font-size: 0.8em;
        }
    }
</style>