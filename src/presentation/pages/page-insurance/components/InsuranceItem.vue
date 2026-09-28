<template>
  <div class="inline-content-wrapper">
    <div :class="['inline-content', 'stretch', {'reverse': reversed}]">
      <div class="inline-content-item">
        <p v-for="(item, index) in items" :key="index">{{ item }}</p>
      </div>
      <div class="inline-content-image">
        <img :src="image"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InsuranceItem",
  props: {
    image: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    },
    reversed: {
      type: Boolean,
      default: false
    },
  }
}
</script>
<style scoped lang="scss">
.inline-content-wrapper {
  padding: 32px 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  &:is(.bg-darker){
    background: $yellow-darker;
  }
}
.inline-content {
  width: 100%;
  display: flex;
  gap: 24px;
  flex-direction: column;
  line-height: 1.5;
  text-align: left;
  button, a {
    border-radius: 999px;
    padding: 8px 32px;
    border: none;
    background: $yellow-main;
    color: $secondary-color-90;
    cursor: pointer;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block: 16px;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    outline: none;
    &:hover {
      opacity: 0.7;
    }
  }
  &.stretch {
    .inline-content-item {
      flex: 1;
      width: 100%;
      line-height: 28px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .inline-content-image {
      flex: 1;
      max-width: 100%;
      gap: 16px;
      aspect-ratio: 5/3;
      img {
        height: 100%;
        aspect-ratio: inherit;
        overflow: hidden;
        object-fit: cover;
      }
    }
  }
}
@media (min-width: 672px) {
  .inline-content-wrapper {
    padding-inline: 7% !important;
  }
  .inline-content {
    flex-direction: row !important;
  }
}
@media (min-width: 672px) and (max-width: 1024px) {
  .inline-content {
    flex-direction: column !important;
  }
}
</style>