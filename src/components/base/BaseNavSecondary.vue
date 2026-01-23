<template>
  <div class="head-secondary" v-show="violatorText">
    <span>{{ violatorText }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    violatorText(){
      let data = this.$store.getters.getHeadquarter;
      let hq = data?.headquarter;
      if(!hq) return '';
      return hq.custom?.violatorText || '';
    }
  }
};
</script>

<style lang="scss">
.head-secondary {
  background: $primary-color-100;
  color: $secondary-color-90;
  width: 100%;
  padding: 8px 24px;
  font-size: 0.8em;
}

.head-secondary a{
	text-decoration: auto;
	color: $secondary-color-90;
}

@media (min-width: 672px) {
  .head-secondary {
    padding-inline: 7% !important;
  }
}
</style>
