<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { themeColor, survey_link, app_login_url, download_center_url } from "../config.js";
import short_logo from "../data/images/logo_short_black.webp";
import {
  Logo,
  DropdownCaret,
  ServerIcon,
  ClientIcon,
  ArticlesIcon,
  BookIcon,
  SurveyIcon
} from "../helper/icons_generator.js";

// Menu States
const isMenuOpen = ref(false);
const isResourcesMenuOpen = ref(false);
const isProductMenuOpen = ref(false);

// Template DOM References
const resourcesRef = ref(null);
const productRef = ref(null);

// Toggle Handlers
function toggleResources() {
  isResourcesMenuOpen.value = !isResourcesMenuOpen.value;
  if (isResourcesMenuOpen.value) isProductMenuOpen.value = false;
}

function toggleProduct() {
  isProductMenuOpen.value = !isProductMenuOpen.value;
  if (isProductMenuOpen.value) isResourcesMenuOpen.value = false;
}

// Hover Handlers (Desktop Only)
function handleMouseEnter(menu) {
  if (window.innerWidth <= 768) return;
  if (menu === "resources") isResourcesMenuOpen.value = true;
  if (menu === "product") isProductMenuOpen.value = true;
}

function handleMouseLeave(menu) {
  if (window.innerWidth <= 768) return;
  if (menu === "resources") isResourcesMenuOpen.value = false;
  if (menu === "product") isProductMenuOpen.value = false;
}

// Global Close
function closeMenu() {
  isMenuOpen.value = false;
  isResourcesMenuOpen.value = false;
  isProductMenuOpen.value = false;
}

// Outside Click Event Listener
function handleClickOutside(event) {
  if (resourcesRef.value && !resourcesRef.value.contains(event.target)) {
    isResourcesMenuOpen.value = false;
  }
  if (productRef.value && !productRef.value.contains(event.target)) {
    isProductMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="site-nav">
    <div class="site-navigation">
      <div class="nav-wrapper">
        <!-- Logo -->
        <a href="/" class="logo mx-7" @click="closeMenu">
          <img :src="short_logo" alt="Floating Gates" class="logo-img mr-3" />
        </a>

        <!-- Hamburger button -->
        <button
          class="hamburger"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span :class="{ open: isMenuOpen }"></span>
          <span :class="{ open: isMenuOpen }"></span>
          <span :class="{ open: isMenuOpen }"></span>
        </button>

        <!-- Mobile Backdrop -->
        <div v-if="isMenuOpen" class="menu-backdrop" @click="closeMenu"></div>

        <!-- Menus -->
        <div class="menu-container" :class="{ 'mobile-open': isMenuOpen }">
          <ul class="site-menu main-menu">
            <li><a href="/" class="pages-link" @click="closeMenu">Home</a></li>
            <li><a href="/product" class="pages-link" @click="closeMenu">How it Works</a></li>
            <!-- PRODUCTS DROPDOWN -->
            <li
              ref="productRef"
              class="dropdown"
              @mouseenter="handleMouseEnter('product')"
              @mouseleave="handleMouseLeave('product')"
            >
              <button
                type="button"
                class="nav-link dropdown-toggle"
                @click="toggleProduct"
              >
                <span>Download</span>
                <DropdownCaret
                  class="dropdown-caret"
                  :class="{ open: isProductMenuOpen }"
                  width="12"
                  height="12"
                />
              </button>

              <Transition name="dropdown-fade">
                <div class="dropdown-menu" v-show="isProductMenuOpen">
                  <div class="dropdown-content">
                    <a href="/good2manufacture"
                       class="dropdown-item" @click="closeMenu">
                      <div class="item-icon">
                        <ServerIcon width="18" height="18" />
                      </div>
                      <div class="item-text">
                        <span class="item-title">Good2Manufacture Server</span>
                        <span class="item-desc">Software Stack for Enterprise Usage only</span>
                      </div>
                    </a>

                    <a href="/good2manufactured" class="dropdown-item" @click="closeMenu">
                      <div class="item-icon">
                        <ClientIcon width="18" height="18" />
                      </div>
                      <div class="item-text">
                        <span class="item-title">Good2Manufactured Client</span>
                        <span class="item-desc">Daemon to connect an Endpoint to Good2Manufacture Server</span>
                      </div>
                    </a>

                    <!-- <a href="/ai-model" class="dropdown-item" @click="closeMenu"> -->
                    <!--   <div class="item-icon"> -->
                    <!--     <Logo /> -->
                    <!--   </div> -->
                    <!--   <div class="item-text"> -->
                    <!--     <span class="item-title"> AI Model for MFR </span> -->
                    <!--     <span class="item-desc">Manufacturing Feature Recognition model with Open Weights</span> -->
                    <!--   </div> -->
                    <!-- </a> -->
                  </div>
                </div>
              </Transition>
            </li>

            <li><a href="/pricing" class="pages-link" @click="closeMenu">Pricing</a></li>
            <li><a href="/mission" class="pages-link" @click="closeMenu">Mission</a></li>
            <li><a href="/faq" class="pages-link" @click="closeMenu">FAQ</a></li>
            
            <!-- RESOURCES DROPDOWN -->
            <li
              ref="resourcesRef"
              class="dropdown"
              @mouseenter="handleMouseEnter('resources')"
              @mouseleave="handleMouseLeave('resources')"
            >
              <button
                type="button"
                class="nav-link dropdown-toggle"
                @click="toggleResources"
                :aria-expanded="isResourcesMenuOpen"
              >
                <span>Resources</span>
                <DropdownCaret
                  class="dropdown-caret"
                  :class="{ open: isResourcesMenuOpen }"
                  width="12"
                  height="12"
                />
              </button>

              <Transition name="dropdown-fade">
                <div class="dropdown-menu" v-show="isResourcesMenuOpen">
                  <div class="dropdown-content">
                    <a href="/articles" class="dropdown-item" @click="closeMenu">
                      <div class="item-icon">
                        <ArticlesIcon width="18" height="18" />
                      </div>
                      <div class="item-text">
                        <span class="item-title">Articles</span>
                        <span class="item-desc">Guides, news & technical insights</span>
                      </div>
                    </a>

                    <a href="/docs" class="dropdown-item" @click="closeMenu">
                      <div class="item-icon">
                        <BookIcon width="18" height="18" />
                      </div>
                      <div class="item-text">
                        <span class="item-title">Documentation</span>
                        <span class="item-desc">API references & system setup</span>
                      </div>
                    </a>

                    <a :href="survey_link" class="dropdown-item" @click="closeMenu">
                      <div class="item-icon">
                        <SurveyIcon width="18" height="18" />
                      </div>
                      <div class="item-text">
                        <span class="item-title">Survey</span>
                        <span class="item-desc">Share feedback to help us grow</span>
                      </div>
                    </a>
                  </div>
                </div>
              </Transition>
            </li>
          </ul>

          <div class="button-group mr-2">
            <ul class="site-menu button-menu">
              <li class="cta-primary">
                <a
                  :href="app_login_url"
                  :style="{ color: themeColor }"
                  @click="closeMenu" >
                  Log In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Base Reset and Nav Layout */
.site-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.nav-link:hover,
.pages-link:hover {
    color: v-bind(themeColor);
}

/* Desktop Styles */
@media (min-width: 769px) {
    .site-nav {
        position: fixed !important;
        top: 20px;
        left: 50% !important;
        transform: translateX(-50%);
        width: 90%;
        max-width: 1300px;
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px);
        transition: all 0.3s ease;
        border: 1px solid rgba(226, 232, 240, 0.8);
        z-index: 1000;
    }
    
    .nav-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1.5rem;
    }
    
    .dropdown-menu {
        position: absolute;
        top: calc(100% + 16px);
        left: 50%;
        transform: translateX(-50%);
        min-width: 280px;
        background: #ffffff;
        border-radius: 12px;
        padding: 0.5rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(226, 232, 240, 0.8);
        z-index: 9999;
    }
    
    /* Triangle Pointer */
    .dropdown-menu::before {
        content: "";
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 12px;
        height: 12px;
        background: #ffffff;
        border-top: 1px solid rgba(226, 232, 240, 0.8);
        border-left: 1px solid rgba(226, 232, 240, 0.8);
    }
}

