<script setup>
import { ref } from 'vue';
import Header from "./Header.vue";
import DocTemplate from "./DocTemplate.vue";

import { Intro } from "../data/docs/intro.js"

const lastUpdated = 'July 20, 2026';

// Set default active tab key
const currentTab = ref('Intro');

const tabs = {
  Intro,
  // Setup,
  // QuickStart,
};

</script>

<template>
<Header :context="'landing-page'" />
<div class="terms-container">
  <div class="header-section">
    <div class="company-info">
      <h1 class="main-title">Documentation</h1>
    </div>
  </div>
  
  <div class="content-wrapper">
    <aside class="table-of-contents">
      <h3>Chapters</h3>
      
      <!-- Navigation Links -->
      <ul>
        <li v-for="(tab, name) in tabs" :key="name">
          <a @click="currentTab = name"
             :style="{ color: currentTab === name ? themeColor : '#333', fontWeight: currentTab === name ? '700' : '400' }"
             >
            {{ name }}
          </a>
        </li>
      </ul>

      <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
    </aside>
    
    <main class="terms-content">
    <DocTemplate :is="tabs[currentTab]" />
    </main>
  </div>
</div>
</template>

<style scoped>
/* Keeping your exact styles, but adding custom inline color styles for active nav item above */
.terms-container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 100px 20px 20px; /* push down so it's below the header */
    line-height: 1.6;
    color: #333;
}

.header-section {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 2px solid #e0e0e0;
}

.main-title {
    font-size: 2.5rem;
    margin: 0 0 20px 0;
    color: v-bind(themeColor);
    font-weight: 700;
}

.last-updated {
    color: #666;
    font-style: italic;
    margin: 20px 0 0 0;
}

.content-wrapper {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    align-items: start;
}

.table-of-contents {
    position: sticky;
    top: 20px;
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.table-of-contents h3 {
    margin: 0 0 15px 0;
    color: v-bind(themeColor);
    font-size: 1.1rem;
}

.table-of-contents ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.table-of-contents li {
    margin-bottom: 8px;
}

.table-of-contents a {
    text-decoration: none;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.2s ease;
}

.table-of-contents a:hover {
    color: v-bind(themeColor);
    text-decoration: underline;
}

.terms-content {
    max-width: none;
}

.term-section {
    margin-bottom: 35px;
    scroll-margin-top: 20px;
}

.term-section h2 {
    color: v-bind(themeColor);
    font-size: 1.4rem;
    margin: 0 0 15px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;
}

.term-section p {
    margin-bottom: 15px;
    text-align: justify;
}

.term-section ul {
    margin: 15px 0;
    padding-left: 25px;
}

.term-section li {
    margin-bottom: 8px;
}

.contact-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 6px;
    margin: 20px 0;
}

.contact-info p {
    margin: 5px 0;
}

.terms-footer {
    margin-top: 50px;
    padding: 30px 0;
    border-top: 2px solid #e0e0e0;
    text-align: center;
    color: #666;
}

.terms-footer p {
    margin: 5px 0;
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
    .content-wrapper {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .table-of-contents {
        position: static;
        order: 2;
    }
    
    .terms-content {
        order: 1;
    }
}

@media (max-width: 768px) {
    .terms-container {
        padding: 15px;
    }
    
    .main-title {
        font-size: 2rem;
    }
    
    .company-name {
        font-size: 1.4rem;
    }
    
    .table-of-contents {
        padding: 15px;
    }
    
    .term-section h2 {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 1.8rem;
    }
    
    .company-name {
        font-size: 1.2rem;
    }
    
    .definitions-grid {
        gap: 10px;
    }
    
    .definition-item {
        padding: 10px;
    }
}
</style>
