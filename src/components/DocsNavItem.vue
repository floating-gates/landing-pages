<script setup>
import { ref, computed, watch } from 'vue';
import { themeColor, themeColorOrange } from "../config.js";

// One row in the docs sidebar. Recurses into itself for sub-chapters, which is
// how the folder structure under /docs turns into nested navigation.
const props = defineProps({
  node: { type: Object, required: true },
  currentSlug: { type: String, default: '' },
});

defineEmits(['select']);

const hasChildren = computed(() => props.node.children?.length > 0);

const isActive = computed(() => props.currentSlug === props.node.slug);

// A section counts as containing the current page if the slug sits below it.
const containsCurrent = computed(
  () => props.currentSlug === props.node.slug || props.currentSlug.startsWith(`${props.node.slug}/`)
);

const expanded = ref(containsCurrent.value);

// Open the section the reader navigates into, but leave manual toggles alone.
watch(containsCurrent, (inside) => {
  if (inside) expanded.value = true;
});
</script>

<template>
  <li class="nav-item">
    <div class="nav-row">
      <a
        class="nav-link"
        :class="{ 'is-active': isActive, 'is-ancestor': containsCurrent && !isActive }"
        :href="`#${node.slug}`"
        @click.prevent="$emit('select', node.slug)"
      >
        {{ node.title }}
      </a>

      <button
        v-if="hasChildren"
        class="nav-toggle"
        type="button"
        :aria-expanded="expanded"
        :aria-label="`${expanded ? 'Collapse' : 'Expand'} ${node.title}`"
        @click="expanded = !expanded"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" :class="{ 'is-open': expanded }">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <ul v-if="hasChildren && expanded" class="nav-children">
      <DocsNavItem
        v-for="child in node.children"
        :key="child.slug"
        :node="child"
        :current-slug="currentSlug"
        @select="$emit('select', $event)"
      />
    </ul>
  </li>
</template>

<style scoped>
.nav-item {
  list-style: none;
}

.nav-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  flex: 1;
  display: block;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.35;
  color: #4b5563;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  background: #f3f4f6;
  color: v-bind(themeColor);
}

.nav-link.is-ancestor {
  color: v-bind(themeColor);
  font-weight: 600;
}

.nav-link.is-active {
  background: #f3f4f6;
  color: v-bind(themeColorOrange);
  font-weight: 700;
}

.nav-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  background: none;
  color: #9ca3af;
  cursor: pointer;
}

.nav-toggle:hover {
  color: v-bind(themeColor);
}

.nav-toggle svg {
  transition: transform 0.15s ease;
}

.nav-toggle svg.is-open {
  transform: rotate(90deg);
}

.nav-children {
  margin: 2px 0 2px 12px;
  padding: 0 0 0 8px;
  border-left: 1px solid #e9ecef;
}
</style>
