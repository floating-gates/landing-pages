<script setup>
import Header from "../components/Header.vue";
import UseCaseTiles from "../components/UseCaseTiles.vue"; 
import { use_cases } from "../data/use_cases.js";
</script>

<template>
<div class="min-h-screen">
  <Header :context="'landing-page'" />
  <UseCaseTiles
    :articles="use_cases" />
</div>
</template>

