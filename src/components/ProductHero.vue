<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import background from "../data/images/background_pic.webp";
import { themeColor, themeColorOrange, themeColorLille, themeColorWhite,
         app_login_url, demo_url } from "../config.js";

const contextSources = [
    { name: 'Bracket v4.step', icon: 'file' },
    { name: 'Titanium Flange.step', icon: 'file' },
    { name: 'Material specification.csv', icon: 'text' },
    { name: 'Process rules.pdf', icon: 'home' },
    { name: 'DFM checklist.pdf', icon: 'info' }
];

// Tab state: 'upload' | 'analysis'
const activeTab = ref('analysis');

function setTab(tab) {
    activeTab.value = tab;
}
</script>

<template>
<div class="untree_co-hero" id="hero" :style="{ backgroundImage: `url(${background})` }">
  <div class="container wider-container">
    <div class="row align-items-center">
      <div class="col-12 my-5" id="header">
        <div class="row align-items-center gy-5">
          
          <div class="col-lg-5 ml-2">
            
            <!-- Heading -->
            <h1 class="heading"
                data-aos="fade-up"
                data-aos-delay="100">
              Unified intake for<br>
              <em :style="{color: themeColorOrange}">Engineers, Clients,</em><br>
              and Vendors
            </h1>
            
            <!-- Subheading -->
            <p class="subheading" data-aos="fade-up" data-aos-delay="130">
              It catches autonomously manufacturability issues in your CAD library before production, from whatever way they are generated... from a customers or an employees. A gatekeeper for factories who deal a lot of customers or huge CAD libraries.
            </p>
            
            <!-- Feature list -->
            <ul class="hero-feature-list" data-aos="fade-up" data-aos-delay="160">
              <li>
                <span class="feat-check">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.2L4.2 7.5L8 3" stroke="currentColor" stroke-width="1.8"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                Standardize file from your customers / internal department
              </li>
              <li>
                <span class="feat-check">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.2L4.2 7.5L8 3" stroke="currentColor" stroke-width="1.8"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                Guarantee manufacturability at every stage
              </li>
              <li>
                <span class="feat-check">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.2L4.2 7.5L8 3" stroke="currentColor" stroke-width="1.8"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                Maintain the highest-quality CAD library possible
              </li>
            </ul>
            
            <!-- CTA row -->
            <div class="cta-row" data-aos="fade-up" data-aos-delay="190">
              <a class="btn-primary-cta" :href="app_login_url">
                Start your Virtual Factory
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
                </svg>
              </a>
              <a class="btn-ghost-cta" :href="demo_url">Visualize Your Workshop</a>
            </div>
            
            <!-- Social proof -->
            <!-- <div class="social-proof" data-aos="fade-up" data-aos-delay="220"> -->
              <!--   <div class="avatars"> -->
                <!--     <div class="avatar" style="background: v-bind(themeColor);">JM</div> -->
                <!--     <div class="avatar" style="background: #533AB7;">AR</div> -->
                <!--     <div class="avatar" style="background: #0F6E56;">TC</div> -->
                <!--     <div class="avatar" style="background: #993C1D;">BL</div> -->
                <!--   </div> -->
              <!--   <div class="proof-text"> -->
                <!--     <div class="stars">★★★★★</div> -->
                <!--     <span>Trusted by <strong>300+ manufacturing teams</strong></span> -->
                <!--   </div> -->
              <!-- </div> -->
            
          </div>
          
          <div class="col-lg-7">
            <div class="mfg-shell" >
              <div class="mfg-grid-bg"></div>
              
              <div class="mfg-top-bar">
                <div class="seg-control">
                  <button
                    class="seg-btn m-1"
                    :class="{ active: activeTab === 'upload' }"
                    @click="setTab('analysis')"  >
                    Autonomous Routines</button>
                  <button
                    class="seg-btn m-1"
                    :class="{ active: activeTab === 'analysis' }"
                    @click="setTab('upload')" > Issues Resolution Interface
                  </button>
                </div>
              </div>
              
              <!-- UPLOAD TAB: show video -->
              <div v-if="activeTab === 'upload'" class="mfg-body video-body">
                <div class="video-container">
                  <img src="../data/images/screenshot.png" class="hero-video" >
                    </img >
                    
                    <!--   <video -->
                    <!--     autoplay -->
                    <!--     muted -->
                    <!--     loop -->
                    <!--     playsinline -->
                    <!--     class="hero-video" -->
                    <!--   > -->
                      <!--     <source src="../data/video/product_video2.webm" type="video/webm"> -->
                      <!--     Your <br />owser does not support the video tag. -->
                      <!--   </video> -->
                </div>
              </div>
              
              <!-- ANALYSIS TAB: show panels -->
              <div v-else class="mfg-body">
                <div class="panel-files">
                  <div class="panel-card">
                    <div class="panel-header">
                      <div class="icon-blue">
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 3C17.3284 3 18 3.67157 18 4.5V15.5C18 16.3284 17.3284 17 16.5 17H3.5C2.67157 17 2 16.3284 2 15.5V6.5C2 5.67157 2.67157 5 3.5 5H10.793L12.3535 3.43945L12.4639 3.33984C12.7307 3.12123 13.0661 3.00003 13.4141 3H16.5Z" /></svg>
                      </div>
                      <div class="search-pill">
                        <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" style="color:v-bind(themeColor);flex-shrink:0"><path d="M8.5 2C12.0899 2 15 4.91015 15 8.5C15 10.1149 14.4094 11.5908 13.4346 12.7275L17.8535 17.1465L17.918 17.2246C18.0461 17.4187 18.0244 17.6827 17.8535 17.8535C17.6827 18.0244 17.4187 18.0461 17.2246 17.918L17.1465 17.8535L12.7275 13.4346C11.5908 14.4094 10.1149 15 8.5 15C4.91015 15 2 12.0899 2 8.5C2 4.91015 4.91015 2 8.5 2ZM8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C11.5376 14 14 11.5376 14 8.5C14 5.46243 11.5376 3 8.5 3Z" /></svg>
                        <span style="font-size:10px;">Search</span>
                      </div>
                    </div>
                    
                    <div class="file-grid">
                      <div class="file-item">
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="6" y="8" width="28" height="26" rx="3" fill="#45B3E0" stroke="#3BA6D4" stroke-width="0.5" />
                          <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#5AC8FA" />
                          <line x1="10" y1="20" x2="30" y2="20" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                          <line x1="10" y1="24" x2="24" y2="24" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <span class="file-label">STEP / IGES</span>
                      </div>
                      <div class="file-item">
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="6" y="8" width="28" height="26" rx="3" fill="#5E6AD2" stroke="#4A54C1" stroke-width="0.5" />
                          <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#7B84E3" />
                          <polygon points="12,28 20,14 28,28" fill="none" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                        <span class="file-label">Machines Avail.</span>
                      </div>
                      <div class="file-item">
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="6" y="8" width="28" height="26" rx="3" fill="#45B3E0" stroke="#3BA6D4" stroke-width="0.5" />
                          <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#5AC8FA" />
                          <rect x="10" y="17" width="20" height="12" rx="1" fill="none" stroke="white" stroke-width="1.2" />
                        </svg>
                        <span class="file-label">Drawing DWG</span>
                      </div>
                      <div class="file-item">
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="6" y="8" width="28" height="26" rx="3" fill="#34C759" stroke="#28A347" stroke-width="0.5" />
                          <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#4CD870" />
                          <path d="M13 22 L18 17 L23 22 L28 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                        </svg>
                        <span class="file-label">Tolerance G&T</span>
                      </div>
                    </div>
                    
                    <div class="panel-footer">
                      <button class="btn-cancel">Cancel</button>
                      <button class="btn-open">Analyze</button>
                    </div>
                  </div>
                </div>
                
                <div class="panel-progress">
                  <div class="panel-card">
                    <div class="progress-header mb-2">
                      <span> Found Issues in CAD Library </span>
                    </div>
                    <div style="padding: 0 12px 12px;">
                      <div class="check-row">
                        <div class="check-circle">✓</div>
                        <span class="check-text">Draft Angles OK</span>
                      </div>
                      <div class="check-row">
                        <div class="check-circle warn">!</div>
                        <span class="check-text warn">Undercut on face #7 — review needed</span>
                      </div>
                      <div class="check-row">
                        <div class="check-circle warn">!</div>
                        <span class="check-text warn">Material too slim on #21 - review needed</span>
                      </div>
                      <div class="check-row">
                        <div class="check-circle">✓</div>
                        <span class="check-text">Lead time OK</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="panel-context">
                  <div class="panel-card">
                    <div class="progress-header">
                      <span>Files around the Factory</span>
                    </div>
                    <div style="display:flex;
                                flex-direction:column;
                                padding: 8px;">
                      <div v-for="src in contextSources" :key="src.name" class="context-item">
                        <span class="ctx-label">{{ src.name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    background-position: center top;
    width: 100%;
}

.heading {
    line-height: 1.18;
    letter-spacing: -0.03em;  
    font-size: 3.5rem; 
    font-weight: 700;
}

.heading .block {
    display: block;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.btn-hover:hover {
    color: v-bind(themeColorWhite);
    background-color: v-bind(themeColorOrange);
}

.hero-list {
    list-style: none; /* Removes default bullets */
    padding: 0;
    margin: 0 0 1.5rem 0;
}

.hero-list li {
    font-size: 1.25rem; /* Standard h4 size approx */
    font-weight: 500;
    line-height: 1.6;
    color: v-bind(themeColor); /* Or your preferred text color */
    position: relative;
    padding-left: 0;
    margin-bottom: 0.5rem;
}

.address-form {
    display: flex;
    gap: 10px;
    margin-top: 2rem;
    border-radius: 14px;
    padding: 6px;
    font-size: 1.1rem;
}

.address-input {
    flex: 1;
    padding: 0.9rem 1.2rem;
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
    background: linear-gradient(
        145deg, 
        v-bind(themeColor) 0%, 
        #1a1d23 100%
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
    height: 20px;
    stroke: v-bind(themeColorWhite);
    transition: stroke 0.3s ease, transform 0.3s ease;
}

.address-submit:hover svg {
    transform: translateX(2px);
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

/* ── Shell ── */

@keyframes gridReveal {
    from { clip-path: circle(0% at 50% 50%); }
    to { clip-path: circle(150% at 50% 50%); }
}
@keyframes panelSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.mfg-shell {
    width: 100%;
    min-height: 600px;
    border-radius: 25px;
    background: v-bind(themeColorWhite);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.mfg-grid-bg {
    position: absolute;
    inset: 0;
    background: v-bind(themeColorWhite);
    background-size: 48px 48px;
    background-position: 24px 24px;
    animation: 2500ms cubic-bezier(0.22, 1, 0.36, 1) forwards gridReveal;
    transition: opacity 0.35s ease;
}

.mfg-top-bar {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: center;
    padding: 20px 0 0;
}

.seg-control {
    display: inline-flex;
    background: white;
    /* v-bind(themeColorLille); */
    border: 0.5px solid rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 2px;
    gap: 0;
    position: relative;
    box-shadow: 0 8px 20px rgba(0,0,0,0.10);
}

.seg-btn {
    border: none;
    background: v-bind(themeColor);
    padding: 6px 20px;
    font-size: 15px;
    color: v-bind(themeColorWhite);
    
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: color 200ms, background 200ms;
    min-width: 110px;
}

.seg-btn.active {
    color: v-bind(themeColor);
    background: transparent;
}

.mfg-body {
    position: relative;
    flex: 1;
}

.mfg-grid-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0; 
    pointer-events: none; 
    background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 3rem 3rem;
    animation: fadeIn 1s ease forwards;
}

/* ── VIDEO (Upload tab) ── */

.video-body {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 20px 20px;
}

.video-container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    animation: fadeIn 0.4s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.hero-video {
    width: 100%;
    height: auto;   /* image dictates its own height */
    display: block;
}
/* .hero-video { */
/*     width: 100%; */
/*     height: 100%; */
/*     object-fit: cover; */
/*     display: block; */
/* } */

/* ── PANELS (Analysis tab) ── */

.panel-files {
    position: absolute;
    left:-6px;
    top: 20px;
    z-index: 2;
    opacity: 0;
    animation: 400ms ease-out 650ms forwards panelSlideUp;
}

.panel-card {
    background: v-bind(themeColorWhite);
    border: 0.5px solid v-bind(themeColor);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
}

.panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-bottom: 0.5px solid v-bind(themeColorLille);
}

.icon-blue {
    width: 20px; height: 20px;
    border-radius: 4px;
    background: v-bind(themeColorOrange);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
}

.search-pill {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    background: v-bind(themeColorLille);
    border-radius: 6px;
    padding: 4px 8px;
}

.file-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    padding: 10px;
    width: 200px;
}

.file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 6px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 150ms;
}

.file-item:hover { background: v-bind(themeColorLille); }

.file-label {
    font-size: 10px;
    text-align: center;
    color: v-bind(themeColor);
    line-height: 1.3;
}

.panel-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 6px 10px;
    border-top: 0.5px solid v-bind(themeColorLille);
}

