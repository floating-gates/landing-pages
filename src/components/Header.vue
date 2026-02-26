<script setup>
import { ref } from "vue";
import { themeColor, demo_url, git_book_url, survey_link, app_login_url } from "../config.js";
import { useRouter } from "vue-router"
const router = useRouter()

const isMenuOpen = ref(false);
const isDocsOpen = ref(false);
</script>

<template>
<nav class="site-nav dark js-clone-nav js-site-navbar">
  <div class="container">
    <div class="site-navigation">
      <div class="nav-wrapper">
        <!-- Logo -->
        <a href="/" class="logo">
          <img src="../data/images/logo.webp"
               alt="Floating Gates Logo"
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
              <!-- <li><a href="/product" class="nav-link">Product</a></li> -->
              <li><a href="/pricing" class="nav-link">Pricing</a></li>
              <li><a href="/mission" class="nav-link">Mission</a></li>
              <li><a href="/faq" class="nav-link">FAQ</a></li>
              
              <!-- DROPDOWN MENU -->
              <li class="dropdown" @mouseenter="isDocsOpen = true" @mouseleave="isDocsOpen = false">
                <a class="nav-link dropdown-toggle">
                  Resources
                </a>
                
                <ul class="dropdown-menu" v-show="isDocsOpen">
                  <li><a href="/case-studies" class="nav-link">Articles</a></li>
                  <li><a :href="git_book_url" class="nav-link">Documentation</a></li>
                  <li><a :href="survey_link" class="nav-link">Survey</a></li>
                </ul>
              </li>
            </ul>
            <div class="button-group">
              <ul  class="site-menu button-menu">
                <li class="cta-button-outline">
                  <a
                    :href="app_login_url"
                    :style="{ color: themeColor }"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Login
                    </a>
                </li>
                <li class="cta-primary">
                  <a :href="demo_url">Demo</a>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.menu-container {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
}

.button-group {
    margin-left: auto;
}

.button-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.button-menu li {
    white-space: nowrap;
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

.site-navigation,
.nav-wrapper {
  display: flex;
  align-items: center;
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
    padding: 0.5rem 1rem;
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

  .button-group {
    margin-left: 0;
    width: 100%;
  }

  .main-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .button-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .button-menu li {
    width: 100%;
  }

/* Center the main nav links */
  .site-menu li {
    text-align: center;
  }

  /* Adjust the dropdown container for mobile */
  .dropdown-menu {
    position: static;    /* Removes the floating/absolute behavior */
    box-shadow: none;    /* Removes the shadow for a cleaner look on mobile */
    width: 100%;
    padding: 0;
    background: transparent; /* Allows it to blend with the mobile menu background */
    display: flex;
    align-items: center; /* Centers items horizontally in flex column */
  }

  .dropdown-menu li {
    width: 100%;
    text-align: center;
  }
}

.chevron {
  font-size: 14px;
  opacity: 0.7;
}
</style>
