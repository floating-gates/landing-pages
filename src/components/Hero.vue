<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import mainPhoto from "../data/images/hero_pic.webp";
import { themeColor, themeColorOrange, themeColorWhite,
         app_login_url, youtubeVideoUrl } from "../config.js";

// const heroHeading = [
//     "Invested in Manufacturing?",
//     "Be sure your machines runs, as Customers connect to your CAD"
// ];

const heroHeading = [
    // "Invested in Manufacturing?",
    "Your CAD is Online.",
    "Make sure your Machines and Tools are too."
];


// User input state
const userAddress = ref("");
const isSubmitting = ref(false);
const progress = ref(0);
const placeholder = ref("Choose your hub address");

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
<div class="untree_co-hero py-lg-8" id="hero">
  <div class="container wider-container">
    <div class="row align-items-center">
      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-lg-7 ml-auto order-lg-2 image-col">
            <img :src="mainPhoto" alt="Technology Proxy in action"
                 class="img-fluid hero-image" />
            
            <a
              :href="youtubeVideoUrl"
              class="watch-video"
              data-fancybox
              >
              <p class="hand-underline">SEE IT IN ACTION</p>
              
              <div class="watch-video-btn">
                <div class="play-button">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="white">
                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg>
                </div>

                <div
                  class="video-pulse"
                  ></div>
              </div>
            </a>
          </div>
          <div class="col-lg-5 ps-lg-5 intro" id="header">
            <h1 class="heading"
                style="font-size: 2.8rem; line-height: 1.2; max-width: 100%;"
                data-aos="fade-up"
                data-aos-delay="100">
              <span v-for="(line, idx) in heroHeading" :key="idx" :style="{ color: themeColor }" class="block">
                {{ line }}
              </span>
            </h1>
            
            <div class="excerpt"
                 data-aos="fade-up"
                 data-aos-delay="100">
<p>
  Empower customers to design and order parts directly through 
  <strong :style="{ color: themeColorOrange }">your CAD</strong>. 
  Our platform instantly verifies feasibility and generates quotes, 
  eliminating manual sales calls so you can keep your shop floor running.
</p>
            </div>
            
            <form v-if="!isSubmitting" @submit.prevent="submitAddress" class="address-form" data-aos="fade-up" data-aos-delay="200">
              <input
                v-model="userAddress"
                type="text"
                :placeholder="placeholder"
                @focus="stopTyping"
                @input="stopTyping"
                class="address-input"
                />
              <button type="submit" class="address-submit" >
                <span>Get your Online CAD</span>
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
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.intro {
    margin-top: 4rem;
}

.heading .block {
    display: block;
}

.btn-hover:hover {
    color: v-bind(themeColorWhite);
    background-color: v-bind(themeColorOrange);
}

.wider-container {
    max-width: 1420px; /* Bootstrap’s xl is 1140px, this gives you extra room */
    margin: 0 auto;
}

.address-form {
    display: flex;
    gap: 10px;
    background-color: #fff;
    border-radius: 14px;
    padding: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.address-input {
    flex: 1;
    padding: 0.9rem 1.2rem;
    font-size: 1.05rem;
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
  padding: 0.9rem 1.6rem;
  min-width: 80px;
  min-height: 50px;
  border: none;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
  color: v-bind(themeColorWhite);
  background-color: v-bind(themeColor);
}

.address-submit:hover {
  background-color: v-bind(themeColorOrange);
  color: v-bind(themeColor);
  transform: translateY(-1px);
  cursor: pointer;
}

.address-submit svg {
  width: 20px;
  height: 20px;
  stroke: v-bind(themeColorWhite);
  transition: stroke 0.3s ease, transform 0.3s ease;
}

.address-submit:hover svg {
  stroke: v-bind(themeColor); /* stays white on orange bg */
  transform: translateX(2px); /* slight movement forward on hover */
}

.excerpt {
    margin-bottom: 1rem;
    margin-top: 1rem;
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

.watch-video {
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;    /* Vertically centers items in the row */
  justify-content: center;
  gap: 15px;              /* Reduced gap for a tighter feel */
  color: v-bind(themeColor);
  margin-top: 2rem;
  width: 100%;
  transition: transform 0.2s ease;

}

.watch-video * {
  pointer-events: none; /* ensures the entire area clicks the link */
}

.watch-video:hover {
    transform: scale(1.05);
}

.watch-video p {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -1px;   /* Reduces space between letters */
  line-height: 1;         /* Ensures the text box doesn't have extra height */
  white-space: nowrap;
}

.watch-video-btn {
  margin-left: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;  /* Match play-button width */
  height: 40px; /* Match play-button height */
}

.video-pulse {
  position: absolute; /* Moves pulse out of the layout flow */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid;
  border-radius: 50%;
  animation: pulse 2s infinite;
  pointer-events: none;
}


/* Update the keyframes to remove the manual translate if using top/left 50% */
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.6);
    opacity: 0;
  }
}

.play-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    background-color: v-bind(themeColor);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.play-button:hover {
    transform: scale(1.1);
}
</style>


