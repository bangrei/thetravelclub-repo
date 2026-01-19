<template>
	<layout-variant-two>
		<template v-slot:header>
			<div class="header-con">
				<div class="back-btn" @click="goTo('EventsPage')">
					<span class="material-icons">arrow_back</span>
					<span>{{ showBack ? 'Back' : 'Home' }}</span>
				</div>
				<h1 class="heading-4">Support Center</h1>
			</div>
		</template>
		<template v-slot:body>
			<base-tab-panel size="sm" @select-tab="toggleSelected">
				<!-- <base-tab title="FAQ" :isSelected="tabIndex === 1" :key="1">
					<faq-content class="support-con" />
					<p class="body-3-normal">
						v{{ this.$store.state.appVersion }}
					</p>
				</base-tab> -->
				<base-tab
					title="Privacy Policy"
					:isSelected="tabIndex === 2"
					:key="2"
				>
					<policy-content class="support-con"></policy-content>
				</base-tab>
			</base-tab-panel>
		</template>
	</layout-variant-two>
</template>

<script>
import LayoutVariantTwo from "@/components/layout/LayoutVariantTwo.vue";
import PolicyContent from "./components/PolicyContent.vue";
import utility from "@/presentation/mixins/utility.js";
export default {
	name: "PrivacyPolicy",
	mixins: [utility],
	components: { LayoutVariantTwo, PolicyContent },
	data() {
		return {
			tabIndex: 2,
		};
	},
	computed: {
		showBack(){
			return window.history.state.back !== null
		}
	},
	methods: {
		toggleSelected(activeCategoryId) {
			this.tabIndex = activeCategoryId;
		},
	},
};
</script>
<style lang="scss" scoped>
.header-con {
	padding: 12px 14px;
	border-bottom: 1px solid $secondary-color-20;
	background: $white;
	color: $secondary-color-90;
	justify-content: space-between;

	.back-btn {
		color: $secondary-color-100;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 16px;
	}
}

.faq-back {
	position: absolute;
}
.support-con {
	margin-top: 40px;
}
</style>
