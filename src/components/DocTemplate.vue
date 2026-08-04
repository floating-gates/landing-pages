<script setup>
defineProps({
  html: { type: String, default: '' },
});
</script>

<template>
  <div v-if="html" class="doc-content" v-html="html"></div>
  <div v-else class="empty-state">
    <p>Select a topic from the navigation menu to view documentation.</p>
  </div>
</template>

<style scoped>
.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
  font-style: italic;
}

/* v-html output, so scoped styles need :deep(). */
.doc-content {
  line-height: 1.7;
  color: #333;
}

.doc-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.doc-content :deep(h2) {
  font-size: 1.4rem;
  margin: 40px 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.doc-content :deep(h3) {
  font-size: 1.15rem;
  margin: 28px 0 12px 0;
}

.doc-content :deep(h1),
.doc-content :deep(h2),
.doc-content :deep(h3),
.doc-content :deep(h4) {
  scroll-margin-top: 100px;
}

.doc-content :deep(h4),
.doc-content :deep(h5),
.doc-content :deep(h6) {
  font-size: 1rem;
  margin: 24px 0 10px 0;
}

.doc-content :deep(p) {
  margin: 0 0 15px 0;
}

.doc-content :deep(ul),
.doc-content :deep(ol) {
  margin: 15px 0;
  padding-left: 25px;
}

.doc-content :deep(li) {
  margin-bottom: 8px;
}

.doc-content :deep(li > ul),
.doc-content :deep(li > ol) {
  margin: 8px 0;
}

.doc-content :deep(a) {
  color: #D77A61;
  text-decoration: none;
}

.doc-content :deep(a:hover) {
  text-decoration: underline;
}

.doc-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.doc-content :deep(figure) {
  margin: 28px 0;
  text-align: center;
}

.doc-content :deep(figure img) {
  max-height: 640px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.doc-content :deep(figcaption) {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #8a8f98;
}

.doc-content :deep(code) {
  background: #f1f3f5;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.88em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.doc-content :deep(pre) {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 20px 0;
}

.doc-content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.5;
}

.doc-content :deep(blockquote) {
  margin: 20px 0;
  padding: 2px 20px;
  border-left: 4px solid #D77A61;
  background: #f8f9fa;
  color: #555;
}

.doc-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.doc-content :deep(hr) {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 35px 0;
}

.doc-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.95rem;
}

.doc-content :deep(th),
.doc-content :deep(td) {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  text-align: left;
}

.doc-content :deep(th) {
  background: #f8f9fa;
  font-weight: 700;
}

@media (max-width: 768px) {
  .doc-content :deep(h1) {
    font-size: 1.6rem;
  }

  .doc-content :deep(h2) {
    font-size: 1.2rem;
  }

  .doc-content :deep(table) {
    display: block;
    overflow-x: auto;
  }
}
</style>
