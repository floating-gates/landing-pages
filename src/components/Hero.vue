<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import background from "../data/images/background_pic.webp";
import { themeColor, themeColorOrange, themeColorLille, themeColorWhite,
         app_login_url, demo_url } from "../config.js";
import {
    SmallCheckIcon,
    ChevronDoubleRight,
    FolderIcon,
    SearchIcon,
} from "../helper/icons_generator.js";
import { startBushmanCad } from "../helper/rocket_wireframe.js";

const gdntPdfs = [
    { name: 'Bracket_v4.pdf', kind: 'bracket', number: 'DRW-1042' },
    { name: 'Cover_RevC.pdf', kind: 'flange', number: 'DRW-1188' },
    { name: 'Flange_Titanium.pdf', kind: 'cover', number: 'DRW-2304' },
    { name: 'Housing_A12.pdf', kind: 'housing', number: 'DRW-2210' },
    { name: 'Shaft_D12.pdf', kind: 'shaft', number: 'DRW-2031' }
];

const activeTab = ref('analysis');
const cadCanvas = ref(null);
let stopCad = null;

function setTab(tab) {
    activeTab.value = tab;
}

function startCadViewport() {
    stopCad?.();
    stopCad = null;
    if (!cadCanvas.value) return;
    stopCad = startBushmanCad(cadCanvas.value, {
        ink: themeColor,
        accent: themeColorOrange,
        grid: "rgba(34, 56, 67, 0.12)",
    });
}

watch(activeTab, async (tab) => {
    if (tab === "analysis") {
        await nextTick();
        startCadViewport();
        return;
    }
    stopCad?.();
    stopCad = null;
});

onMounted(async () => {
    if (activeTab.value === "analysis") {
        await nextTick();
        startCadViewport();
    }
});

onBeforeUnmount(() => {
    stopCad?.();
    stopCad = null;
});
</script>

