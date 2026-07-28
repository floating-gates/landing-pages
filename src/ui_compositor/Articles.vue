<script setup>
import Header from "../components/Header.vue";
import UseCaseTiles from "../components/UseCaseTiles.vue"; 
import { articles } from "../data/articles.js";
</script>

<template>
  <div class="min-h-screen">
    <Header :context="'landing-page'" />
    <UseCaseTiles
      :articles="articles" />
  </div>
</template>

