<script setup>
import mainPhoto from "../data/images/platform_logic_pic.webp";
import { themeColor, themeColorOrange, themeColorGold, themeColorWhite,
         youtubeVideoUrl, app_login_url } from "../config.js";
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
  <div class="hero-row flex flex-col w-full p-12 items-center justify-center gap-14">
      
    <h2 class="heading mb-3">
      <em>AUTONOMOUS MISTAKES DETECTION IN MECHANICAL ENGINEERING</em>
      <span class="title-line-2">THAT WORKS ON FACTORY NETWORKS</span>
    </h2>
    
    <!-- <div class="hero-split-grid"> -->
    <div class="mb-12">
      <div class="hero-img-pane" data-aos="fade-left" data-aos-duration="700">
        <img :src="mainPhoto" alt="Platform Logic Graphic" class="hero-img-fluid" />
      </div>

      <div class="hero-tiles-pane" data-aos="fade-right" data-aos-duration="700">
        <div class="hw-right">
            <!-- :key="tile.number" -->
          <a
            v-for="(tile, i) in tiles"
            class="hw-tile mt-8"
            :class="tile.even ? 'white-tile' : 'blue-tile'"
            data-aos="fade-up"
            :data-aos-delay="i * 100"
            @click="clicking_tile(tile)">
            
            <!-- <span class="hw-tile-num">{{ tile.number }}</span> -->
            <div class="hw-tile-content-area">
              <div class="hw-tile-title">
                <span class="hw-tile-verb">{{ tile.verb }} </span>
              </div>
              <div class="hw-tile-title2">
                <span class="hw-tile-subject">{{ tile.subject }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
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

/* ── Asset Wrapper Column Proportions ───────────────────────── */
.hero-img-pane {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-img-fluid {
    width: 100%;
    max-width: 580px;
    height: auto;
    object-fit: contain;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}


/* Ensure the wrapper pane stretches fully */
.hero-tiles-pane {
    width: 100%;
    display: flex;
}

.heading {
    line-height: 1.2;
    font-size: clamp(1.8rem, 2vw, 4rem);
}

/* ── Tile System Layout Grid ─────────────────────────────────── */
.hw-right {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Stretch grid items vertically across the row */
    grid-auto-rows: 1fr; 
    align-items: stretch;
    gap: clamp(0.75rem, 1.5vw, 1.25rem);
    width: 100%;
    position: relative;
}

/* ── High-Fidelity Interactive Cards ────────────────────────── */
.hw-tile {
    text-decoration: none;
    padding: 1.25rem;
    display: flex;
    /* aspect-ratio: 1 / 1; */
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    border-radius: 1.25rem;
    overflow: hidden;
    min-width: 0; 
    z-index: 1;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
    cursor: pointer;
}

.blue-tile {
    background: linear-gradient(135deg, v-bind(themeColor) 0%, #17262e 100%);
}

.white-tile {
    background: linear-gradient(135deg, #2c4957 0%, #1a2b34 100%);
}

.hw-tile:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.3);
    z-index: 5;
}

/* Internal Dynamic Content Positioning */
.hw-tile-content-area {
    position: relative;
    z-index: 2;
    margin-top: auto;
}

/* Compact Numeric Micro-Badges */
.hw-tile-num {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    border: 1.5px solid v-bind(themeColorWhite);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    color: v-bind(themeColorWhite);
}

/* Typography Constraints */
.hw-tile-title {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.15rem;
}

.hw-tile-title2 {
    font-size: clamp(1rem, 2.4vw, 1.9rem);
    font-weight: 700;
    line-height: 1.2;
    color: v-bind(themeColorWhite);
    word-break: break-word;
}

/* ── Media Queries (Responsive Balance Fixes) ──────────────── */
@media (max-width: 1024px) {
    .hero-split-grid {
        grid-template-columns: 1fr; /* Drop side-by-side strategy early for small monitors */
        gap: 3rem;
    }
    .hero-img-fluid {
        max-width: 450px;
    }
}

@media (max-width: 768px) {
    .hero-section-container {
        padding: 1.5rem 1.25rem;
        margin: 2rem auto;
    }
    .hw-right {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
    }
    .hw-right::before, .hw-right::after {
        display: none; /* Hide baseline connectors on smaller grids */
    }
    /* Squares get very tall once stacked two-per-row on a narrow
       viewport — relax the aspect ratio so six tiles don't turn
       into a marathon of scrolling. */
    .hw-tile {
        aspect-ratio: 4 / 5;
        padding: 1rem;
    }
    .title-line-2 {
        line-height: 1.35;
    }
}

@media (max-width: 480px) {
    .hw-right {
        grid-template-columns: 1fr;
    }
    .hw-tile {
        aspect-ratio: 16 / 9;
    }
    .hero-section-container {
        padding: 1.25rem 1rem;
    }
    .hero-img-fluid {
        max-width: 100%;
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
