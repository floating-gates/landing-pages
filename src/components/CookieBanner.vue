<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import {
    OPEN_SETTINGS_EVENT,
    defaultConsent,
    getConsent,
    hasAnswered,
    inventoryByCategory,
    saveConsent,
} from "../utils/consent.js";

const isVisible = ref(false);
const showDetails = ref(false);
const choices = reactive({ ...defaultConsent });

const categories = [
    {
        id: "essential",
        label: "Essential",
        locked: true,
        description: "Required to remember your choices and keep the site working. These cannot be switched off.",
        items: inventoryByCategory("essential"),
    },
    {
        id: "analytics",
        label: "Analytics",
        locked: false,
        description: "Helps us understand how the public site is used. Google Analytics stays blocked until you opt in.",
        items: inventoryByCategory("analytics"),
    },
    {
        id: "marketing",
        label: "Marketing",
        locked: false,
        description: "Advertising or remarketing tags. None are active today; this control is here so none can be added without consent.",
        items: inventoryByCategory("marketing"),
    },
];

function syncChoicesFromStore() {
    Object.assign(choices, defaultConsent, getConsent(), { essential: true });
}

function openBanner(detailed = false) {
    syncChoicesFromStore();
    showDetails.value = detailed;
    isVisible.value = true;
}

function closeBanner() {
    isVisible.value = false;
    showDetails.value = false;
}

function acceptAll() {
    saveConsent({ essential: true, analytics: true, marketing: true }, "accept-all");
    closeBanner();
}

function rejectNonEssential() {
    saveConsent({ ...defaultConsent }, "reject");
    closeBanner();
}

function saveCustom() {
    saveConsent({ ...choices, essential: true }, "customize");
    closeBanner();
}

function onOpenSettings() {
    openBanner(true);
}

onMounted(() => {
    syncChoicesFromStore();
    if (!hasAnswered()) {
        isVisible.value = true;
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
});

onUnmounted(() => {
    window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="cookie-banner"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div class="cookie-content">
        <h3 id="cookie-banner-title">Cookie choices</h3>
        <p>
          We use essential storage to remember this choice. Analytics cookies
          (Google Analytics) load only if you accept them. You can change your
          mind at any time.
          Read the
          <a href="/cookie-policy">Cookie Policy</a>
          and
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <div v-if="showDetails" class="cookie-details">
          <fieldset
            v-for="category in categories"
            :key="category.id"
            class="cookie-category"
          >
            <legend class="category-head">
              <span>{{ category.label }}</span>
              <label class="switch">
                <input
                  type="checkbox"
                  :checked="choices[category.id]"
                  :disabled="category.locked"
                  @change="choices[category.id] = $event.target.checked"
                />
                <span class="sr-only">{{ category.label }}</span>
              </label>
            </legend>
            <p>{{ category.description }}</p>
            <ul v-if="category.items.length">
              <li v-for="item in category.items" :key="item.name">
                <strong>Cookie name: {{ item.name }}</strong> <br>y
                {{ item.purpose }}
                ({{ item.lifetime }})
              </li>
            </ul>
            <p v-else class="empty">No cookies in this category are in use.</p>
          </fieldset>
        </div>

        <div class="cookie-actions">
          <button type="button" class="btn-secondary" @click="rejectNonEssential">
            Reject non-essential
          </button>
          <button
            v-if="!showDetails"
            type="button"
            class="btn-secondary"
            @click="showDetails = true"
          >
            Customize
          </button>
          <button
            v-else
            type="button"
            class="btn-secondary"
            @click="saveCustom"
          >
            Save choices
          </button>
          <button type="button" class="btn-primary" @click="acceptAll">
            Accept all
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@reference "../main.css";

.cookie-banner {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 420px;
    max-width: min(92vw, 440px);
    max-height: calc(100vh - 48px);
    overflow: auto;
    background: #ffffff;
    color: #1a1a1a;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    border: 1px solid #eee;
}

.cookie-content h3 {
    margin-top: 0;
    font-size: 1.2rem;
    color: var(--theme-color);
}

.cookie-content p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #555;
}

.cookie-content a {
    color: var(--theme-color-orange);
}

.cookie-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
}

.cookie-category {
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 12px;
    margin: 0;
}

.category-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 700;
    color: var(--theme-color);
}

.cookie-category p,
.cookie-category li {
    font-size: 0.82rem;
    color: #555;
}

.cookie-category ul {
    margin: 8px 0 0;
    padding-left: 18px;
}

.empty {
    margin-bottom: 0;
    font-style: italic;
}

.switch input {
    width: 18px;
    height: 18px;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.cookie-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
}

button {
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    border: none;
    transition: all 0.2s;
}

.btn-primary {
    background: var(--theme-color);
    color: var(--theme-color-white);
}

.btn-secondary {
    background: #e5e7eb;
    color: #374151;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 640px) {
    .cookie-banner {
        right: 12px;
        left: 12px;
        bottom: 12px;
        width: auto;
        max-width: none;
    }
}
</style>
