<script setup>
import mainPhoto from "../data/images/hero_pic_.webp";
import { themeColor, themeColorOrange, themeColorGold, themeColorWhite,
         youtubeVideoUrl, app_login_url } from "../config.js";

import { ref } from 'vue'

const showVideo = ref(false)

const steps = [
  {
    number: "01",
    verb: "Define",
    subject: "Machines",
  },
  {
    number: "02",
    verb: "Define",
    subject: "Materials",
  },
  {
    number: "03",
    verb: "Define",
    subject: "Products",
  },
  {
    number: "04",
    verb: "Let Coworkers",
    subject: "Access",
  },
  {
    number: "05",
    verb: "Let 3D Files",
    subject: "Errors Free",
  },
  {
    number: "06",
    verb: "Let Customers",
    subject: "Purchase",
  },
];
</script>

<template>
<section class="hw-section" id="how_does_it_work">
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
  
  <div class="hw-inner">    
    <!-- Left: heading + image -->
    <div class="hw-left" data-aos="fade-right" data-aos-duration="700">
      <h2 class="hw-heading">
        <span :style="{ color: themeColorOrange }">Define</span> your Factory
        as Software
        </br> <span :style="{ color: themeColorOrange }">Customers</span> use it to interact with&nbsp;you
        <span :style="{ color: themeColorOrange }">Collegues</span> avoid manufacturing errors 
      </h2>
      <!-- <p class="hw-sub"> -->
      <!--   Gates hosts a public CAD Online to funnel orders while providing your -->
      <!--   team the Manufacturing Hub to supervise every step, from design to -->
      <!--   delivery. -->
      <!-- </p> -->
      <div class="hw-img-wrap">
        <img
          :src="mainPhoto"
          alt="Factory software illustration"
          class="hw-img"
          />
        <div class="hw-img-glow" />
      </div>
      <div
        class="watch-video"
        role="button"
        tabindex="0"
        @click="showVideo = true" >
        <p class="hand-underline">SEE IT IN ACTION</p>
        
        <div class="watch-video-btn">
          <div class="play-button">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="white">
              <path
                d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                />
            </svg>
            <div class="video-pulse"></div>
            
          </div>
        </div>
      </div>
    </div>
    
    <!-- Right: 6 tiles (2 rows × 3 columns) -->
    <div class="hw-right">
      <a
        v-for="(step, i) in steps"
        :key="step.number"
        :href="app_login_url"
        class="hw-tile"
        :data-aos="'fade-up'"
        :data-aos-delay="i * 60"
        >
          <span class="hw-tile-num">{{ step.number }}</span>
          <div class="hw-tile-title">
            <span class="hw-tile-verb">{{ step.verb }} </span>
          </div>
          <div class="hw-tile-title2">
            <span class="hw-tile-subject">{{ step.subject }}</span>
          </div>
          <p class="hw-tile-desc">{{ step.description }}</p>
       </a>
    </div>
     
    </div>
  </section>
</template>

<style scoped>
/* ── Section shell ───────────────────────────────────────────── */
.hw-section {
  background: #f8f9fb;
  padding: 5rem 1.5rem;
}

.hw-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 2.5rem;
  align-items: center;
}

/* ── Left column ─────────────────────────────────────────────── */
.hw-left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: sticky;
  top: 6rem;
}

.hw-heading {
  font-size: clamp(1.6rem, 2.3vw, 2.0rem);
  font-weight: 700;
  line-height: 1.25;
  color: v-bind(themeColor);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.hw-sub {
  color: #5a6270;
}

/* Image */
.hw-img-wrap {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  margin-top: 0.5rem;
}

.hw-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 1.25rem;
  border: 2px solid v-bind(themeColor);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform: scale(1);
  will-change: transform;
  backface-visibility: hidden;
}

/* .hw-img:hover { */
/*   transform: scale(1.03); */
/*   box-shadow: 0 20px 56px rgba(0, 0, 0, 0.22); */
/* } */

/* .hw-img-glow { */
/*   position: absolute; */
/*   inset: 0; */
/*   border-radius: 1.25rem; */
/*   pointer-events: none; */
/*   background: linear-gradient( */
/*     135deg, */
/*     rgba(255, 255, 255, 0.06) 0%, */
/*     transparent 60% */
/*   ); */
/* } */

/* ── Right column: tile grid ─────────────────────────────────── */
.hw-right {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.9rem;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hw-inner {
    grid-template-columns: 1fr;
  }
  .hw-left {
    position: static;
  }
  /* Keep 3-col layout on tablets too */
  .hw-right {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .hw-right {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}

@media (max-width: 420px) {
  .hw-right {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
}

/* ── Enhanced Realistic Tiles ─────────────────────────────────── */

.hw-tile {
  /* Use a gradient instead of a solid color for "material" feel */
  background: linear-gradient(
    145deg, 
    v-bind(themeColor) 0%, 
    #1a1d23 100% /* Slightly darker shade of your theme color */
  );
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  display: flex;
  aspect-ratio: 1/0.9;
  flex-direction: column;
  justify-content: flex-end; /* Push text to bottom for a modern look */
  position: relative;
  /* border-radius: 0.2rem; /\* Smoother corners *\/ */
  overflow: hidden;
  
  /* The "Thickness" effect */
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Multi-layered shadow for depth */
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.2); 
    
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.hw-tile:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: v-bind(themeColorWhite);
  box-shadow: 
    0 20px 40px -15px rgba(0, 0, 0, 0.6),
    inset 0 1px 2px rgba(255, 255, 255, 0.4);
}

/* Subtle "Spotlight" overlay */
.hw-tile::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
  pointer-events: none;
}

/* Realistic Number Badge */
.hw-tile-num {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%; /* Squircle looks more modern than a circle */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  border: 4px solid v-bind(themeColorWhite);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: v-bind(themeColorWhite); /* Contrast color for the number */
  transition: transform 0.4s ease;
}

.hw-tile:hover .hw-tile-num {
  transform: rotate(5deg);
  background: v-bind(themeColorWhite);
  color: v-bind(themeColor);
}

/* Refined Typography */
.hw-tile-title {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.2rem;
}

.hw-tile-title2 {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.1;
  color: v-bind(themeColorWhite);
  margin: 0;
}

.hw-tile-desc {
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
  /* Add a divider line */
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* video */

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

/* Overlay */
.video-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Video container */
.video-wrapper {
  position: relative;
  width: min(900px, 90vw);
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

/* Iframe */
.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Close button */
.video-close {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 999px;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.video-close:hover {
  background: rgba(0, 0, 0, 0.85);
}

</style>
