<script setup>
import Header from "../components/Header.vue"
import { contactInfo } from "../config.js"
import {
    cookieInventory,
    thirdPartyEndpoints,
    openCookieSettings,
} from "../utils/consent.js"

const lastUpdated = "November 24, 2026";

function scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
</script>

<template>
  <Header :context="'landing-page'" />
  <div class="terms-container">
    <div class="header-section">
      <h1 class="main-title">Cookie Policy</h1>
      <div class="company-info">
        <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <div class="content-wrapper">
      <nav class="table-of-contents">
        <h3>Table of Contents</h3>
        <ul>
          <li><a href="#scope" @click="scrollTo('scope')">1. Scope</a></li>
          <li><a href="#what" @click="scrollTo('what')">2. What we use</a></li>
          <li><a href="#inventory" @click="scrollTo('inventory')">3. Cookie inventory</a></li>
          <li><a href="#third-parties" @click="scrollTo('third-parties')">4. Third-party endpoints</a></li>
          <li><a href="#consent" @click="scrollTo('consent')">5. Consent and withdrawal</a></li>
          <li><a href="#contact" @click="scrollTo('contact')">6. Contact</a></li>
        </ul>
      </nav>

      <main class="terms-content">
        <section id="scope" class="term-section">
          <h2>1. Scope</h2>
          <p>
            This policy covers the public marketing website at floating-gates.com and its pages
            (home, product, pricing, documentation, legal pages, and campaign landing pages
            served from this site). It does not automatically cover the signed-in application
            at app.floating-gates.com or a Good2Manufacture server you host yourself.
          </p>
          <p>
            Technologies in scope: this Vue site, Google Analytics 4 (only after consent),
            Google Fonts for type, and the consent record stored in your browser.
            We do not currently use a tag manager, A/B testing tool, chat widget, or advertising pixel
            on this site.
          </p>
        </section>

        <section id="what" class="term-section">
          <h2>2. What we use</h2>
          <ul>
            <li><strong>Essential:</strong> storage that remembers your cookie choice. Legal basis: legal obligation and contract.</li>
            <li><strong>Analytics:</strong> Google Analytics 4. Legal basis: consent. Blocked until you opt in.</li>
            <li><strong>Marketing:</strong> none active. Legal basis would be consent if we add any.</li>
          </ul>
          <p>
            Non-essential tags are not present in the first HTML response. Analytics is injected
            only after an affirmative choice. Consent is stored for 6 months, then we ask again.
          </p>
        </section>

        <section id="inventory" class="term-section">
          <h2>3. Cookie inventory</h2>
          <div v-for="item in cookieInventory" :key="item.name" class="definition-item">
            <p><strong>{{ item.name }}</strong> ({{ item.category }})</p>
            <ul>
              <li>Provider: {{ item.provider }}</li>
              <li>Purpose: {{ item.purpose }}</li>
              <li>Type: {{ item.type }}</li>
              <li>Lifetime: {{ item.lifetime }}</li>
              <li>Pages: {{ item.pages }}</li>
              <li>Lawful basis: {{ item.lawfulBasis }}</li>
            </ul>
          </div>
        </section>

        <section id="third-parties" class="term-section">
          <h2>4. Third-party endpoints</h2>
          <div v-for="item in thirdPartyEndpoints" :key="item.name" class="definition-item">
            <p><strong>{{ item.name }}</strong> ({{ item.category }})</p>
            <ul>
              <li>URL: {{ item.url }}</li>
              <li>Data: {{ item.data }}</li>
              <li>When it runs: {{ item.blockedUntil }}</li>
            </ul>
          </div>
        </section>

        <section id="consent" class="term-section">
          <h2>5. Consent and withdrawal</h2>
          <p>
            You can accept all, reject non-essential cookies, or choose categories.
            Rejecting is as available as accepting. You can withdraw or change your choice
            at any time:
          </p>
          <p>
            <button type="button" class="settings-link" @click="openCookieSettings">
              Open cookie settings
            </button>
          </p>
          <p>
            Withdrawal does not affect the lawfulness of processing before you withdrew consent.
            After a reject or expiry we keep Google consent mode in the denied state and do not
            load the analytics script.
          </p>
        </section>

        <section id="contact" class="term-section">
          <h2>6. Contact</h2>
          <div class="contact-info">
            <p>Email: {{ contactInfo.email }}</p>
            <p>Address: {{ contactInfo.address }}</p>
            <p>VAT: {{ contactInfo.vat }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>

@reference "../main.css";

/* Same styles as your Terms of Service component */
.terms-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: var(--header-stack) 20px 20px;
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
    color: var(--theme-color);
    font-weight: 700;
}

.last-updated {
    color: #666;
    font-style: italic;
    margin: 0;
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
    color: var(--theme-color);
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
    color: var(--theme-color);
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

.definitions-grid {
    display: grid;
    gap: 15px;
    margin: 20px 0;
}

.definition-item {
    background: #f8f9fa;
    padding: 4px;
    border-radius: 4px;
    border-color: var(--theme-color);
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

/* Mobile responsiveness same as TOS */
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
    .terms-container { padding: var(--header-stack) 15px 15px; }
    .main-title { font-size: 2rem; }
    .table-of-contents { padding: 15px; }
    .term-section h2 { font-size: 1.2rem; }
}

@media (max-width: 480px) {
    .main-title { font-size: 1.8rem; }
    .definitions-grid { gap: 10px; }
    .definition-item { padding: 10px; }
}

.table-of-contents h3 {
    margin: 0 0 15px 0;
    color: var(--theme-color);
    font-size: 1.1rem;
}
.settings-link {
    background: var(--theme-color);
    color: var(--theme-color-white);
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 600;
    cursor: pointer;
}
</style>
