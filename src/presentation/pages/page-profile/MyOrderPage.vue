<template>
	<layout-variant-two :show-loading-screen="loading" :overflow-hidden="false">
		<template v-slot:header>
			<div class="slide-down">
                <base-nav-content/>
			</div>
		</template>
		<template v-slot:body>
            <div class="container">
                <div class="container__nav" :class="{'hidden': !isEmpty(currentReceipt)}">
                    <div class="head-nav">
                        <div class="back-btn" @click="goBack">
                            <span class="material-icons">arrow_back</span>
                        </div>
                        <div class="right"><h1 class="heading-5">My Orders</h1></div>
                    </div>
                    <!-- <ul class="tabs">
                        <li @click="showAll()" :class="{'active': activeIndex == 0}">All</li>
                        <li @click="showOrders()" :class="{'active': activeIndex == 1}">Pickup Orders</li>
                        <li @click="showBookings()" :class="{'active': activeIndex == 2}">Registered Events</li>
                    </ul> -->
                    <div class="content">
                        <span class="empty" v-if="!loading && isEmpty(objects)"> No data..</span>
                        <div class="order__item" :class="{'active': isCurrentActive(obj) }"
                            v-for="(obj, i) in objects" 
                            :key="i">
                            <div class="order__item__body">
                                <span class="order__item__body__icon material-icons-outlined">{{ obj.type == 'TICKET' ? 'hiking' : 'shopping_bag' }}</span>
                                <div class="order__item__body__details">
                                    <div class="order__item__body__details__status">{{ obj.statusDisplay }}</div>
                                    <div class="order__item__body__details__date">{{ obj.date }}</div>
                                    <div class="order__item__body__rows" v-for="(row, r) in obj.rows" :key="r">
                                        <div class="order__item__body__details__location">{{ row.location }}</div>
                                        <div class="order__item__body__details__row" v-for="(item, m) in row.items" :key="m">
                                            <span>{{ item.name }}</span>
                                            <span>{{ item.quantity }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="order__item__bottom">
                                <div class="order__item__bottom__label">
                                    <span class="label__title">{{ currency(obj.total) }}</span>
                                    <span class="label__subtitle">{{ obj.countOrders }} item(s)</span>
                                </div>
                                <div class="order__item__bottom__btn" 
                                    :class="{'disabled': isCurrentActive(obj)}"
                                    @click="goDetails(obj)">View</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container__receipt" :class="{'hidden': isEmpty(currentReceipt)}">
                    <div class="receipt-con">
                        <div class="back-btn" @click="backtoList()">
                            <span class="material-icons">close</span>
                        </div>
                        <div class="heading" v-if="!isEmpty(currentReceipt)">
                            <div class="head-date">{{ currentReceipt.date }}</div>
                            <div class="head-info">{{ currentReceipt.countOrders }} item(s)</div>
                        </div>
                    </div>
                    <div class="receipt-body">
                        <booking-content v-if="!isEmpty(currentReceipt) && currentReceipt.type == 'TICKET'" 
                            :hide-header="true" 
                            :booking="currentReceipt.details" 
                            :order-number="currentReceipt.number">
                        </booking-content>
                        <order-content v-if="!isEmpty(currentReceipt) && currentReceipt.type != 'TICKET'" 
                            :hide-header="true" 
                            :order="currentReceipt.details" 
                            :order-number="currentReceipt.number">
                        </order-content>
                    </div>
                </div>
            </div>
		</template>
	</layout-variant-two>
</template>

<script>
    import { storeService } from "@/bloc/services";
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import utility from "@/presentation/mixins/utility.js";
import { isEmpty } from "lodash";
import moment from 'moment-timezone';
import BookingContent from "../page-checkout/components/BookingContent.vue";
import OrderContent from "../page-checkout/components/OrderContent.vue";

    export default {
        name: "MyOrderPage",
        mixins: [utility],
        components: {
            LayoutVariantTwo,
            BookingContent,
            OrderContent,
        },
        data() {
            return {
                loading: false,
                orders: [],
                bookings: [],
                activeIndex: 0,
                currentReceipt: null,
                objects: [],
                isDesktop: false,
            };
        },
        watch: {
            activeIndex() {
                this.currentReceipt = null;
                this.objects = [];
                setTimeout(() => {
                    this.setObjects();
                },50);
            }
        },
        computed: {},
        methods: {
            setObjects() {
                let items = [];
                let orders = this.orders.map((it) => {
                    let item = {
                        status: it.orders[0].status,
                        statusDisplay: it.orders[0].status,
                        type: it.type,
                        date: moment.tz(it.placeTime, 'Asia/Singapore').format('DD MMM YYYY HH:mm A'),
                        number: it.number,
                        total: it.total,
                        subTotal: it.subTotal,
                        details: it,
                        rows: [],
                        countOrders: 0
                    }
                    if(!isEmpty(it.orders)){
                        it.orders.forEach((o) => {
                            item.countOrders += o.items.length;
                            let outlet = this.$store.getters.getOutlets.find((ol) => {
                                return ol.stores.map((os) => { return os.id }).indexOf(o.store) > -1;
                            });
                            let row = {
                                location: !isEmpty(outlet) ? outlet.name : o.storeName,
                                items: o.items.map((m) => {
                                    return {name: m.productName, quantity: m.quantity}
                                })
                            }
                            item.rows.push(row);
                        });
                    }
                    return item;
                });
                let now = parseInt(moment.tz(moment(), 'Asia/Singapore').format('x'));
                let bookings = this.bookings.map((it) => {
                    let statusDisplay = "Confirmed";
                    let eventTimes = it.items.map((t) => { return t.ticket.endDate }).sort((a, b) => { return b - a });
                    if (!isEmpty(eventTimes)) {
                        if (now > eventTimes[0]) statusDisplay = 'Completed';
                    }
                    let item = {
                        statusDisplay: statusDisplay,
                        status: it.status,
                        type: it.type,
                        date: moment.tz(it.placeTime, 'Asia/Singapore').format('DD MMM YYYY HH:mm A'),
                        number: it.number,
                        total: it.total,
                        subTotal: it.subTotal,
                        details: it,
                        rows: [],
                        countOrders: it.items.length,
                    }
                    item.rows.push({
                        location: it.items[0].productName,
                        items: [
                            { name:`Ticket`, quantity: it.items.length }
                        ]
                    });
                    return item;
                });
                
                switch(this.activeIndex){
                    case 0:
                        items = [...bookings, ...orders];
                        break;
                    case 1:
                        items = orders;
                        break;
                    case 2:
                        items = bookings;
                        break;
                }
                items.sort((a,b) => {
                    return b.placeTime - a.placeTime;
                });
                this.objects = items;
            },
            isCurrentActive(obj){
                if(isEmpty(this.currentReceipt)) return false;
                if(this.currentReceipt.type == 'TICKET') return this.currentReceipt.number == obj.number;
                return this.currentReceipt.details.id == obj.details.id
            },
            backtoList(){
                this.currentReceipt = null;
            },
            initReceipt(){
                this.loading = false;
            },
            goDetails(order){
                if(!isEmpty(this.currentReceipt)){
                    if(order.type == 'TICKET') {
                        if(this.currentReceipt.number == order.number) return;
                    }
                    else if(this.currentReceipt.details.id == order.details.id) return;
                }
                this.loading = true;
                this.currentReceipt = null;
                setTimeout(() => {
                    this.currentReceipt = order;
                    this.loading = false;
                }, 300);
            },
            showAll(){
                if(this.activeIndex == 0) return;
                this.activeIndex = 0;
            },
            showOrders(){
                if(this.activeIndex == 1) return;
                this.activeIndex = 1;
            },
            showBookings(){
                if(this.activeIndex == 2) return;
                this.activeIndex = 2;
            },
            async retrieveMyOrders(){
                this.orders = [];
                let json = await storeService.retrieveOrders();
                if(!json.success) return;
                this.orders = json.orders;
            },
            async retrieveMyBookings(){
                this.bookings = [];
                let json = await storeService.retrieveBookings();
                if(!json.success) return;
                this.bookings = json.orders;
            }
        },
        async created() {
            try {
                this.isDesktop = window.innerWidth >= 672;
                window.addEventListener('resize', () => {
                    this.isDesktop = window.innerWidth >= 672;
                });
                this.loading = true;
                if (this.$store.getters.hasInited) await this.refreshCustomerData();
                else await this.refreshMainData();
                // await this.retrieveMyOrders();
                await this.retrieveMyBookings();
                this.showAll();
                this.setObjects();
                this.loading = false;
                if (isEmpty(this.objects) || !this.isDesktop) return;
                setTimeout(() => {
                    this.goDetails(this.objects[0]);
                }, 100);
            } catch (error) {
                this.loading = false;
                this.showNotification("alert", "error_outline", error);
            }
        },
    };
</script>

<style scoped lang="scss">
    .head-nav {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px;
    }
    .back-btn {
        cursor: pointer;
    }
    .receipt-con {
        padding: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        max-height: 56px;
        border-bottom: 1px solid $secondary-color-20;
        margin-bottom: 0;
        gap: 12px;
        background: $white;

        & + * {
            flex: 3;

            & .payment-wrapper {
                height: 100%;
            }
        }

        .back-btn {
            color: $secondary-color-60;
            font-size: 1.2em;
        }
        .heading {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .head-date {
                font-size: 1em;
                color: $secondary-color-90;
            }

            .head-info {
                font-size: 0.8em;
                color: $secondary-color-60;
            }
        }
    }
    .receipt-body {
        width: 100%;
        max-width: 650px;
        margin: 0 auto;
        background: $white;
    }
    .container {
        display: flex;
        width: 100%;
        height: 100%;
        background: $primary-color-20;

        &__nav {
            flex: 1;
            width: 100%;
            height: 100%;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding: 0;
            overflow: hidden;
            overflow-y: auto;
            border-right: 2px solid $primary-color-10;
            background: $white;

            &.hidden {
                display: none;
            }
        }
        &__receipt {
            flex: 1;
            width: 100%;
            height: 100%;
            text-align: left;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            overflow-y: auto;
            background: $white;
            padding: 0;

            &.hidden {
                display: none;
            }
        }
    }

    .tabs {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 24px;
        list-style-type: none;
        padding: 16px 24px;
        border-bottom: 2px solid $secondary-color-10;
        position: relative;

        li {
            text-decoration: none;
            list-style: none;
            padding: 0;
            position: relative;
            color: $secondary-color-70;
            font-weight: bold;

            &.active {
                color: $primary-color-100;
                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -18px;
                    height: 2px;
                    background: $primary-color-100;
                }
            }
        }
    }

    .content {
        width: 100%;
        display: flex;
        flex-direction: column;

        .empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: $primary-color-100;
            height: 100%;
            min-height: 200px;
        }

        .order {
            &__item {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 16px;
                -webkit-animation-duration: 0.3s;
                animation-duration: 0.3s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                -webkit-animation-name: fadeInDown;
                animation-name: fadeInDown;
                padding: 12px 18px;

                &:nth-child(odd) {
                    background-color: rgba(0,0,0,.022);
                }

                &__body {
                    width: 100%;
                    display: flex;
                    gap: 24px;

                    &__icon {
                        width: 20px;
                    }

                    &__details {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;

                        &__rows {
                            display: flex;
                            gap: 12px;
                            flex-direction: column;
                        }

                        &__status {
                            width: fit-content;
                            text-transform: uppercase;
                            background: $success-green;
                            color: $white;
                            padding: 4px 12px;
                            border-radius: 5px;
                            font-size: 0.75em;
                        }
                        &__date {
                            color: $secondary-color-60;
                        }
                        &__location {
                            font-weight: bold;

                            & + * {
                                padding-top: 12px;
                            }
                        }

                        &__row {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 12px;
                        }
                    }
                }
                &__bottom {
                    padding: 0;
                    display: flex;
                    gap: 24px;

                    &__label {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 0px;

                        .label__title {
                            font-weight: bold;
                            font-size: 1.2em;
                        }
                        .label__subtitle {
                            color: $secondary-color-70;
                            font-size: 0.9em;
                        }
                    }
                    &__btn {
                        background: $primary-color-100;
                        color: $white;
                        padding: 6px 18px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        font-size: 0.9em;
                        height: fit-content;
                        &.disabled {
                            pointer-events: none;
                            background: $secondary-color-30;
                        }
                    }
                }
            }
        }
    }

    @keyframes fadeInDown {
        0% {
            opacity: 0;
            transform: translateY(-50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (min-width: 672px) {
		.header-con {
            display: flex !important;
            padding: 16px 24px !important;
        }
        .receipt-con {
            max-width: 650px;
            margin: 0 auto;
        }
        .container {
            &__nav {
                max-width: 500px;

                &.hidden {
                    display: flex !important;
                }
            }

            &__receipt {
                flex: 1;
                width: 100%;
                height: fit-content !important;
                text-align: left;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                overflow-y: auto;
                padding: 24px;
                background: transparent;
            }
        }
        .tabs {
            li {
                cursor: pointer;
            }
        }
        .content {
            padding-left: 0 !important;

            .order {
                &__item {
                    border-left: 4px solid transparent;

                    &.active {
                        border-left-color: $primary-color-100;
                        background-color: $primary-color-10;
                    }
                    &__bottom {
                        &__btn {
                            cursor: pointer;
                        }
                    }
                }
            }
        }
	}
    @media (max-width: 800px){
        .container {

            &__nav {
                max-width: 100% !important;
            }
        }
    }
</style>