<template>
<div class="untree" :style="{ backgroundImage: `url(${background})` }">
  <div class="hero-row flex flex-row w-full p-12 items-center justify-center gap-14">
    <div class="hero-copy min-w-fit">
      <h1 class="heading" data-aos="fade-up" data-aos-delay="100">
        <!-- Autonomous Design Flaws <br> -->
        <!-- <em>Discovery for Engineers,</em> <br> -->
        <!-- Suppliers and Customers.<br> -->
        Autonomous Detection  <br>
        of <em>Discrepancies</em> in CAD  <br>
        and Technical Drawings
        <!-- and Future Maintenance <br> -->
      </h1>
      
      <p class="subheading" data-aos="fade-up" data-aos-delay="130">
        It's a sofware that performs autonomous document revision (CAD and GD&T) to spot manufacturing issues. Every file in the design deparments encounter a critical checkpoint by which they are either green lit or highlighted for revision.
      </p>
      
      <ul class="hero-feature-list" data-aos="fade-up" data-aos-delay="160">
        <li>
          <span class="feat-check">
            <SmallCheckIcon width="10" height="10" />
          </span>
          Spot errors and Standardize adherence to design playbook
        </li>
        <li>
          <span class="feat-check">
            <SmallCheckIcon width="10" height="10" />
          </span>
          Guarantee manufacturability at every stage
        </li>
        <li>
          <span class="feat-check">
            <SmallCheckIcon width="10" height="10" />
          </span>
          Allow suppliers to follow your design conventions
        </li>
      </ul>
      
      <div class="cta-row" data-aos="fade-up" data-aos-delay="190">
        <a class="btn-primary-cta" :href="app_login_url">
          Start for Free
          <ChevronDoubleRight stroke-width="2.5" />
        </a>
        <a class="btn-ghost-cta font-bold" :href="demo_url">
          Demo using Huckster Interface
          <ChevronDoubleRight stroke-width="2.5" :stroke="themeColor" width="13" height="13" />
        </a>
      </div>
    </div>
    <div class="mfg-shell">
      <div class="mfg-grid-bg"></div>
      
      <div class="mfg-top-bar mx-5">
        <div class="seg-control">
          <button
            class="seg-btn m-1"
            :class="{ active: activeTab === 'upload' }"
            @click="setTab('analysis')">
            Autonomous Checks</button>
          <button
            class="seg-btn m-1"
            :class="{ active: activeTab === 'analysis' }"
            @click="setTab('upload')">
            Huckster Interface
          </button>
        </div>
      </div>
      
      <!-- UPLOAD TAB -->
      <div v-if="activeTab === 'upload'" class="mfg-body video-body">
        <div class="video-container">
          <img src="../data/images/screenshot.png" class="hero-video">
        </div>
      </div>
      
      <!-- ANALYSIS TAB -->
      <div v-else class="mfg-body">
        <div class="panel-files">
          <div class="panel-card">
            <div class="panel-header">
              <div class="icon-blue">
                <FolderIcon width="12" height="12" fill="white" />
              </div>
              <div class="search-pill">
                <SearchIcon width="11" height="11" fill="currentColor" :style="{color: themeColor, flexShrink: 0}" />
                <span style="font-size:10px;">Search</span>
              </div>
            </div>
            
            <div class="file-grid mt-2">
              <div
                v-for="(pdf, i) in gdntPdfs"
                :key="pdf.name"
                class="pdf-sheet"
                :style="{ '--i': String(i), zIndex: 4 - Math.abs(i - 2) }"
              >
                <span class="pdf-fold" aria-hidden="true"></span>
                <span class="pdf-badge">PDF</span>

                <svg v-if="pdf.kind === 'bracket'" class="pdf-drawing" viewBox="0 0 82 72" fill="none" aria-hidden="true">
                  <rect x="6" y="4" width="70" height="54" stroke="#223843" stroke-width="0.6"/>
                  <path d="M18 14 H50 V32 H38 V50 H18 Z" fill="#EFF1F3" stroke="#223843" stroke-width="0.85"/>
                  <circle cx="29" cy="23" r="3.4" stroke="#223843" stroke-width="0.75"/>
                  <path d="M29 19.2 V26.8 M25.2 23 H32.8" stroke="#223843" stroke-width="0.35"/>
                  <path d="M18 54 H38" stroke="#D77A61" stroke-width="0.55"/>
                  <path d="M18 52.6 V55.4 M38 52.6 V55.4" stroke="#D77A61" stroke-width="0.55"/>
                  <text x="28" y="60" fill="#D77A61" font-size="5" text-anchor="middle" font-family="system-ui,sans-serif">24</text>
                  <g transform="translate(42,36)">
                    <rect width="30" height="8.2" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                    <path d="M8 0 V8.2 M21.2 0 V8.2" stroke="#223843" stroke-width="0.4"/>
                    <circle cx="4" cy="4.1" r="2" stroke="#223843" stroke-width="0.55"/>
                    <path d="M4 2 V6.2 M2 4.1 H6" stroke="#223843" stroke-width="0.4"/>
                    <text x="14.6" y="5.8" fill="#223843" font-size="4.2" text-anchor="middle" font-family="system-ui,sans-serif">Ø0.05</text>
                    <text x="25.6" y="5.8" fill="#223843" font-size="4.2" text-anchor="middle" font-family="system-ui,sans-serif">A</text>
                  </g>
                  <rect x="48" y="47" width="28" height="11" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                  <text x="62" y="53.2" fill="#223843" font-size="4" text-anchor="middle" font-family="system-ui,sans-serif">BRACKET</text>
                  <text x="62" y="57.4" fill="#D77A61" font-size="3.4" text-anchor="middle" font-family="system-ui,sans-serif">{{ pdf.number }}</text>
                </svg>

                <svg v-else-if="pdf.kind === 'flange'" class="pdf-drawing" viewBox="0 0 82 72" fill="none" aria-hidden="true">
                  <rect x="6" y="4" width="70" height="54" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="36" cy="30" r="16" fill="#EFF1F3" stroke="#223843" stroke-width="0.85"/>
                  <circle cx="36" cy="30" r="6" stroke="#223843" stroke-width="0.75"/>
                  <circle cx="36" cy="16.5" r="1.7" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="49.5" cy="30" r="1.7" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="36" cy="43.5" r="1.7" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="22.5" cy="30" r="1.7" stroke="#223843" stroke-width="0.6"/>
                  <path d="M36 30 L54 16" stroke="#D77A61" stroke-width="0.45"/>
                  <text x="56" y="15" fill="#D77A61" font-size="5" font-family="system-ui,sans-serif">Ø48</text>
                  <g transform="translate(44,46)">
                    <rect width="28" height="8.2" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                    <path d="M8 0 V8.2 M19.6 0 V8.2" stroke="#223843" stroke-width="0.4"/>
                    <circle cx="4" cy="4.1" r="2.1" stroke="#223843" stroke-width="0.5"/>
                    <circle cx="4" cy="4.1" r="1" stroke="#223843" stroke-width="0.5"/>
                    <text x="13.8" y="5.8" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">0.02</text>
                    <text x="23.8" y="5.8" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">A</text>
                  </g>
                </svg>

                <svg v-else-if="pdf.kind === 'cover'" class="pdf-drawing" viewBox="0 0 82 72" fill="none" aria-hidden="true">
                  <rect x="6" y="4" width="70" height="54" stroke="#223843" stroke-width="0.6"/>
                  <rect x="18" y="14" width="40" height="28" fill="#EFF1F3" stroke="#223843" stroke-width="0.85"/>
                  <rect x="28" y="24" width="20" height="8" rx="4" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="22.5" cy="18.5" r="1.5" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="53.5" cy="18.5" r="1.5" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="22.5" cy="37.5" r="1.5" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="53.5" cy="37.5" r="1.5" stroke="#223843" stroke-width="0.6"/>
                  <g transform="translate(10,48)">
                    <rect width="32" height="8" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                    <path d="M9 0 V8 M22.4 0 V8" stroke="#223843" stroke-width="0.4"/>
                    <path d="M2.2 5.6 H6.8 L6.1 3.4 H2.9 Z" stroke="#223843" stroke-width="0.5" fill="none"/>
                    <text x="15.7" y="5.6" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">0.02</text>
                    <text x="27.2" y="5.6" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">A</text>
                  </g>
                  <rect x="50" y="47" width="22" height="9" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                  <text x="61" y="52.8" fill="#223843" font-size="3.6" text-anchor="middle" font-family="system-ui,sans-serif">COVER</text>
                </svg>

                <svg v-else-if="pdf.kind === 'housing'" class="pdf-drawing" viewBox="0 0 82 72" fill="none" aria-hidden="true">
                  <rect x="6" y="4" width="70" height="54" stroke="#223843" stroke-width="0.6"/>
                  <rect x="18" y="13" width="36" height="32" fill="#EFF1F3" stroke="#223843" stroke-width="0.85"/>
                  <rect x="25" y="20" width="22" height="14" stroke="#223843" stroke-width="0.7"/>
                  <circle cx="22.5" cy="40" r="1.6" stroke="#223843" stroke-width="0.6"/>
                  <circle cx="49.5" cy="40" r="1.6" stroke="#223843" stroke-width="0.6"/>
                  <path d="M56 13 V45" stroke="#D77A61" stroke-width="0.5"/>
                  <path d="M54.6 13 H57.4 M54.6 45 H57.4" stroke="#D77A61" stroke-width="0.5"/>
                  <text x="62" y="31" fill="#D77A61" font-size="5" font-family="system-ui,sans-serif">32</text>
                  <g transform="translate(20,48)">
                    <rect width="30" height="8.2" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                    <path d="M8 0 V8.2 M20.8 0 V8.2" stroke="#223843" stroke-width="0.4"/>
                    <path d="M2.1 6.4 H6.1 M4.1 6.4 V2.2 H6.2" stroke="#223843" stroke-width="0.6"/>
                    <text x="14.4" y="5.8" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">0.03</text>
                    <text x="25.4" y="5.8" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">A</text>
                  </g>
                </svg>

                <svg v-else class="pdf-drawing" viewBox="0 0 82 72" fill="none" aria-hidden="true">
                  <rect x="6" y="4" width="70" height="54" stroke="#223843" stroke-width="0.6"/>
                  <rect x="28" y="12" width="14" height="36" rx="7" fill="#EFF1F3" stroke="#223843" stroke-width="0.85"/>
                  <path d="M35 12 V48" stroke="#223843" stroke-width="0.35" stroke-dasharray="1.4 1.1"/>
                  <path d="M22 18 H28 M22 42 H28" stroke="#D77A61" stroke-width="0.5"/>
                  <path d="M22 18 V42" stroke="#D77A61" stroke-width="0.5"/>
                  <text x="16" y="32" fill="#D77A61" font-size="5" text-anchor="middle" font-family="system-ui,sans-serif">Ø12</text>
                  <g transform="translate(44,40)">
                    <rect width="28" height="8.2" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                    <path d="M8 0 V8.2 M19.8 0 V8.2" stroke="#223843" stroke-width="0.4"/>
                    <path d="M1.8 5.8 L6.4 2.4 M5.3 2.6 L6.4 2.4 L5.8 3.6" stroke="#223843" stroke-width="0.55"/>
                    <text x="13.9" y="5.8" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">0.01</text>
                    <text x="23.9" y="5.8" fill="#223843" font-size="4.1" text-anchor="middle" font-family="system-ui,sans-serif">A</text>
                  </g>
                  <rect x="48" y="12" width="24" height="11" fill="#fff" stroke="#223843" stroke-width="0.5"/>
                  <text x="60" y="18.2" fill="#223843" font-size="4" text-anchor="middle" font-family="system-ui,sans-serif">SHAFT</text>
                  <text x="60" y="22.4" fill="#D77A61" font-size="3.4" text-anchor="middle" font-family="system-ui,sans-serif">{{ pdf.number }}</text>
                </svg>
                <span class="pdf-name">{{ pdf.name }}</span>
              </div>
            </div>
            
            <div class="panel-footer mt-4">
              <button class="btn-cancel">Cancel</button>
              <button class="btn-open">Spot Errors</button>
            </div>
          </div>
        </div>
        
        <div class="panel-progress">
          <div class="panel-card">
            <div class="progress-header mb-2">
              <span>Spotted Problems:</span>
            </div>
            <div style="padding: 0 12px 12px;">
              <div class="check-row">
                <div class="check-circle">✓</div>
                <span class="check-text">Draft Angles OK</span>
              </div>
              <div class="check-row">
                <div class="check-circle warn">!</div>
                <span class="check-text warn">Undercut on face #7</span>
              </div>
              <div class="check-row">
                <div class="check-circle warn">!</div>
                <span class="check-text warn">Material too slim on #21</span>
              </div>
              <div class="check-row">
                <div class="check-circle">✓</div>
                <span class="check-text">GD&T Tolerances OK</span>
              </div>
              <div class="check-row">
                <div class="check-circle">✓</div>
                <span class="check-text">Measurement Probes Access OK</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="panel-context">
          <div class="panel-card cad-card">
            <div class="cad-viewport">
              <canvas
                ref="cadCanvas"
                class="cad-canvas"
                aria-label="Wireframe CAD of a Bushman"
              ></canvas>
              <div class="cad-overlay">
                <span class="cad-badge">STEP</span>
              </div>
              <span class="cad-mode">Structural-Ring-2.step</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