.btn-cancel {
    border: 0.5px solid v-bind(themeColor);
    background: v-bind(themeColorWhite);
    border-radius: 6px;
    padding: 2px 14px;
    font-size: 10px;
    color: v-bind(themeColor);
    cursor: pointer;
}

.btn-open {
    background: v-bind(themeColor);
    border: none;
    border-radius: 6px;
    padding: 2px 14px;
    font-size: 10px;
    color: v-bind(themeColorWhite);
    cursor: pointer;
}

/* Center panel: feasibility progress */
.panel-progress {
    position: absolute;
    left: 30%;
    top: 170px;
    z-index: 4;
    opacity: 0; /* Need to fades */
    animation: 400ms ease-out 900ms forwards panelSlideUp;
    width: 260px;
}

.progress-header {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 700;
    color: v-bind(themeColor);
    justify-content: space-between;
    border-bottom: 0.5px solid v-bind(themeColorLille);
    padding: 12px 14px 10px;
}

.check-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 12px 10px;
    border-radius: 8px;
}

.check-row:hover { background: v-bind(themeColorLille); }

.check-circle {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: v-bind(themeColor);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    color: white;
}

.check-circle.warn {
    background: v-bind(themeColorOrange);
}

.check-text {
    font-size: 13px;
    text-decoration: line-through;
    line-height: 1.4;
    color: v-bind(themeColor);
}

