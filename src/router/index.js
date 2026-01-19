import LoginPage from "@/presentation/pages/page-login/LoginPage.vue";
import GetStarted from "@/presentation/pages/page-register/GetStarted.vue";
import RegisterPage from "@/presentation/pages/page-register/RegisterPage.vue";
import LandingCarousel from "@/presentation/pages/page-start/LandingCarousel.vue";
import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/terms-of-use",
    name: "TermsOfUse",
    component: function () {
      return import("../presentation/pages/page-faq/TermsOfUse.vue");
    },
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: function () {
      return import("../presentation/pages/page-faq/PrivacyPolicy.vue");
    },
  },
  {
    path: "/landing-carousel",
    name: "LandingCarousel",
    component: LandingCarousel,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
    props: true,
    meta: { notAllowLoggedInUser: true },
  },
  {
    path: "/get-started",
    name: "GetStarted",
    component: GetStarted,
    props: true,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    props: true,
    meta: { notAllowLoggedInUser: true },
  },
  {
    path: "/points",
    name: "PointsPage",
    component: function () {
      return import("../presentation/pages/page-points/PointsPage.vue");
    },
    meta: { requireLogin: true },
  },
  {
    path: "/my-voucher",
    name: "MyVoucherPage",
    component: function () {
      return import("../presentation/pages/page-points/MyVoucherPage.vue");
    },
    meta: { requireLogin: true },
  },
  {
    path: "/404",
    name: "ErrorPage",
    component: function () {
      return import("../presentation/pages/page-message/ErrorPage.vue");
    },
  },
  {
    path: "/thank-you",
    name: "ThankYouPage",
    component: function () {
      return import("../presentation/pages/page-message/ThankYouPage.vue");
    },
    props: true,
  },
  {
    path: "/settings",
    name: "Settings",
    component: function () {
      return import("../presentation/pages/page-profile/Settings.vue");
    },
    meta: { requireLogin: true },
  },
  {
    path: "/interests",
    name: "Interests",
    component: function () {
      return import("../presentation/pages/page-profile/Interests.vue");
    },
    meta: { requireLogin: true },
  },
  {
    path: "/",
    name: "EventsPage",
    component: function () {
      return import("../presentation/pages/page-events/EventsPage.vue");
    },
    meta: { requireLogin: false },
  },
  {
    path: "/search/event/:eventName",
    name: "EventSearch",
    component: function () {
      return import("../presentation/pages/page-events/EventSearch.vue");
    },
    props: true,
    meta: { requireLogin: false },
  },
  {
    path: "/events/view",
    name: "EventsView",
    component: function () {
      return import("../presentation/pages/page-events/EventSearch.vue");
    },
    props: true,
    meta: { requireLogin: false },
  },
  {
    path: "/event/:timeId",
    name: "EventDetails",
    component: function () {
      return import("../presentation/pages/page-events/EventDetails.vue");
    },
    props: true,
    meta: { requireLogin: false },
  },
  {
    path: "/booking/:eventId",
    name: "EventBooking",
    component: function () {
      return import("../presentation/pages/page-events/EventBooking.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/book-event/:timeId",
    name: "BookEvent",
    component: function () {
      return import("../presentation/pages/page-events/BookEvent.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/checkout",
    name: "CheckoutPage",
    component: function () {
      return import("../presentation/pages/page-checkout/CheckoutPage.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/receipt/:number/:pathMatch(.*)*",
    name: "ReceiptPage",
    component: function () {
      return import("../presentation/pages/page-checkout/ReceiptPage.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/ticket/:number",
    name: "TicketPage",
    component: function () {
      return import("../presentation/pages/page-checkout/TicketPage.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/cart/:outletCode/:cartId",
    name: "CartPage",
    component: function () {
      return import("../presentation/pages/page-cart/CartPage.vue");
    },
    props: true,
    meta: { requireLogin: true, reinit: true },
  },
  {
    path: "/redirect/payment/:orderType/:outletCode/:currentStoreId/:trackingId/:accountKey/:cartId/:amount",
    name: "RedirectPayment",
    component: function () {
      return import("../presentation/pages/page-redirect/RedirectPayment.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/my-order",
    name: "MyOrderPage",
    component: function () {
      return import("../presentation/pages/page-profile/MyOrderPage.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/deleted-account/:code",
    name: "DeletedAccount",
    component: function () {
      return import("../presentation/pages/page-profile/DeletedAccount.vue");
    },
    props: true,
    meta: { notAllowLoggedInUser: true },
  },
  {
    path: "/feeds",
    name: "FeedPage",
    component: function () {
      return import("../presentation/pages/page-feeds/FeedPage.vue");
    },
    meta: { requireLogin: true },
  },
  {
    path: "/survey/:nudgeId",
    name: "SurveyPage",
    component: function () {
      return import("../presentation/pages/page-survey/SurveyPage.vue");
    },
    meta: { requireLogin: true },
  },
  {
    path: "/article/:nudgeId/:shareToken?",
    name: "ArticlePage",
    component: function () {
      return import("../presentation/pages/page-article/ArticlePage.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/surprise/:nudgeId",
    name: "SurprisePage",
    component: function () {
      return import("../presentation/pages/page-surprise/SurprisePage.vue");
    },
    props: true,
    meta: { requireLogin: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (to.matched.some((record) => record.meta.requireLogin) && !isLoggedIn) {
    let path = { redirect: to.fullPath };
    if (to.reinit) path.reinit = true;
    return next({
      path: "/login",
      // params: { redirect: { name: to.name, params: to.params } },
      query: path,
    });
  }
  if (isLoggedIn) {
    const notAllowLoggedInUser = to.matched.some(
      (route) => route.meta.notAllowLoggedInUser
    );

    if (notAllowLoggedInUser) return next({ path: "/events" });
  }
  next();
});

export default router;