.btn-hover:hover {
    color: v-bind(themeColorWhite);
    background-color: v-bind(themeColorOrange);
}

.hero-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
}

.hero-list li {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.6;
    color: v-bind(themeColor);
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

.hero-copy {
    max-width: 560px;
}

.mfg-shell {
    width: 80%;
    min-height: 600px;
    max-width: 780px;
    border-radius: 25px;
    background: v-bind(themeColorWhite);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
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
    border: 0.5px solid rgba(0,0,0,1);
    border-radius: 9px;
    padding: 2px;
    position: relative;
    box-shadow: 1px 2px 5px rgba(0,0,0,0.40);
    transition: opacity 0.35s ease;
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
    margin: 1;
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
    height: auto;
    display: block;
}

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
    --spread: 15deg;
    position: relative;
    width: 228px;
    height: 158px;
    padding: 16px 10px 22px;
}

.pdf-sheet {
    --mid: 2;
    --angle: calc((var(--i) - var(--mid)) * var(--spread));
    position: absolute;
    left: 50%;
    bottom: 28px;
    width: 82px;
    height: 108px;
    margin-left: -41px;
    background: linear-gradient(180deg, #fffefb 0%, #f6f3ef 100%);
    border: 0.5px solid v-bind(themeColor);
    border-radius: 3px;
    overflow: hidden;
    box-shadow:
        0 1px 0 rgba(255,255,255,0.75) inset,
        0 8px 18px rgba(34, 56, 67, 0.16);
    transform-origin: 50% 128%;
    transform: rotate(var(--angle));
    cursor: pointer;
    animation: fanOut 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(780ms + var(--i) * 55ms);
    transition: transform 180ms ease, box-shadow 180ms ease;
}

.pdf-sheet:hover {
    z-index: 10;
    transform: rotate(var(--angle)) translateY(-10px) scale(1.05);
    box-shadow:
        0 1px 0 rgba(255,255,255,0.8) inset,
        0 16px 26px rgba(34, 56, 67, 0.22);
}

.pdf-sheet:nth-child(3) {
    box-shadow:
        0 0 0 1px v-bind(themeColorOrange),
        0 1px 0 rgba(255,255,255,0.75) inset,
        0 10px 20px rgba(34, 56, 67, 0.2);
}

.pdf-drawing {
    display: block;
    width: 100%;
    height: 86px;
    padding: 8px 4px 0;
}

.pdf-name {
    display: block;
    font-size: 7px;
    line-height: 1.1;
    text-align: center;
    color: v-bind(themeColor);
    padding: 2px 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
}

.pdf-badge {
    position: absolute;
    top: 0;
    left: 0;
    background: v-bind(themeColorOrange);
    color: #fff;
    font-size: 6px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 2px 5px 1px;
    border-bottom-right-radius: 3px;
    z-index: 2;
}

.pdf-fold {
    position: absolute;
    top: 0;
    right: 0;
    border-style: solid;
    border-width: 0 11px 11px 0;
    border-color: transparent v-bind(themeColorLille) #f3eee8 transparent;
    filter: drop-shadow(-0.5px 0.5px 0 rgba(34,56,67,0.18));
    z-index: 2;
}

.file-grid-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 6px;
    text-align: center;
    font-size: 10px;
    color: v-bind(themeColor);
    font-weight: 600;
}

