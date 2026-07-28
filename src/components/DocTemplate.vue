<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Accepts either an Array of section data or a Vue Component
  is: {
    type: [Array, Object, Function, String],
    default: () => []
  }
});

// Helper to determine if prop passed is a raw data structure array
const isArrayData = computed(() => Array.isArray(props.is));
</script>

<template>
  <div class="doc-template">
    <!-- 1. Render Structured Data Arrays (e.g., intro_struct) -->
    <template v-if="isArrayData">
      <section 
        v-for="(section, index) in props.is" 
        :key="index" 
        class="term-section"
      >
        <h2 v-if="section.header">{{ section.header }}</h2>
        <p v-if="section.context">{{ section.context }}</p>
        <div v-if="section.img" class="section-image">
          <img :src="section.img" :alt="section.header || 'Doc image'" />
        </div>
      </section>
    </template>

    <!-- 2. Render Dynamic Vue Components (e.g., Setup, QuickStart) -->
    <component v-else-if="props.is" :is="props.is" />

    <!-- Fallback if no tab content is selected -->
    <div v-else class="empty-state">
      <p>Select a topic from the navigation menu to view documentation.</p>
    </div>
  </div>
</template>

<style scoped>
.doc-template {
  width: 100%;
}

.term-section {
  margin-bottom: 35px;
  scroll-margin-top: 20px;
}

.term-section h2 {
  font-size: 1.4rem;
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.term-section p {
  margin-bottom: 15px;
  line-height: 1.6;
}

.section-image {
  margin: 20px 0;
}

.section-image img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
