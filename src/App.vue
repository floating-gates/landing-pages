<script setup>
  import { RouterView } from 'vue-router'
  import Footer from "./components/Footer.vue";
  import CookieBanner from "./components/CookieBanner.vue";
</script>

<template>
  <RouterView />
  <Footer />
  <CookieBanner />
</template>