@keyframes fanOut {
    from {
        opacity: 0;
        transform: rotate(0deg) translateY(10px) scale(0.94);
    }
    to {
        opacity: 1;
        transform: rotate(var(--angle));
    }
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
    opacity: 0;
    animation: 400ms ease-out 900ms forwards panelSlideUp;
    width: 260px;
}

.progress-header {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 750;
    color: v-bind(themeColor);
    justify-content: space-between;
    border-bottom: 0.5px solid v-bind(themeColorLille);
    padding: 12px 24px 10px;
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

/* Right panel: CAD viewport */
.panel-context {
    position: absolute;
    right: 10px;
    top: 30px;
    z-index: 2;
    animation: 400ms ease-out 1150ms forwards panelSlideUp;
    width: 250px;
}

.cad-card {
    overflow: hidden;
}

.cad-viewport {
    position: relative;
    height: 248px;
    background:
        linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(239,241,243,0.2) 100%);
}

.cad-canvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: grab;
    touch-action: none;
}

.cad-canvas:active {
    cursor: grabbing;
}

.cad-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    pointer-events: none;
}

.cad-badge {
    background: v-bind(themeColorOrange);
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 2px 5px 1px;
    border-radius: 3px;
}

.cad-filename {
    font-size: 11px;
    font-weight: 700;
    color: v-bind(themeColor);
}

