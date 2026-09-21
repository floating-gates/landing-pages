<script setup>
import { ref, computed } from "vue";
import background from "../data/images/background_pic.webp";
import add_lib from "../data/images/add_lib.png";
import output_image from "../data/images/output.png";
import short_logo from "../data/images/logo_short_black.webp";
import Header from "./Header.vue"
import { WindowsIcon, AppleIcon, DownloadIcon, SmallCheckIcon } from "../helper/icons_generator.js"
import { 
  themeColor, 
  themeColorOrange, 
  themeColorLille, 
  themeColorWhite, 
} from "../config.js";

const hoveredPlatform = ref(null);
const showModal = ref(false);
const emailInput = ref("");
const selectedPlatform = ref(null);

const isSubmitting = ref(false);
const errorMessage = ref("");

const manual_version = "1.0.0";
const releaseDate = "July 2026";

const win_installer = "good2manufactured.exe";
const platforms = [
    {
        id: "windows",
        label: "Windows",
        filename: win_installer,
        icon: "windows",
    },
];

const dynamicVersion = computed(() => {
  const match = good2manufactured_url.match(/-(\d+\.\d+\.\d+)\.exe$/);
  return match ? match[1] : manual_version;
});

const steps = [
    { 
      n: "01", 
      label: "Download the Agent", 
      desc: "Pick your platform and run the installer to establish your computer as a local processing endpoint.", 
      img: null 
    },
    { 
      n: "02", 
      label: "Connect to Floating-Gates Server", 
      desc: "Link your agent to the Floating-Gates server to enable automated CAD processing and AI routines.", 
      img: add_lib 
    },
    { 
      n: "03", 
      label: "Continuous DFM & File Analysis", 
      desc: "Let the system inspect CAD files across departments, protect engineering workflows, and produce real-time DFM results.", 
      img: output_image 
    },
];

const techItems = [
  {
    title: "Autonomous Mechanical Design Revision Routine",
    desc: "Our engine uses floating-gate architectures to build neural structures that reconfigure dynamically, enabling real-time learning and optimization."
  },
  {
    title: "2D Understanding",
    desc: "Interprets visual and geometric technical documentation with context awareness and engineering precision."
  },
  {
    title: "3D Understanding",
    desc: "Scales natively from workstation endpoints to cloud infrastructure, enabling deep spatial reasoning for CAD models and manufacturing."
  }
];

const requirements = [
    { platform: "Windows", items: ["Windows 10 or 11 (64-bit)", "4 GB RAM minimum"] },
    { platform: "Server Instance", items: ["Gates (Enterprise Version Required)"] },
];

const isValidEmail = computed(() => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(emailInput.value);
});

const handleDownloadClick = (platform) => {
  selectedPlatform.value = platform;
  errorMessage.value = "";
  showModal.value = true;
};
</script>

