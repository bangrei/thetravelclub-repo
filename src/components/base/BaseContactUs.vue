<template>
  <div class="block-content">
    <h2>Contact Us</h2>
    <span>For questions and inquiries, email us at: <b>thetravelclub.ph@primergrp.com</b></span>
    <div class="social-links">
      <img :src="instagramApp.src" alt="Instagram" width="35" height="35" @click="openExternalLink(instagramApp.url)">
      <img :src="fbApp.src" alt="Facebook" width="35" height="35" @click="openExternalLink(fbApp.url)">
    </div>
  </div>
</template>
<script>
import fbIcon from "@/assets/images/fb-icon.svg";
import instagramIcon from "@/assets/images/instagram-icon.svg";
export default {
  name: "BaseContactUs",
  computed: {
    fbApp(){
      return {src: fbIcon, url: "https://www.facebook.com/thetravelclubph/"};
    },
    instagramApp(){
      return {src: instagramIcon, url: "https://www.instagram.com/thetravelclubph/?hl=en"}
    }
  },
  methods: {
    openExternalLink(link, callback){
      if(!link) return;
      if(!callback) callback = () => {};
      const a = document.createElement('a');
      a.href = link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.click();
      a.remove();
      callback();
    },
  }
}
</script>
<style scoped lang="scss">
.block-content {
  width: 100%;
  padding-inline: 24px;
  padding-block: 48px;
  border-top: 1px solid $secondary-color-20;
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 22px;
  background: $white-smokey;
}
.social-links {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-inline: auto;
  width: fit-content;
  img {
    cursor: pointer;
  }
}
</style>