.cad-mode {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: v-bind(themeColor);
    pointer-events: none;
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
    line-height: 1.2;
    margin-bottom: 1.8rem;
    margin-top: 1.2rem;
    max-width: 480px;
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


.btn-ghost-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.75rem 1.4rem;
    background: transparent;
    color: v-bind(themeColor);
    border: 2px solid v-bind(themeColor); /* Reduced border width */
    border-radius: 10px; /* Slightly smaller radius */
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s;
}

.btn-ghost-cta:hover {
    background: rgba(0, 0, 0, 0.04);
}

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

/* ══════════════════════════════════════════
   RESPONSIVE — TABLET
   ══════════════════════════════════════════ */
@media (max-width: 1024px) {
    .hero-row {
        gap: 2.5rem;
    }
    .mfg-shell {
        width: 55%;
        min-height: 600px;
    }
}

/* ══════════════════════════════════════════
   RESPONSIVE — MOBILE
   Stack copy above the mock UI, and switch the
   mock UI itself from absolute-positioned
   overlapping panels (a desktop-only layout)
   to a simple stacked flow of cards.
   ══════════════════════════════════════════ */
@media (max-width: 768px) {
    .untree {
        min-height: auto;
        margin-top: 3rem;
        padding: 1rem;
        background-position: top center;
    }
    
    .hero-row {
        flex-direction: column;
        padding: 1.5rem 0.5rem !important;
        gap: 2rem;
        width: 100%;
    }
    
    .hero-copy {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        text-align: center;
    }
    
    .heading {
        font-size: clamp(1.5rem, 7vw, 2rem);
    }
    
    .heading br {
        display: none;
    }
    
    .subheading {
        max-width: 100%;
        font-size: 0.95rem;
        margin-left: auto;
        margin-right: auto;
    }
    .subheading.w-\[90\%\] {
        width: 100% !important;
    }
    
    .hero-feature-list {
        align-items: flex-start;
        text-align: left;
        max-width: 340px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .hero-feature-list li {
        white-space: normal;
        font-size: 0.9rem;
    }
    
    .cta-row {
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 1.5rem;
    }
    
    .btn-primary-cta,
    .btn-ghost-cta {
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
    }
    
    /* ── Mock UI shell ── */
    .mfg-shell {
        width: 100%;
        max-width: 100%;
        min-height: 0;
    }
    
    .mfg-top-bar {
        padding: 14px 0 0;
    }
    
    .seg-control {
        flex-direction: column;
        width: calc(100% - 2.5rem);
    }
    
    .seg-btn {
        width: 100%;
        min-width: 0;
        padding: 8px 12px;
    }
    
    /* Switch the analysis view from absolute overlap to a stacked column */
    .mfg-body {
        min-height: 0;
    }
    
    .video-body {
        padding: 14px;
    }
    
    .mfg-body:not(.video-body) {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 16px 14px 20px;
        position: static;
    }
    
    .panel-files,
    .panel-progress,
    .panel-context {
        position: static;
        width: 100%;
        left: auto;
        right: auto;
        top: auto;
        transform: none;              /* ← add this */
        opacity: 1;
        animation: 400ms ease-out forwards fadeIn;
    }
    
    .file-grid {
        width: 100%;
        height: 170px;
    }

    .cad-viewport {
        height: 280px;
    }
}

@media (max-width: 400px) {
    .heading {
        font-size: 1.35rem;
    }
    .btn-primary-cta,
    .btn-ghost-cta {
        font-size: 0.88rem;
        padding: 0.7rem 1rem;
    }
}
</style>
