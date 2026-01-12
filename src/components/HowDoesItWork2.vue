<script setup>
import mainPhoto from "../data/images/hero_pic_.webp";

import {
  themeColor, 
  themeColorOrange, 
  themeColorGold, 
  themeColorWhite 
} from "../config.js";
</script>

<template>
  <section class="bg-light" id="how_does_it_work">
    <div class="container text-center">

      <h1 class="heading">
        <span :style="{ color: themeColorOrange }">How?  </span>
        <span :style="{ fontSize: '2.5rem' }">
           We provide the CAD online. Customers use it to purchases.
        </span>
      </h1>

      <p class="subtitle">
        Gates host publicly a CAD Online to funnel orders at your preferred address, while it provides to the factory the Manufacturing Hub to control the platform and the subsequent orders. This permit to Your customers to engineer and price the devices ahead of time under your supervison.
      </p>

      <!-- IMAGE -->
      <div class="image-wrapper" data-aos="zoom-in" data-aos-delay="100">
          <img 
          :src="mainPhoto" 
          alt="How it works illustration" 
          class="main-image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1400px;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.heading {
  font-size: 3rem;
  font-weight: 600;
  color: v-bind(themeColor);
  line-height: 1.2;
  text-align: center;
}

.subtitle {
  max-width: 1000px;
  text-align: center;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  width: 100%;
  max-width: 1500px;
  height: auto;
  object-fit: cover;
  border-radius: 2rem;
  border: 5px solid v-bind(themeColor);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.main-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}
</style>
