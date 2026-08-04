<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import Header from "./Header.vue";
import DocTemplate from "./DocTemplate.vue";
import DocsNavItem from "./DocsNavItem.vue";
import { chapters, tree } from "../utils/docs.js";

const currentSlug = ref(chapters.length ? chapters[0].slug : '');
const activeHeading = ref('');
const menuOpen = ref(false);

const currentIndex = computed(() =>
  chapters.findIndex((chapter) => chapter.slug === currentSlug.value)
);

const currentChapter = computed(() => chapters[currentIndex.value] || chapters[0]);
const previousChapter = computed(() => chapters[currentIndex.value - 1] || null);
const nextChapter = computed(() => chapters[currentIndex.value + 1] || null);
const headings = computed(() => currentChapter.value?.headings || []);

// Sanitize and load the chapter from the URL hash
function getChapterFromHash () {
  const hash = decodeURIComponent(window.location.hash.replace('#', ''));
  const matched = chapters.find(
    (chapter) => chapter.slug.toLowerCase() === hash.toLowerCase()
  );
  if (matched) currentSlug.value = matched.slug;
};

function selectChapter (slug) {
  currentSlug.value = slug;
  menuOpen.value = false;
  window.location.hash = slug;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// The hash is already spoken for by the chapter, so headings scroll without
// touching it.
function scrollToHeading(id) {
  const target = document.getElementById(id);
  if (!target) return;
  activeHeading.value = id;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
};

// Highlight whichever heading is nearest the top of the viewport.
function syncActiveHeading() {
  let current = '';
  for (const heading of headings.value) {
    const element = document.getElementById(heading.id);
    if (element && element.getBoundingClientRect().top <= 140) current = heading.id;
  }
  if (current) activeHeading.value = current;
  else if (headings.value.length) activeHeading.value = headings.value[0].id;
};

watch(currentSlug, () => {
  activeHeading.value = headings.value.length ? headings.value[0].id : '';
  nextTick(syncActiveHeading);
});

onMounted(() => {
  getChapterFromHash();
  nextTick(syncActiveHeading);
  window.addEventListener('popstate', getChapterFromHash);
  window.addEventListener('scroll', syncActiveHeading, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('popstate', getChapterFromHash);
  window.removeEventListener('scroll', syncActiveHeading);
});
</script>

<template>
<Header :context="'landing-page'" />

<div class="docs-shell mt-3">
  <button class="docs-menu-toggle" type="button" @click="menuOpen = !menuOpen">
    {{ menuOpen ? 'Hide' : 'Browse' }} contents
  </button>

  <!-- Left: nested chapter navigation -->
  <aside class="docs-nav" :class="{ 'is-open': menuOpen }">
    <h4 class="mb-3"> Documentation</h4>
    <nav>
      <ul class="docs-nav-list">
        <DocsNavItem
          v-for="node in tree"
          :key="node.slug"
          :node="node"
          :current-slug="currentSlug"
          @select="selectChapter"
        />
      </ul>
    </nav>
  </aside>

  <!-- Middle: the chapter itself -->
  <main class="docs-main">
    <h1 class="docs-title">{{ currentChapter?.title }}</h1>
    <p v-if="currentChapter?.description" class="docs-description">
      {{ currentChapter.description }}
    </p>

    <DocTemplate :is="currentChapter?.html" />

    <nav v-if="previousChapter || nextChapter" class="docs-pager">
      <a
        v-if="previousChapter"
        class="docs-pager-link is-previous"
        :href="`#${previousChapter.slug}`"
        @click.prevent="selectChapter(previousChapter.slug)"
      >
        <span class="docs-pager-label">Previous</span>
        <span class="docs-pager-title">{{ previousChapter.title }}</span>
      </a>
      <a
        v-if="nextChapter"
        class="docs-pager-link is-next"
        :href="`#${nextChapter.slug}`"
        @click.prevent="selectChapter(nextChapter.slug)"
      >
        <span class="docs-pager-label">Next</span>
        <span class="docs-pager-title">{{ nextChapter.title }}</span>
      </a>
    </nav>

    <p v-if="currentChapter?.updated" class="docs-updated">
      Last updated: {{ currentChapter.updated }}
    </p>
  </main>

  <!-- Right: on this page -->
  <aside class="docs-toc">
    <template v-if="headings.length">
      <h4 class="mb-4">On this page</h4>
      <ul>
        <li
          v-for="heading in headings"
          :key="heading.id"
        >
          <a
            :href="`#${heading.id}`"
            :class="{ 'is-active': activeHeading === heading.id }"
            @click.prevent="scrollToHeading(heading.id)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </template>
  </aside>
</div>
</template>

<style scoped>
@reference "../main.css";

.docs-shell {
  max-width: 1500px;
  margin: 0 auto;
  padding: 140px 24px 50px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 220px;
  gap: 48px;
  align-items: start;
}

/* Left navigation */
.docs-nav {
  position: sticky;
  /* Top offset keeps sticky elements below the floating Header */
  top: 110px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  padding-right: 12px;
  border-right: 1px solid #e9ecef;
}

.docs-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Middle column */
.docs-main {
  min-width: 0;
  padding-bottom: 20px;
}

.docs-title {
  margin: 0 0 12px 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--theme-color);
}

.docs-description {
  margin: 0 0 28px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
  font-size: 1.05rem;
  color: #6b7280;
}

.docs-updated {
  margin: 30px 0 0 0;
  font-size: 0.85rem;
  color: #8a8f98;
  font-style: italic;
}

/* Previous / next */
.docs-pager {
  display: flex;
  gap: 16px;
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid #e9ecef;
}

.docs-pager-link {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 18px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.15s ease;
}

.docs-pager-link:hover {
  border-color: var(--theme-color-orange);
}

.docs-pager-link.is-next {
  text-align: right;
  margin-left: auto;
}

.docs-pager-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8a8f98;
}

.docs-pager-title {
  font-weight: 600;
  color: var(--theme-color);
}

/* Right rail */
.docs-toc {
  position: sticky;
  top: 110px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}

.docs-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: 1px solid #e9ecef;
}

.docs-toc li {
  padding-left: 14px;
}

.docs-toc a {
  display: block;
  padding: 5px 0;
  color: #6b7280;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.15s ease;
}

.docs-toc a:hover {
  color: var(--theme-color);
}

.docs-toc a.is-active {
  color: var(--theme-color-orange);
  font-weight: 600;
}

/* Mobile menu button, hidden on desktop */
.docs-menu-toggle {
  display: none;
}

@media (max-width: 1200px) {
  .docs-shell {
    grid-template-columns: 240px minmax(0, 1fr);
    gap: 36px;
  }

  .docs-toc {
    display: none;
  }
}

@media (max-width: 900px) {
  .docs-shell {
    grid-template-columns: 1fr;
    padding: 85px 18px 50px;
    gap: 20px;
  }

  .docs-menu-toggle {
    display: block;
    width: 100%;
    padding: 12px 16px;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--theme-color);
    cursor: pointer;
  }

  .docs-nav {
    display: none;
    position: static;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
    padding: 0 0 20px 0;
  }

  .docs-nav.is-open {
    display: block;
  }

  .docs-pager {
    flex-direction: column;
  }

  .docs-pager-link.is-next {
    text-align: left;
  }
}
</style>
