<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import mainPhoto from "../data/images/hero_pic.webp";
import mainPhoto2 from "../data/images/output.png"
import background from "../data/images/background_pic.webp";
import { app_login_url, youtubeVideoUrl } from "../config.js";

import Charts from "./Charts.vue"
import { ChevronDoubleRight } from "../helper/icons_generator.js";

const userAddress = ref("");
const isSubmitting = ref(false);
const progress = ref(0);
const placeholder = ref("Pin your factory in the web");

// Suggested auto-fill text
const suggestedText = ["Gears-Maker.com",
                       "Smith-Machining.com",
                       "Medical-Machine-Hub.com"];

// state for controlling typewriter
let typingStopped = false;
let activeTimers = [];

// Sequential typewriter effect
function autoFillMultiple(textList, delayBetween) {
    let current = 0;
    
    function typeText() {
        if (typingStopped) return; // stop typing if user interacts
        
        placeholder.value = "";
        userAddress.value = ""; // clear input
        const text = textList[current];
        let index = 0;
        
        const interval = setInterval(() => {
            if (typingStopped) {
                clearInterval(interval);
                return;
            }
            if (index < text.length) {
                userAddress.value += text[index];
                index++;
            } else {
                clearInterval(interval);
                const timer = setTimeout(() => {
                    current = (current + 1) % textList.length;
                    typeText();
                }, delayBetween);
                activeTimers.push(timer);
            }
        }, 160);
        activeTimers.push(interval);
    }
    
    typeText();
}

onMounted(() => {
    const timer = setTimeout(() => {
        autoFillMultiple(suggestedText, 2500);
    }, 2000);
    activeTimers.push(timer);
});

// stop typewriter when user types or focuses
function stopTyping() {
    typingStopped = true;
    activeTimers.forEach(clearInterval);
    activeTimers.forEach(clearTimeout);
    activeTimers = [];
}

// Form submission
function submitAddress() {
    
    stopTyping();
    
    // STYLED COUNTDOWN
    const duration = 1200;
    const step = 50;
    const interval = setInterval(() => {
        progress.value += (step / duration) * 100;
        if (progress.value >= 100) {
            clearInterval(interval);
            window.location.href =
                app_login_url + "?provisional_hub_name=" + userAddress.value;
        }
    }, step);
    
    isSubmitting.value = true;
    setTimeout(() => {
    }, duration);
}

// cleanup timers
onBeforeUnmount(() => {
    stopTyping();
    progress.value = 0
}); 
</script>

<template>
<div class="faq-section product-hero flex flex-row w-full items-center justify-center min-h-screen"
     :style="{ backgroundImage: `url(${background})` }">
 
    <div class="product-copy">
      <!-- <h3> -->
      <!--   <em>Good2Manufacture is a set of tools for your Agents/Engineers to discover issues in your CAD</em> <br>
        -->
      <!-- </h3> -->
      <h1 class="heading"
          data-aos="fade-up"
          data-aos-delay="100">
        <em>Search</em> across your entire factory network<br>
        <em>Verify</em> your CAD models and GD&amp;T<br>
        <em>Accept</em> file drops from your customers<br>
        <em>Get warned</em> the moment issues are found<br>
      </h1>
      
      <div class="excerpt"
           data-aos="fade-up"
           data-aos-delay="100">
        <p>
          Good2Manufacture will scan your network in search of CAD models & GD&T, warning you if it finds
          manufacturing problems! We highlighting what could go wrong in production.
        </p>
      </div>
      
      <form v-if="!isSubmitting"
            @submit.prevent="submitAddress"
            class="address-form glass mx-1"
            data-aos="fade-up"
            data-aos-delay="200">
        <input
          v-model="userAddress"
          type="text"
          :placeholder="placeholder"
          @focus="stopTyping"
          @input="stopTyping"
          class="address-input"
          />
        <button type="submit" class="address-submit">
          <span>Start Here</span>
          <ChevronDoubleRight stroke-width="3" />
        </button>
      </form>
      <div v-else class="address-form">
        <button type="button" class="progress-btn w-full"
                :style="{ background: `linear-gradient(90deg, var(--theme-color-orange) ${progress}%, var(--theme-color) ${progress}%)`,
                        borderColor: 'var(--theme-color-orange)' }">
          Setting up hub... {{ Math.floor(progress) }}%
        </button>
      </div>
    </div>
    <div class="chart-wrap">
      <Charts />
    </div>
</div>
</template>

<style scoped>
@reference "../main.css";

img {
    margin-top: 2rem;
}

.address-form {
    display: flex;
    gap: 10px;
    margin-top: 2rem;
    border-radius: 14px;
    padding: 6px;
    font-size: 1.1rem;
    max-width: 600px;
}

.address-input {
    flex: 1;
    padding: 0.8rem 1.0rem;
    border: none;
    border-radius: 14px;
    background-color: var(--theme-color-white);
    transition: background-color 0.3s ease;
}

.address-input:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px var(--theme-color);
}

.address-submit {
    padding: 0.9rem 1.4rem;
    /* min-width: 80px; */
    /* min-height: 50px; */
    border: none;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
    color: var(--theme-color-white);
    background: linear-gradient(
        145deg, 
        var(--theme-color) 0%, 
        #1a1d23 100% /* Slightly darker shade of your theme color */
    );
    box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.15),
        0 6px 20px rgba(0, 0, 0, 0.05);
}

.address-submit:hover {
    transform: translateY(-1px);
    cursor: pointer;
}

.address-submit svg {
    width: 20px;
    stroke: var(--theme-color-white);
    transition: stroke 0.3s ease, transform 0.3s ease;
}

.address-submit:hover svg {
    transform: translateX(2px);
}

.excerpt {
    margin-bottom: 1rem;
    margin-top: 1rem;
    max-width: 600px;
}

.progress-btn {
    padding: 0.9rem 1.2rem;
    min-height: 56px;   
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, transform 0.2s ease;
    color: white;
    background-color: var(--theme-color);
    flex: 1;
}

.product-hero {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    padding-left: 2rem;
    padding-right: 2rem;
    gap: 1.75rem;
}

.product-copy {
    flex: 0 1 auto;
    width: max-content;
    max-width: 100%;
}

.product-copy .heading {
    white-space: nowrap;
    font-size: clamp(1.4rem, 1.8vw, 2.8rem); 
}

.address-form,
.address-input {
    min-width: 0;
}

.chart-wrap {
    flex: 1.3 1 26rem;
    min-width: 0;
    width: 100%;
    max-width: 860px;
    max-height: 800px;
    display: flex;
    flex-direction: column;
}

.chart-wrap > :first-child {
    flex: 1;
    width: 100%;
    height: 100%;
    min-width: 0;
}

@media (max-width: 1400px) {
    .product-copy .heading {
        font-size: clamp(1.6rem, 2.4vw, 2.8rem);
    }
}

@media (max-width: 1024px) {
    .product-hero {
        flex-direction: column;
        justify-content: flex-start;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        gap: 2rem;
    }

    .product-copy,
    .chart-wrap {
        max-width: 100%;
        width: 100%;
    }
}

@media (max-width: 768px) {
    .product-copy .heading {
        font-size: clamp(1.15rem, 5vw, 1.8rem);
    }
}
</style>
