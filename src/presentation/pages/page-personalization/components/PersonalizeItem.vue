<template>
  <div class="inline-content-wrapper">
    <div :class="['inline-content', 'stretch', {'reverse': reversed}]">
      <div class="inline-content-item">
        <p>{{ title }}</p><br/>
        <b>How it works:</b>
        <ul>
          <li v-for="(item, index) in howItems" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="inline-content-image">
        <PersonalizeCarousel :images="banners"/>
      </div>
    </div>
  </div>
</template>
<script>
import PersonalizeCarousel from './PersonalizeCarousel.vue';
export default {
  name: "PersonalizeItem",
  components: {
    PersonalizeCarousel,
  },
  props: {
    banners: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    },
    howItems: {
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
      max-width: 100% !important;
    }
    .inline-content-image {
      max-width: 100%;
      gap: 16px;
      img {
        flex: 1;
        min-width: 300px;
        max-width: 300px;
        height: 100%;
        aspect-ratio: 4/3;
        overflow: hidden;
        object-fit: cover;
      }
    }
  }
  ul, li {
    padding-inline: 16px;
  }
}
.inline-content-item {
  flex: 1;
  line-height: 28px;
}
.inline-content-image {
  width: 100%;
  max-width: 500px;
  display: flex;
  overflow-x: auto;
  img {
    flex: 1;
    overflow: hidden;
    object-fit: cover;
  }
}
@media (min-width: 672px) {
  .inline-content-wrapper {
    padding-inline: 7% !important;
  }
  .inline-content {
    li {
      padding-top: 24px;
    }
    &:is(.stretch) {
      .inline-content-item {
        max-width: 50% !important;
      }
      .inline-content-image {
        flex: 1 !important;
        max-width: 100%;
      }
    }
    &:not(.reverse){
      flex-direction: row !important;
    }
    &:is(.reverse){
      flex-direction: row-reverse !important;
      transform: translateX(-70px);
    }
  }
  .inline-content-image {
    max-width: 50%;
  }
}
@media (min-width: 672px) and (max-width: 1024px) {
  .inline-content {
    flex-direction: column !important;
  }
}
</style>