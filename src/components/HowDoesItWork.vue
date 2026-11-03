<script setup>
import mainPhoto from "../data/images/resume_platform.webp";
import { themeColor, themeColorOrange, themeColorGold, themeColorWhite,
         youtubeVideoUrl, app_login_url } from "../config.js";
import screenshot from "../data/images/screenshot.png";

import { ref } from 'vue'

const showVideo = ref(false)

const tiles = [
    {
        // number: "01",
        verb: "FIND EVERY FILES",
        even: false,
        url: app_login_url,
        subject: "Works where your CAD lives",
    },
    {
        // number: "02",
        verb: "CHECKS ON YOU",
        even: true,  
        subject: "Catch your Own Mistakes",
    },
    {
        // number: "03",
        verb: "AN ADDED SERVICE",
        even: false,  
        url: app_login_url,
        subject: "Customers Arrive Pre-checked",
    },
    // {
    //     number: "04",
    //     verb: "Let 3D Files",
    //     even: true,  
    //     subject: "Error-Free",
    // },
    // {
    //     number: "05",
    //     verb: "Let Coworkers",
    //     even: false,  
    //     url: app_login_url,
    //     subject: "Verify",
    // },
    // {
    //     number: "06",
    //     verb: "Let Customers",
    //     even: true,  
    //     subject: "Purchase",
    // },
];

function clicking_tile(tile) {
    if (tile.even) {
        showVideo.value = true
    } else {
        window.location.href = app_login_url;
    }
}
</script>

<template>
<div v-if="showVideo" class="video-overlay">
  <div class="video-wrapper">
    <button class="video-close" @click="showVideo = false">✕</button>      
    <iframe
      :src="youtubeVideoUrl"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
      ></iframe>
  </div>
</div>

<!-- <div id="hero" class="hero-section-container"> -->
<div class="flex flex-col p-12 items-center justify-center gap-14 w-full">  
  <h2 class="heading mb-3">
    <em>AUTONOMOUS MISTAKES DETECTION IN MECHANICAL ENGINEERING</em>
    <span class="title-line-2">THAT WORKS ON FACTORY NETWORKS</span>
  </h2>
    
  <div class="screenshot-wrap mb-16 w-4/5" data-aos="fade-up" data-aos-delay="80">
    <img
      :src="screenshot"
      alt="Huckster Interface portal showing a CAD upload and manufacturability check"
      class="screenshot"
      />
  </div>

  <!-- <div data-aos="fade-right mb-3" data-aos-duration="700"> -->
  <!--   <div class="hw-right"> -->
  <!--     <a -->
  <!--       v-for="(tile, i) in tiles" -->
  <!--       class="hw-tile mt-8" -->
  <!--       :class="tile.even ? 'white-tile' : 'blue-tile'" -->
  <!--       data-aos="fade-up" -->
  <!--       :data-aos-delay="i * 100" -->
  <!--       @click="clicking_tile(tile)"> -->
        
  <!--       <\!-- <span class="hw-tile-num">{{ tile.number }}</span> -\-> -->
  <!--       <div class="hw-tile-content-area"> -->
  <!--         <div class="hw-tile-title"> -->
  <!--           <span class="hw-tile-verb">{{ tile.verb }} </span> -->
  <!--         </div> -->
  <!--         <div class="hw-tile-title2"> -->
  <!--           <span class="hw-tile-subject">{{ tile.subject }}</span> -->
  <!--         </div> -->
  <!--       </div> -->
  <!--     </a> -->
  <!--   </div> -->
  <!-- </div> -->
</div>
</template>

<style scoped>
/* ── Typography Enhancements ────────────────────────────────── */
.title-line-2 {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    line-height: 1.3;
    font-weight: 400;  
    margin-top: 0.5rem;
    display: block;
    color: #223843;
}

.heading {
    line-height: 1.2;
    font-size: clamp(1.8rem, 2vw, 4rem);
}

@media (max-width: 768px) {
    .title-line-2 {
        line-height: 1.35;
    }
}

/* ── Overlay System ─────────────────────────────────────────── */
.video-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
    box-sizing: border-box;
}

.video-wrapper {
    position: relative;
    width: min(900px, 92vw);
    aspect-ratio: 16 / 9;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
}

.video-wrapper iframe {
    width: 100%;
    height: 100%;
}

.video-close {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1rem;
    cursor: pointer;
}
</style>
