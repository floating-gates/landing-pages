<script setup>
import { ref } from "vue";
import { themeColor, demo_url, git_book_url, survey_link, app_login_url } from "../config.js";
import short_logo from "../data/images/logo_short_black.webp"

const isMenuOpen = ref(false);
const isDropdownMenuOpen = ref(false);

function toggleDropdown() {
  isDropdownMenuOpen.value = !isDropdownMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
  isDropdownMenuOpen.value = false;
}
</script>

<template>
<header class="site-nav">
    <div class="site-navigation">
      <div class="nav-wrapper">
        <!-- Logo -->
        <a href="/" class="logo mx-7" @click="closeMenu">
          <img :src="short_logo"
               alt="Floating Gates"
               class="logo-img" />
        </a>
        
        <!-- Hamburger button -->
        <button
          class="hamburger"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation menu" >
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
        </button>

        <!-- Backdrop (mobile only, closes menu on outside tap) -->
        <div
          v-if="isMenuOpen"
          class="menu-backdrop"
          @click="closeMenu" ></div>
        
        <!-- Menus -->
        <div class="menu-container" :class="{ 'mobile-open': isMenuOpen }">
          
          <!-- LANDING PAGE HEADER -->
            <ul class="site-menu main-menu">
              <li><a href="/" class="nav-link" @click="closeMenu">Home</a></li>
              <li><a href="/product" class="pages-link" @click="closeMenu">How does it Work</a></li>
              <li><a href="/pricing" class="pages-link" @click="closeMenu">Pricing</a></li>
              <li><a href="/mission" class="pages-link" @click="closeMenu">Mission</a></li>
              <!-- <li><a href="/use-case" class="pages-link">Use Cases</a></li> -->
              <li><a href="/download" class="pages-link" @click="closeMenu">Download</a></li>
              <li><a href="/faq" class="pages-link" @click="closeMenu">FAQ</a></li>
              
              <!-- DROPDOWN MENU -->
              <li class="dropdown"
                  @mouseenter="isDropdownMenuOpen = true"
                  @mouseleave="isDropdownMenuOpen = false">
                <a
                  class="nav-link dropdown-toggle"
                  @click.prevent="toggleDropdown"
                  :aria-expanded="isDropdownMenuOpen" >
                  Resources
                  <svg class="dropdown-caret" :class="{ open: isDropdownMenuOpen }"
                       width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                
                <ul class="dropdown-menu" v-show="isDropdownMenuOpen">
                  <li><a href="/articles" class="nav-link" @click="closeMenu">Articles</a></li>
                  <li><a :href="git_book_url" class="nav-link" @click="closeMenu">Documentation</a></li>
                  <li><a :href="survey_link" class="nav-link" @click="closeMenu">Survey</a></li>
                </ul>
              </li>
            </ul>
            <div class="button-group mr-2">
              <ul  class="site-menu button-menu">
                <li class="cta-primary">
                  <a
                    :href="app_login_url"
                    :style="{ color: themeColor }"
                    @click="closeMenu" >
                    Factory Hub
                    </a>
                </li>
                <!-- <li class="cta-primary"> -->
                <!--   <a :href="demo_url">Go to Factory UI</a> -->
                <!-- </li> -->
              </ul>
        </div>
      </div>
    </div>
  </div>
</header>
</template>

<style scoped>
/* Desktop PC Floating and Center Settings */
@media (min-width: 769px) {
  .site-nav {
    position: fixed !important;
    top: 20px;                  /* Floats down slightly from top boundary */
    left: 50% !important;
    transform: translateX(-50%); /* Core logic to center fixed elements */
    width: 90%;                 /* Width percentage of viewport */
    max-width: 1300px;          /* Maximum expansion size constraint */
    border-radius: 15px;        /* Soft rounded corners for floating appearance */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* Gives elevation depth */
    background-color: rgba(255, 255, 255, 0.95); /* Clean visibility fallback */
    backdrop-filter: blur(8px); /* Trendy subtle glass effect */
    transition: all 0.3s ease;
    border-color: v-bind(themeColor);
    z-index: 1000;
  }
}

/* Mobile styles */
.hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1002;
}

.hamburger span {
    width: 24px;
    height: 3px;
    background: #333;
    border-radius: 2px;
    transition: 0.3s;
}

/* animate hamburger to X when open */
.hamburger span.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
    opacity: 0;
}
.hamburger span.open:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
}

.dropdown {
    position: relative;
    cursor: pointer;
}

.dropdown-toggle {
    display: inline-flex !important; /* Force flex behavior to override any global 'display: block' rules */
    align-items: center;
    justify-content: flex-start;    /* Keeps text and caret close on desktop */
    gap: 6px;                       /* Adds a nice clean space between the text and arrow */
}

.dropdown-caret {
    transition: transform 0.2s ease;
    flex-shrink: 0;
}

.dropdown-caret.open {
    transform: rotate(180deg);
}

/* Dropdown menu */
.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;       /* aligns under the "Profile" button */
    left: auto;     /* prevents stretching */
    background: white;
    padding: 0.5rem 0;
    list-style: none;
    min-width: 180px;
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.35),
      0 6px 20px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 9999;
}

.dropdown-menu li a {
    padding: 0rem 1rem;
    display: block;
    white-space: nowrap;
}

.dropdown-menu li a:hover {
    background: #f5f5f5;
}

.menu-backdrop {
    display: none;
}


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

  .logo {
    margin: 0 !important;
  }

  .logo-img {
    height: 30px;
    width: auto;
    display: block;
  }

  .hamburger {
    width: 44px;
    height: 44px;
  }

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

  .hamburger {
    display: flex;
  }

  .main-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .main-menu li a {
    display: block;
    padding: 0.5rem 0;
    font-size: 1rem;
  }

  .button-group {
    margin: 0 !important;
    padding-bottom: 0.5rem;
  }

  .button-menu {
    width: 100%;
  }

  .cta-primary a {
    display: block;
    text-align: center;
    padding: 0.75rem 1rem;
    border: 1.5px solid v-bind(themeColor);
    border-radius: 10px;
    font-weight: 600;
  }

  /* Adjust the dropdown container for mobile */
  .dropdown-menu {
    position: static;    /* Removes the floating/absolute behavior */
    box-shadow: none;    /* Removes the shadow for a cleaner look on mobile */
    width: 100%;
    padding: 0 0 0 0.75rem;
    background: transparent; 
    display: flex;
    align-items: flex-start;
  }

  .dropdown-menu li {
    width: 100%;
    text-align: left;
  }

  .dropdown-toggle {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
