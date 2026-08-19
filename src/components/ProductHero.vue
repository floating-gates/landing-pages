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
  
  const activeTab = ref('analysis');
  
  function setTab(tab) {
  activeTab.value = tab;
  }
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
            of <em>Design Errors in CAD </em> <br>
            and Technical Drawings
            <!-- and Future Maintenance <br> -->
          </h1>

        <p class="subheading w-[90%]" data-aos="fade-up" data-aos-delay="130">
          It perform autonomous document revision (CAD and GD&T) to spot manufacturing issues. Every file in the factory encounter a critical checkpoint by which they are either green lit or highlighted for revision.
        </p>
        
        <ul class="hero-feature-list" data-aos="fade-up" data-aos-delay="160">
          <li>
            <span class="feat-check">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5.2L4.2 7.5L8 3" stroke="currentColor" stroke-width="1.8"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Spot errors and Standardize adherence to design playbook
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
            Allow suppliers to follow your design conventions
          </li>
        </ul>
        
        <div class="cta-row" data-aos="fade-up" data-aos-delay="190">
          <a class="btn-primary-cta" :href="app_login_url">
            Start Here
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
            </svg>
          </a>
          <a class="btn-ghost-cta" :href="demo_url">Visualize Your Issue Resolution UI</a>
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
                Issues Resolution Interface
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
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 3C17.3284 3 18 3.67157 18 4.5V15.5C18 16.3284 17.3284 17 16.5 17H3.5C2.67157 17 2 16.3284 2 15.5V6.5C2 5.67157 2.67157 5 3.5 5H10.793L12.3535 3.43945L12.4639 3.33984C12.7307 3.12123 13.0661 3.00003 13.4141 3H16.5Z" /></svg>
                  </div>
                  <div class="search-pill">
                    <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" :style="{color: themeColor, flexShrink: 0}"><path d="M8.5 2C12.0899 2 15 4.91015 15 8.5C15 10.1149 14.4094 11.5908 13.4346 12.7275L17.8535 17.1465L17.918 17.2246C18.0461 17.4187 18.0244 17.6827 17.8535 17.8535C17.6827 18.0244 17.4187 18.0461 17.2246 17.918L17.1465 17.8535L12.7275 13.4346C11.5908 14.4094 10.1149 15 8.5 15C4.91015 15 2 12.0899 2 8.5C2 4.91015 4.91015 2 8.5 2ZM8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C11.5376 14 14 11.5376 14 8.5C14 5.46243 11.5376 3 8.5 3Z" /></svg>
                    <span style="font-size:10px;">Search</span>
                  </div>
                </div>
                
                <div class="file-grid">
                  <div class="file-item">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="8" width="28" height="26" rx="3" fill="#45B3E0" stroke="#3BA6D4" stroke-width="0.5" />
                      <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#5AC8FA" />
                      <text x="20" y="26" fill="white" font-size="8.5" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">.step</text>
                    </svg>
                    <span class="file-label">CAD Library</span>
                  </div>
                  <div class="file-item">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="8" width="28" height="26" rx="3" fill="#5E6AD2" stroke="#4A54C1" stroke-width="0.5" />
                      <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#7B84E3" />
                      <g transform="translate(8, 11) scale(0.05)" fill="white">
                        <path d="M455.5,348h-17.647l-4.727-28.364C431.229,308.258,421.481,300,409.946,300H343v-17h32.5c4.143,0,7.5-3.357,7.5-7.5V267h17v16.5c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-48c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5V252h-17v-8.5c0-4.143-3.357-7.5-7.5-7.5H311v-6.396c0-13.989-9.395-26.444-22.847-30.289L263,192.129v-11.532c5.055-4.429,8-10.83,8-17.659V139h8.5c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H279v-0.5c0-23.639-17.36-43.295-40-46.902V75.5c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v1.098c-22.64,3.607-40,23.263-40,46.902v0.5h-0.5c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h8.5v23.937c0,6.829,2.946,13.229,8,17.659v11.532l-25.154,7.187C161.395,203.159,152,215.614,152,229.604V236h-18.227c-3.138-9.292-11.937-16-22.273-16H94.277c-3.515-18.205-19.561-32-38.777-32c-21.78,0-39.499,17.719-39.5,39.498v0.001v0v0.001c0,19.216,13.795,35.262,32,38.777v34.287c-9.228,2.011-16.515,9.405-18.127,19.072L25.147,348H7.5c-4.143,0-7.5,3.357-7.5,7.5v32c0,4.143,3.357,7.5,7.5,7.5h448c4.143,0,7.5-3.357,7.5-7.5v-32C463,351.357,459.643,348,455.5,348z"/>
                      </g>
                    </svg>
                    <span class="file-label">Machines Avail.</span>
                  </div>
                  <div class="file-item">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="8" width="28" height="26" rx="3" fill="#45B3E0" stroke="#3BA6D4" stroke-width="0.5" />
                      <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#5AC8FA" />
                      <g transform="translate(10, 14) scale(0.1)" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">
                        <path d="M46.853 24.746v-4.319c0-2.762 2.611-4.789 5.304-4.116l17.054 4.26a5.31 5.31 0 0 1 4.034 5.146v28.658c0 2.763-2.611 4.789-5.304 4.116l-10.09-2.52" transform="matrix(2.5351 0 0 2.6556 -15.545 -20.844)"/>
                        <path d="M30.805 31.18v-4.154c0-2.763 2.61-4.79 5.304-4.117l17.053 4.26a5.31 5.31 0 0 1 4.034 5.146v28.658c0 2.763-2.61 4.79-5.304 4.116L41.76 62.558" transform="matrix(2.5351 0 0 2.6556 -15.545 -20.844)"/>
                        <path d="M18.79 67.427a5.31 5.31 0 0 1-4.034-5.146V33.623c0-2.763 2.61-4.789 5.304-4.116l17.054 4.26a5.31 5.31 0 0 1 4.033 5.146V67.57c0 2.762-2.61 4.789-5.304 4.116z" transform="matrix(2.5351 0 0 2.6556 -15.545 -20.844)"/>
                      </g>
                    </svg>
                    <span class="file-label">Materials</span>
                  </div>
                  <div class="file-item">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="8" width="28" height="26" rx="3" fill="#34C759" stroke="#28A347" stroke-width="0.5" />
                      <rect x="4" y="13" width="32" height="20" rx="2.5" fill="#4CD870" />
                      <text x="20" y="26" fill="white" font-size="8.5" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">.pdf</text>
                    </svg>
                    <span class="file-label">GD&T library</span>
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
                  <span>Issues around your Files</span>
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
                    <span class="check-text">Lead time OK</span>
                  </div>
                  <div class="check-row">
                    <div class="check-circle">✓</div>
                    <span class="check-text">Probes Access OK</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="panel-context">
              <div class="panel-card">
                <div class="progress-header">
                  <span>Autonomous File Fetch</span>
                </div>
                <div style="display:flex; flex-direction:column; padding: 8px;">
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
</template>

<style scoped>
.untree {
    width: 100%;
    display: flex;
    align-items: stretch;
    min-height: 90vh;
    padding: 1.5rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
}

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
    padding: 3px;
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

/* Right panel: context */
.panel-context {
    position: absolute;
    right: 10px;
    top: 30px;
    z-index: 2;
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
    color: v-bind(themeColor);
    border: 3px solid v-bind(themeColor);
    border-radius: 10px;
    font-size: 0.95rem;
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
        opacity: 1;
        animation: 400ms ease-out forwards fadeIn;
    }

    .file-grid {
        width: 100%;
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