<template>
<Header />
  <div class="faq-section" :style="{ backgroundImage: `url(${background})` }">
  <div class="container mt-7 mx-auto p-4">
    
    <!-- Hero Header -->
    <div class="dl-hero" data-aos="fade-up" data-aos-delay="80">
      <div class="brand-badge mb-3">
        <img :src="short_logo" alt="Gates Logo" class="brand-logo" />
      </div>
      <h1 class="heading">
        Good2Manufacture
      </h1>
      <p class="tagline mb-2" :style="{ color: themeColorOrange }">
        The AI Foundational Model that revolutionises Design for Manufacturing
      </p>
      
      <p class="dl-subheading">
        The agent that connects your computer with your Gates server. It runs silently on your machine,
        watches your file system, and routes every STEP file through the DFM pipeline before it reaches production.
      </p>
    </div>
    
    <!-- Download Cards -->
    <div class="dl-cards" data-aos="fade-up" data-aos-delay="140">
      <div
        v-for="p in platforms"
        :key="p.id"
        class="dl-card"
        :class="{ 'dl-card--hovered': hoveredPlatform === p.id }"
        @click="handleDownloadClick(p)"
        @mouseenter="hoveredPlatform = p.id"
        @mouseleave="hoveredPlatform = null"
      >
        <div class="dl-card__icon-wrap">
          <WindowsIcon v-if="p.icon === 'windows'" class="dl-card__os-icon" />
          <AppleIcon v-else class="dl-card__os-icon" />
        </div>
        
        <div class="dl-card__info">
          <span class="dl-card__label">{{ p.label }}</span>
          <span class="dl-card__filename">{{ p.filename }}</span>
        </div>
        
        <div class="dl-card__right">
          <div class="dl-card__btn">
            <DownloadIcon width="16" height="16" stroke-width="2.2" />
            Download
          </div>
        </div>
      </div>
    </div>

    <div class="dl-divider" data-aos="fade-up" data-aos-delay="160"></div>

    <!-- Vision Section -->
    <div class="dl-section" data-aos="fade-up" data-aos-delay="180">
      <h2 class="dl-section-title">Our Vision</h2>
      <div class="vision-card">
        <p>
          At <strong>Floating-Gates</strong>, we are pioneering a new paradigm in AI: 
          <strong>an engine built for adaptability, efficiency, and real-world understanding</strong>. 
          Unlike traditional models, our AI engine dynamically adjusts its computational pathways, 
          enabling it to learn and evolve without requiring constant retraining.
        </p>
        <p class="mt-2">
          We believe AI should not just process data, but <em>understand</em> it—adapting to new 
          information, contexts, and manufacturing challenges in real time.
        </p>
      </div>
    </div>

    <div class="dl-divider" data-aos="fade-up" data-aos-delay="200"></div>

    <!-- Technology Section -->
    <div class="dl-section" data-aos="fade-up" data-aos-delay="220">
      <h2 class="dl-section-title">Our Technology</h2>
      <div class="tech-grid">
        <div v-for="t in techItems" :key="t.title" class="tech-card">
          <h3 class="tech-card__title">{{ t.title }}</h3>
          <p class="tech-card__desc">{{ t.desc }}</p>
        </div>
      </div>
    </div>

    <div class="dl-divider" data-aos="fade-up" data-aos-delay="240"></div>

    <!-- System Requirements Section -->
    <div class="dl-section dl-req-section" data-aos="fade-up" data-aos-delay="260">
      <h2 class="dl-section-title">System requirements</h2>
      <div class="dl-req-grid">
        <div v-for="r in requirements" :key="r.platform" class="dl-req-card">
          <span class="dl-req-platform">{{ r.platform }}</span>
          <ul class="dl-req-list">
            <li v-for="item in r.items" :key="item">
              <span class="feat-check-sm">
                <SmallCheckIcon width="8" height="8" stroke-width="2" />
              </span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="dl-divider" data-aos="fade-up" data-aos-delay="280"></div>
    
    <!-- Steps Section -->
    <div class="dl-section" data-aos="fade-up" data-aos-delay="300">
      <h2 class="dl-section-title">How to connect to Gates' server</h2>
      <div class="dl-steps">
        <div v-for="s in steps" :key="s.n" class="dl-step">
          <div class="dl-step__num">{{ s.n }}</div>
          <div class="dl-step__body">
            <span class="dl-step__label">{{ s.label }}</span>
            <span class="dl-step__desc">{{ s.desc }}</span>
            
            <div v-if="s.img" class="dl-step__img-wrap">
              <img :src="s.img" :alt="s.label" class="dl-step__img" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Footer -->
    <footer id="contact" class="dl-footer" data-aos="fade-up" data-aos-delay="320">
      <div class="footer-content">
        <p>Contact us: <a href="mailto:hello@floating-gates.ai" class="dl-link">hello@floating-gates.ai</a></p>
        <p>Join us: <a href="https://careers.floating-gates.ai" target="_blank" class="dl-link">careers.floating-gates.ai</a></p>
        <p>Locations: San Francisco, Zurich, Tokyo</p>
      </div>
      <div class="footer-bottom">
        <p>Floating-Gates AI © 2026</p>
      </div>
    </footer>

  </div>

  <!-- Email Gating Modal -->
  <Transition name="fade">
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <button class="modal-close-btn" @click="showModal = false">&times;</button>
        <h3 class="modal-title">Enter your email to download</h3>
        <p class="modal-desc">
          We will send updates about security releases, software updates, and documentation patches for 
          <strong>{{ selectedPlatform?.filename }}</strong>.
        </p>
        
        <form @submit.prevent="submitEmailAndDownload" class="modal-form">
          <input 
            type="email" 
            v-model.trim="emailInput" 
            placeholder="name@company.com" 
            required
            :disabled="isSubmitting"
            class="modal-input"
          />
          <button 
            type="submit" 
            class="modal-submit-btn" 
            :disabled="!isValidEmail || isSubmitting"
          >
            {{ isSubmitting ? "Processing..." : "Submit & Download" }}
          </button>
          
          <p v-if="errorMessage" style="color: #ff4a4a; margin-top: 10px; font-size: 0.9em;">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
  </Transition>
</div>
</template>

<style scoped>
.brand-logo {
    max-width: 180px;
    height: auto;
}

.tagline {
    font-size: 1.15rem;
    font-weight: 600;
}

/* ── Technology Section ── */
.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
}

.tech-card {
    background: v-bind(themeColorWhite);
    border: 0.5px solid v-bind(themeColor);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.tech-card__title {
    font-size: 1rem;
    font-weight: 600;
    color: v-bind(themeColorOrange);
}

.tech-card__desc {
    font-size: 0.88rem;
    color: v-bind(themeColor);
    opacity: 0.8;
    line-height: 1.5;
}


</style>