/* Dropdown Base Mechanics */
.dropdown {
    position: relative;
}

.dropdown-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 14px 14px; 
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #334155;
}

.dropdown-caret {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    color: #64748b;
}

.dropdown-caret.open {
    transform: rotate(180deg);
    color: v-bind(themeColor);
}

.dropdown-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

/* Individual Item Design */
.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.dropdown-item:hover .item-title {
    color: var(--theme-color-orange);
}

.dropdown-item:hover {
    background-color: #f8fafc;
}

.item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #f1f5f9;
    color: #475569;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.dropdown-item:hover .item-icon {
    background: v-bind(themeColor);
    color: var(--theme-color-lille);
}

.item-text {
    display: flex;
    flex-direction: column;
}

.item-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.25;
}

.item-desc {
    font-size: 0.75rem;
    color: #64748b;
    line-height: 1.25;
    margin-top: 2px;
}

/* Smooth Transitions */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
}

/* Enable smooth transitions for the image */
.logo-img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Rotate the image when hovering over the logo link */
.logo:hover .logo-img {
  transform: rotate(-90deg);
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
    .site-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.97);
        backdrop-filter: blur(8px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        z-index: 1000;
    }
    
    .nav-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.65rem 1rem;
    }
    
    .logo-img {
        height: 30px;
        width: auto;
    }
    
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        background: none;
        border: none;
        cursor: pointer;
        width: 44px;
        height: 44px;
        z-index: 1002;
    }
    
    .hamburger span {
        width: 24px;
        height: 3px;
        background: #333;
        border-radius: 2px;
        transition: 0.3s;
    }
    
    .hamburger span.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger span.open:nth-child(2) { opacity: 0; }
    .hamburger span.open:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
    
    .menu-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.25);
        z-index: 999;
    }
    
    .menu-container {
        position: fixed;
        top: 62px;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        flex-direction: column;
        align-items: stretch;
        padding: 0 1rem;
        gap: 1rem;
        max-height: 0;
        overflow-y: auto;
        opacity: 0;
        transform: translateY(-8px);
        pointer-events: none;
        transition: max-height 0.3s ease, opacity 0.25s ease, transform 0.25s ease, padding 0.25s ease;
        z-index: 1000;
    }
    
    .menu-container.mobile-open {
        display: flex;
        max-height: calc(100vh - 62px);
        opacity: 1;
        transform: translateY(0);
        padding: 1.25rem 1rem;
        pointer-events: auto;
    }
    
    .main-menu {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
    }
    
    .dropdown-toggle {
        width: 100%;
        justify-content: space-between;
        padding: 14px 14px;
        font-size: 1rem;
    }
    
    .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    border-left: 2px solid #e2e8f0;
    border-radius: 0;
    margin-left: 0.5rem;
    padding: 0.25rem 0 0.25rem 0.5rem;
  }

  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }

  .cta-primary a {
    display: block;
    text-align: center;
    padding: 0.75rem 1rem;
    border: 1.5px solid v-bind(themeColor);
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
  }
}
</style>
