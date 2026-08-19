<template>
  <div class="why-content">
    <h2>Why choose The Travel Club Concierge?</h2>
    <div class="why-grid">
      <div class="why-grid-item">
        <div class="grid-title">Complete ecosystem for smarter, more seamless travel</div>
        <div class="grid-description">
          Navigate every stage of travel with convenience from our pre-departure essentials to our post-arrival aftersales all in one touchpoint.
        </div>
      </div>
      <div class="why-grid-item">
        <div class="grid-title">Curated trips for meaningful experiences</div>
        <div class="grid-description">
          Experience more than the ordinary and discover new activities, destinations, and hidden gems with our trusted network of local and international partners.
        </div>
      </div>
      <div class="why-grid-item">
        <div class="grid-title">Elevated value through exclusive rewards</div>
        <div class="grid-description">
          ain access to premium travel perks, complimentary upgrades, and exclusive gifts from The Travel Club’s collection of travel and lifestyle brands.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WhyContent",
}
</script>
<style scoped lang="scss">
.why-content {
  padding-block: 32px;
  padding-inline: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  h2 {
    line-height: 1.4;
  }
}
.why-grid {
  width: 100%;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  .why-grid-item {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    .grid-title {
      font-weight: 600;
      line-height: 1.4;
    }
    .grid-description {
      line-height: 1.4;
    }
  }
}
@media (min-width: 672px) {
  .why-content {
    padding-inline: 7%;
  }
  .why-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>