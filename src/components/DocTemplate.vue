<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Accepts rendered Markdown (String), an Array of section data,
  // or a Vue Component
  html_content: {
    type: [Array, Object, Function, String],
    default: () => []
  }
});

const isHtml = computed(() => typeof props.html_content === 'string');
</script>

<template>
<div class="doc-template">
  <div class="markdown-body" v-html="props.html_content"></div>
</div>
</template>

<style scoped>
.doc-template {
  width: 100%;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
  font-style: italic;
}

/*
 * Markdown output. Rendered with v-html, so scoped styles do not reach it
 * without :deep().
 */
.markdown-body {
  line-height: 1.7;
  color: #333;
}

.markdown-body :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.markdown-body :deep(h2) {
  font-size: 1.4rem;
  margin: 40px 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.markdown-body :deep(h3) {
  font-size: 1.15rem;
  margin: 28px 0 12px 0;
}

/* Leave room for the fixed site header when jumping to an anchor. */
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  scroll-margin-top: 100px;
}

.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  font-size: 1rem;
  margin: 24px 0 10px 0;
}

.markdown-body :deep(p) {
  margin: 0 0 15px 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 15px 0;
  padding-left: 25px;
}

.markdown-body :deep(li) {
  margin-bottom: 8px;
}

.markdown-body :deep(li > ul),
.markdown-body :deep(li > ol) {
  margin: 8px 0;
}

.markdown-body :deep(a) {
  color: #D77A61;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(img) {
  display: block;
  margin: 20px auto;
  max-width: clamp(60%, 70%, 1100px);
  height: auto;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

/* Screenshots: centred, capped, with the alt text as a caption underneath. */
.markdown-body :deep(figure) {
  margin: 28px 0;
  text-align: center;
}

.markdown-body :deep(figure img) {
  max-height: 640px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.markdown-body :deep(figure.full img) {
  max-height: none;
  width: 100%;
}

.markdown-body :deep(figcaption) {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #8a8f98;
}

.markdown-body :deep(code) {
  background: #f1f3f5;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.88em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.markdown-body :deep(pre) {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 20px 0;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.5;
}

.markdown-body :deep(blockquote) {
  margin: 20px 0;
  padding: 2px 20px;
  border-left: 4px solid #D77A61;
  background: #f8f9fa;
  color: #555;
}

.markdown-body :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 35px 0;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.95rem;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  text-align: left;
}

.markdown-body :deep(th) {
  background: #f8f9fa;
  font-weight: 700;
}

@media (max-width: 768px) {
  .markdown-body :deep(h1) {
    font-size: 1.6rem;
  }

  .markdown-body :deep(h2) {
    font-size: 1.2rem;
  }

  .markdown-body :deep(table) {
    display: block;
    overflow-x: auto;
  }
}
</style>
