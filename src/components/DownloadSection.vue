<script setup>
import { ref, computed } from "vue";
import background from "../data/images/background_pic.webp";
import add_lib from "../data/images/add_lib.png";
import output_image from "../data/images/output.png";
import short_logo from "../data/images/logo_short_black.webp"

// Added create_customer_api_endpoint import
import { 
  themeColor, 
  themeColorOrange, 
  themeColorLille, 
  themeColorWhite, 
  create_customer_api_endpoint 
} from "../config.js";

const hoveredPlatform = ref(null);
const showModal = ref(false);
const emailInput = ref("");
const selectedPlatform = ref(null);

// UI feedback states during the API call
const isSubmitting = ref(false);
const errorMessage = ref("");

const version = "0.1";
const releaseDate = "May 2025";

const win_installer = `good2manufactured-0.1-win-x64.exe`
const platforms = [
    {
        id: "windows",
        label: "Windows",
        subtitle: "x64",
        filename: win_installer,
        downloadUrl: `/releases/${win_installer}`,
        icon: "windows",
    },
];

const steps = [
    { n: "01", label: "Download the Agent", desc: "Pick your platform and run the installer. To make available your computer as endpoint", img: null },
    { n: "02", label: "Connect from Server", desc: "Use the server to connect and automate your computer.", img: add_lib },
    { n: "03", label: "Let it Run in the Background", desc: "Let the system discover CAD files and issues around different departements, guardrail your engineers and get DFM results in seconds.", img: output_image },
];

const requirements = [
    { platform: "Windows", items: ["Windows 10 or 11 (64-bit)", "4 GB RAM minimum"] },
    { platform: "Server Instance", items: ["Gates (Enterprise Version Required)"] },
];

// Simple email regex validation
const isValidEmail = computed(() => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(emailInput.value);
});

// Intercept click to open modal
const handleDownloadClick = (platform) => {
  selectedPlatform.value = platform;
  errorMessage.value = "";
  showModal.value = true;
};

// Handle submitting email and forcing the download
const submitEmailAndDownload = async () => {
  if (!isValidEmail.value || !selectedPlatform.value || isSubmitting.value) return;

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    // Your backend matches `#[post("/create_customer", data = "<customer_mail>")]` 
    // where data is parsed as a plain string payload matching your &'r str parameter.
    const response = await fetch(create_customer_api_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", 
      },
      body: emailInput.value,
    });

    if (!response.ok) {
      throw new Error("Failed to register customer endpoint.");
    }

    // Create temporary link element to trigger the download asset browser-side
    const link = document.createElement("a");
    link.href = selectedPlatform.value.downloadUrl;
    link.setAttribute("download", selectedPlatform.value.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up states on success
    showModal.value = false;
    emailInput.value = "";
    selectedPlatform.value = null;

  } catch (error) {
    console.error("Backend Submission Error:", error);
    errorMessage.value = "An error occurred while creating your account. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
<div class="untree_co-hero" :style="{ backgroundImage: `url(${background})` }">
  <div class="container wider-container">
    
    <div class="row align-items-center">
      <div class="dl-hero" data-aos="fade-up" data-aos-delay="80">
        <h1 class="dl-heading">
          Download 
          <em :style="{ color: themeColorOrange }">good2manufactured</em>
        </h1>
        
        <p class="dl-subheading">
          The agent that connects your computer with your Gates server. It runs silently on your machine,
          watches your file system, and routes every STEP file through the DFM pipeline before it reaches production.
        </p>
      </div>
      
      <div class="dl-cards" data-aos="fade-up" data-aos-delay="140">
        <div
          v-for="p in platforms"
          :key="p.id"
          class="dl-card"
          :class="{ 'dl-card--hovered': hoveredPlatform === p.id }"
          @click="handleDownloadClick(p)"
          @mouseenter="hoveredPlatform = p.id"
          @mouseleave="hoveredPlatform = null"  >
          <div class="dl-card__icon-wrap">
            <svg v-if="p.icon === 'windows'" class="dl-card__os-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.799"/>
            </svg>
            <svg v-else class="dl-card__os-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
          </div>
          
          <div class="dl-card__info">
            <span class="dl-card__label">{{ p.label }}</span>
            <span class="dl-card__subtitle">{{ p.subtitle }}</span>
            <span class="dl-card__filename">{{ p.filename }}</span>
          </div>
          
          <div class="dl-card__right">
            <div class="dl-card__btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
              </svg>
              Download
            </div>
          </div>
        </div>
      </div>
      <div class="dl-divider" data-aos="fade-up" data-aos-delay="180"></div>

      <div class="dl-section dl-req-section" data-aos="fade-up" data-aos-delay="240">
        <h2 class="dl-section-title">System requirements</h2>
        <div class="dl-req-grid">
          <div v-for="r in requirements" :key="r.platform" class="dl-req-card">
            <span class="dl-req-platform">{{ r.platform }}</span>
            <ul class="dl-req-list">
              <li v-for="item in r.items" :key="item">
                <span class="feat-check-sm">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.2L4.2 7.5L8 3" stroke="currentColor" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- <div class="dl-divider" data-aos="fade-up" data-aos-delay="180"></div> -->
      
      <div class="dl-section" data-aos="fade-up" data-aos-delay="200">
        <!-- <h2 class="dl-section-title">Get started in three steps</h2> -->
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
    </div>
  </div>

  <Transition name="fade">
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <button class="modal-close-btn" @click="showModal = false">&times;</button>
        <h3 class="modal-title">Enter your email to download</h3>
        <p class="modal-desc">
          We will send updates about updates, security releases, and documentation patches for 
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
/* ── Hero ── */
.dl-hero {
    margin-bottom: 3rem;
}

.dl-heading {
    font-size: clamp(2.2rem, 5vw, 3.2rem);
    font-weight: 700;
    line-height: 1.1;
    color: v-bind(themeColor);
    margin-bottom: 1.2rem;
}

.dl-subheading {
    color: v-bind(themeColor);
    opacity: 0.9;
}

/* ── Download cards ── */
.dl-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 2.5rem;
}

