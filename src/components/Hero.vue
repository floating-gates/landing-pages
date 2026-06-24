<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import mainPhoto from "../data/images/hero_pic.webp";
import mainPhoto2 from "../data/images/output.png"
import background from "../data/images/background_pic.webp";
import { themeColor, themeColorOrange, themeColorWhite,
         app_login_url, youtubeVideoUrl } from "../config.js";

import Charts from "./Charts.vue"

const userAddress = ref("");
const isSubmitting = ref(false);
const progress = ref(0);
const placeholder = ref("Choose your factory address");

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
<div class="untree_co-hero" id="hero"
     :style="{ backgroundImage: `url(${background})` }">
  <div class="container wider-container">
    <div class="align-items-center">
      <div class="col-12 my-6" id="header" >
        <div class="row align-items-center">
          <div class="col-lg-5" style="max-width: 85%;" >
            <h1 class="heading"
                data-aos="fade-up"
                data-aos-delay="100">
              <div :style="{ fontSize: '2.6rem' }">
                <em :style="{ color: themeColorOrange, fontSize: '3.1rem' }">Search </em> your Factory Network,<br>
                <em :style="{ color: themeColorOrange, fontSize: '3.1rem' }">Checks </em> for Issues in your CAD,<br>
                <em :style="{ color: themeColorOrange, fontSize: '3.1rem' }">Allows </em> customers CAD Drop
                ,<br>
                <em :style="{ color: themeColorOrange, fontSize: '3.1rem' }">Warns </em> if Issues are found<br>
              </div>
            </h1>
            
            <div class="excerpt"
                 data-aos="fade-up"
                 data-aos-delay="100">
              <p>
                Gates will scan your network in search of CAD models that can have
                manufacturing problems and warn you! We automate its manufacturing feasibility,
                highlighting what could go wrong in production.
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
              <button type="submit" class="address-submit" >
                <span>Automate your Factory</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
                </svg>
              </button>
            </form>
            <div v-else class="address-form">
              <button type="button" class="progress-btn w-100"
                      :style="{ 
                              background: `linear-gradient(90deg, ${themeColorOrange} ${progress}%, ${themeColor} ${progress}%)`,
                              borderColor: themeColorOrange 
                              }">
                Setting up hub... {{ Math.floor(progress) }}%
              </button>
            </div>
          </div>
          <div class="col-lg-7 chart-wrap">
            <Charts />
            <!-- <img :src="mainPhoto2" alt="good2manufacture"  class="img-fluid" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.untree_co-hero {
    background-size: cover;
    background-position: center top;   /* anchor to top if it's a tall image */
    width: 100%;
}

img {
    margin-top: 2rem;
}

.btn-hover:hover {
    color: v-bind(themeColorWhite);
    background-color: v-bind(themeColorOrange);
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
    background-color: v-bind(themeColorWhite);
    transition: background-color 0.3s ease;
}

.address-input:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px v-bind(themeColor);
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
    color: v-bind(themeColorWhite);
    background: linear-gradient(
        145deg, 
        v-bind(themeColor) 0%, 
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
    stroke: v-bind(themeColorWhite);
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
    background-color: v-bind(themeColor);
    flex: 1;
}

.chart-wrap {
  max-height: 800px;
  display: flex;
  flex-direction: column;
}

.chart-wrap > :first-child {
  flex: 1; 
  height: 100%;
}
</style>