.check-text.warn {
    text-decoration: none;
}

/* Right panel: context */
.panel-context {
    position: absolute;
    right: 10px;
    top: 30px;
    z-index: 2;
    opacity: 0; /* Need to fades */
    animation: 400ms ease-out 1150ms forwards panelSlideUp;
    width: 240px;
}

.context-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 2px 8px;
    padding: 8px 9px 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 150ms;
    text-decoration: none;
}

.context-item:hover { background: v-bind(themeColorLille); }

.ctx-icon {
    width: 26px; height: 26px;
    border-radius: 6px;
    background: v-bind(themeColorLille);
    border: 0.5px solid v-bind(themeColor);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
}

.ctx-label {
    font-size: 12px;
    color: v-bind(themeColor);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #34C759;
    animation: pulse-dot 1.8s infinite;
    flex-shrink: 0;
    margin-left: auto;
}


.subheading {
    line-height: 1.35;
    margin-top: 1.2rem;
    margin-bottom: 1.8rem;
    max-width: 460px;
}

.hero-feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
    color: v-bind(themeColor);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.hero-feature-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
}

.feat-check {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: v-bind(themeColor);
    /* border: 0.5px solid v-bind(themeColorWhite); */
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: v-bind(themeColorWhite);
}

.cta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 2.2rem;
}

.btn-primary-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.75rem 1.4rem;
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
}

.btn-primary-cta:hover { opacity: 0.88; transform: translateY(-1px); }

.btn-primary-cta svg {
    width: 15px; height: 15px;
    stroke: v-bind(themeColorWhite);
}

.btn-ghost-cta {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.2rem;
    background: transparent;
    border: 0.5px solid rgba(0,0,0,0.18);
    border-radius: 10px;
    font-size: 0.95rem;
  color: inherit;
  text-decoration: none;
  transition: background 0.15s;
}

.btn-ghost-cta:hover { background: rgba(0,0,0,0.04); }

.social-proof {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatars {
  display: flex;
}

.avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 2px solid white;
  margin-right: -8px;
  font-size: 10px;
  font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}

.proof-text {
  font-size: 12.5px;
  color: #666;
  line-height: 1.5;
}

.proof-text strong { color: inherit; font-weight: 600; }

.stars { color: #BA7517; font-size: 12px; letter-spacing: 1px; }
</style>
