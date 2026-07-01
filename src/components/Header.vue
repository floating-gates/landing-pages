<script setup>
import { ref } from "vue";
import { themeColor, demo_url, git_book_url, survey_link, app_login_url } from "../config.js";
import short_logo from "../data/images/logo_short_black.webp"

const isMenuOpen = ref(false);
const isDropdownMenuOpen = ref(false);
</script>

<template>
<nav class="site-nav js-site-navbar">
    <div class="site-navigation">
      <div class="nav-wrapper">
        <!-- Logo -->
        <a href="/" class="logo mx-7">
          <img :src="short_logo"
               alt="Floating Gates"
               class="logo-img" />
        </a>
        
        <!-- Hamburger button -->
        <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
        </button>
        
        <!-- Menus -->
        <div class="menu-container" :class="{ 'mobile-open': isMenuOpen }">
          
          <!-- LANDING PAGE HEADER -->
            <ul class="site-menu main-menu">
              <li><a href="/" class="nav-link">Home</a></li>
              <li><a href="/product" class="pages-link">How does it Work</a></li>
              <li><a href="/pricing" class="pages-link">Pricing</a></li>
              <li><a href="/mission" class="pages-link">Mission</a></li>
              <!-- <li><a href="/use-case" class="pages-link">Use Cases</a></li> -->
              <li><a href="/download" class="pages-link">Download</a></li>
              <li><a href="/faq" class="pages-link">FAQ</a></li>
              
              <!-- DROPDOWN MENU -->
              <li class="dropdown"
                  @mouseenter="isDropdownMenuOpen = true"
                  @mouseleave="isDropdownMenuOpen = false">
                <a class="nav-link dropdown-toggle">
                  Resources
                </a>
                
                <ul class="dropdown-menu" v-show="isDropdownMenuOpen">
                  <li><a href="/articles" class="nav-link">Articles</a></li>
                  <li><a :href="git_book_url" class="nav-link">Documentation</a></li>
                  <li><a :href="survey_link" class="nav-link">Survey</a></li>
                </ul>
              </li>
            </ul>
            <div class="button-group mr-2">
              <ul  class="site-menu button-menu">
                <li class="cta-primary">
                  <a
                    :href="app_login_url"
                    :style="{ color: themeColor }" >
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
</nav>
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
  }
}

/* Mobile styles */
.hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
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


@media (max-width: 768px) {
    .menu-container {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        flex-direction: column;
        align-items: stretch;
        padding: 1rem;
        gap: 1rem;
        display: none;
        z-index: 1000;
  }

  .menu-container.mobile-open {
    display: flex;
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

  /* Adjust the dropdown container for mobile */
  .dropdown-menu {
    position: static;    /* Removes the floating/absolute behavior */
    box-shadow: none;    /* Removes the shadow for a cleaner look on mobile */
    width: 100%;
    padding: 0;
    background: transparent; 
    display: flex;
    align-items: center; /* Centers items horizontally in flex column */
  }

  .dropdown-menu li {
    width: 100%;
    text-align: center;
  }
}
</style>
