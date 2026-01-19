<template>
  <div class="head-secondary">
    <span
      ><a href='https://hydroflask.ph/' target="_blank"> Find the perfect Hydro Flask for your next match at our official stores
      or browse our website today.</a></span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
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