.dl-card {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 18px 22px;
    background: v-bind(themeColorWhite);
    border: 0.5px solid v-bind(themeColor);
    border-radius: 16px;
    text-decoration: none;
    transition: box-shadow 0.2s, transform 0.15s, border-color 0.15s;
    box-shadow: 0 4px 16px rgba(0,0,0,0.07);
    cursor: pointer;
}

.dl-card--hovered {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.13);
    border-color: v-bind(themeColorOrange);
}

.dl-card__icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: v-bind(themeColorLille);
    border: 0.5px solid v-bind(themeColor);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: v-bind(themeColor);
}

.dl-card__os-icon {
    width: 22px;
    height: 22px;
}

.dl-card__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
}

.dl-card__label {
    font-size: 0.95rem;
    font-weight: 600;
    color: v-bind(themeColor);
}

.dl-card__subtitle {
    font-size: 0.78rem;
    color: v-bind(themeColor);
    opacity: 0.6;
}

.dl-card__filename {
    font-size: 0.72rem;
    font-family: monospace;
    color: v-bind(themeColor);
    opacity: 0.5;
    margin-top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dl-card__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex-shrink: 0;
}

.dl-card__size {
    font-size: 0.75rem;
    color: v-bind(themeColor);
    opacity: 0.5;
}

.dl-card__btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    transition: background 0.15s;
}

.dl-card--hovered .dl-card__btn {
    background: v-bind(themeColorOrange);
}

.dl-card__btn svg {
    stroke: v-bind(themeColorWhite);
}

/* ── Email Gating Modal ── */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-card {
  background: v-bind(themeColorWhite);
  border: 1px solid v-bind(themeColorLille);
  border-radius: 20px;
  padding: 32px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: 0 16px;
}

.modal-close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.75rem;
  color: v-bind(themeColor);
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.15s;
}

.modal-close-btn:hover {
  opacity: 1;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 10px;
  padding-right: 20px;
}

.modal-desc {
  font-size: 0.88rem;
  line-height: 1.5;
  color: v-bind(themeColor);
  opacity: 0.75;
  margin-bottom: 24px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-input {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid v-bind(themeColor);
  font-size: 0.95rem;
  color: v-bind(themeColor);
  outline: none;
  background: transparent;
}

.modal-input:focus {
  border-color: v-bind(themeColorOrange);
  box-shadow: 0 0 0 3px rgba(242, 108, 37, 0.15);
}

.modal-submit-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: v-bind(themeColorOrange);
  color: v-bind(themeColorWhite);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
}

.modal-submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.modal-submit-btn:disabled {
  background: v-bind(themeColor);
  opacity: 0.3;
  cursor: not-allowed;
}

/* Modal Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Divider ── */
.dl-divider {
    height: 0.5px;
    background: v-bind(themeColorLille);
    opacity: 0.8;
    margin-bottom: 1.8rem;
}

/* ── Sections ── */
.dl-section {
    margin-bottom: 2.5rem;
}

.dl-section-title {
    font-size: 1.7rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 1.4rem;
}

/* Steps layout modification */
.dl-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.dl-step {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 16px 0;
    border-bottom: 0.5px solid v-bind(themeColorLille);
    align-items: center;
}

.dl-step:last-child {
    border-bottom: none;
}

.dl-step__num {
    font-size: 1.6rem;
    font-weight: 700;
    color: v-bind(themeColorOrange);
    min-width: 48px;
    line-height: 1;
    padding-top: 2px;
}

.dl-step__body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1; /* Ensure body takes full remaining space */
}

.dl-step__label {
    font-size: 0.95rem;
    font-weight: 600;
    color: v-bind(themeColor);
}

.dl-step__desc {
    font-size: 0.88rem;
    color: v-bind(themeColor);
    opacity: 0.65;
    line-height: 1.5;
}

/* Explanatory Image wrapper and element styles */
.dl-step__img-wrap {
    margin-top: 14px;
    max-width: 580px; /* Framing threshold for UI screens */
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid v-bind(themeColorLille);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    background: v-bind(themeColorWhite);
}

.dl-step__img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
}

/* Requirements */
.dl-req-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.dl-req-card {
    background: v-bind(themeColorWhite);
    border: 0.5px solid v-bind(themeColor);
    border-radius: 12px;
    padding: 18px 20px;
}

.dl-req-platform {
    font-size: 0.88rem;
    font-weight: 600;
    color: v-bind(themeColor);
    display: block;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 0.5px solid v-bind(themeColorLille);
}

.dl-req-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.dl-req-list li {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 0.83rem;
    color: v-bind(themeColor);
    opacity: 0.8;
}

.feat-check-sm {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: v-bind(themeColor);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: v-bind(themeColorWhite);
}

/* ── Footnote ── */
.dl-footnote {
    font-size: 0.8rem;
    color: v-bind(themeColor);
    opacity: 0.55;
    line-height: 1.6;
}

.dl-link {
    color: v-bind(themeColorOrange);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.dl-link:hover {
    opacity: 0.8;
}

/* ── Responsive ── */
@media (max-width: 640px) {
    .dl-req-grid {
        grid-template-columns: 1fr;
    }
    
    .dl-card {
        flex-wrap: wrap;
        gap: 12px;
    }
    
    .dl-card__right {
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }
}
</style>
