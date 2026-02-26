<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);
const consent = ref(null);

onMounted(() => {
  const savedConsent = localStorage.getItem('user-cookie-consent');
  if (!savedConsent) {
    isVisible.value = true;
  }
});

const acceptAll = () => {
  saveConsent({ technical: true, marketing: true, analytics: true });
};

const rejectAll = () => {
  // Only technical cookies allowed
  saveConsent({ technical: true, marketing: false, analytics: false });
};

const saveConsent = (settings) => {
  consent.value = settings;
  localStorage.setItem('user-cookie-consent', JSON.stringify(settings));
  isVisible.value = false;
  // Trigger event for analytics/ads scripts to initialize
  window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: settings }));
};

</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="cookie-banner">
      <div class="cookie-content">
        <h3>Privacy Policy</h3>
        <p>
          We use cookies to improve your experience and support our service. 
          You can <strong>Accept All</strong> cookies, or continue with <strong>Technical Only</strong>. Read our <a href="/privacy-policy">Privacy Policy</a> for more.
        </p>
        
        <div class="cookie-actions">
          <button @click="acceptAll" class="btn-primary">Accept All</button>
          <button @click="rejectAll" class="btn-secondary">Technical Only
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 24px;   /* Distance from bottom */
  right: 24px;    /* Distance from right edge */
  width: 380px;   /* Fixed width is usually better for corner banners */
  max-width: 90vw; /* Safety net for small mobile screens */
  background: #ffffff;
  color: #1a1a1a;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  z-index: 1000;
  border: 1px solid #eee;
}

.cookie-content h3 { margin-top: 0; font-size: 1.2rem; }
.cookie-content p { font-size: 0.9rem; line-height: 1.5; color: #555; }

.cookie-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  transition: all 0.2s;
}

.btn-primary { background: #223843; color: white; }
.btn-secondary { background: #e5e7eb; color: #374151; }
.btn-outline { background: transparent; border: 1px solid #2563eb; color: #2563eb; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
