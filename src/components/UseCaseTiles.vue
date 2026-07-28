<script setup>
import { ref, computed, watchEffect } from "vue";
import { themeColor, themeColorOrange, themeColorWhite } from "../config.js";
import Header from "../components/Header.vue";
import { useRoute, useRouter } from "vue-router";
import background from "../data/images/background_pic.webp";

// 1. Define and capture props
const props = defineProps({
  articles: {
    type: Array,
    required: true,
    default: () => []
  }
});

// Pagination & Routing
const route = useRoute();
const router = useRouter();
const selectedArticle = ref(null);
const currentPage = ref(1);
const perPage = 2;

// 2. Use props.articles instead of articles
const totalPages = computed(() => {
  return Math.ceil((props.articles?.length || 0) / perPage);
});

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return (props.articles || []).slice(start, start + perPage);
});

// 3. Cast ID to handle both String and Number types
watchEffect(() => {
  const id = route.query.article;
  if (!id) {
    selectedArticle.value = null;
    return;
  }
  selectedArticle.value = props.articles.find(a => String(a.id) === String(id)) || null;
});

const openArticle = (article) => {
  router.push({ query: { article: article.id } });
};

const closeArticle = () => {
  router.push({ query: {} }); // remove param
};
</script>

<template>
  <div 
    class="py-8 lg:py-16 bg-cover bg-center"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <div class="max-w-[1200px] mx-auto px-8 pt-32 pb-12 text-center">
      <h1 class="heading">Resources</h1>
      <p class="text-xl leading-relaxed font-normal opacity-80">
        Discover how we've helped companies through open solutions.
      </p>
    </div>
    
    <div class="max-w-[1200px] mx-auto px-8 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-8 mb-12">
        <div
          v-for="article in paginatedArticles"
          :key="article.id"
          class="group relative rounded-3xl overflow-hidden border-2 border-transparent transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          :style="{ backgroundColor: themeColorWhite }"
        >
          <div class="relative grid place-items-center h-[240px] bg-neutral-100 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-contain object-center"
            />
            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div class="p-6 md:p-8">
            <h2 class="heading-card">{{ article.title }}</h2>
            <p class="text-base leading-relaxed mb-4 opacity-80">{{ article.excerpt }}</p>
            <p class="text-base leading-relaxed mb-8 opacity-80 font-medium">Author: {{ article.author }}</p>
            
            <button
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[15px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] group/btn"
              :style="{ backgroundColor: themeColorOrange, color: themeColorWhite }"
              @click="openArticle(article)"
            >
              <span>Read Case Study</span>
              <svg class="w-5 h-5 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="max-w-[1200px] mx-auto px-8 pb-16">
      <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <button
          class="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[15px] border-2 cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          :disabled="currentPage === 1"
          :style="{ 
            backgroundColor: currentPage === 1 ? 'transparent' : themeColor, 
            color: currentPage === 1 ? themeColor : themeColorWhite,
            borderColor: themeColor
          }"
          @click="currentPage--"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>
        
        <div class="flex items-center gap-2 font-semibold text-lg">
          <span class="text-xl font-bold">{{ currentPage }}</span>
          <span class="opacity-60">of</span>
          <span class="opacity-80">{{ totalPages }}</span>
        </div>
        
        <button
          class="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[15px] border-2 cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          :disabled="currentPage === totalPages"
          :style="{ 
            backgroundColor: currentPage === totalPages ? 'transparent' : themeColor, 
            color: currentPage === totalPages ? themeColor : themeColorWhite,
            borderColor: themeColor
          }"
          @click="currentPage++"
        >
          Next
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Modal Backdrop -->
    <div
      v-if="selectedArticle"
      class="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-start z-50 px-4 pt-16 pb-4"
      @click="closeArticle"
    >
      <div
        class="w-full max-w-[900px] max-h-[90vh] rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.3)] flex flex-col animate-modalEnter"
        :style="{ backgroundColor: themeColorWhite, color: themeColor }"
        @click.stop
      >
        <div class="flex items-center justify-between p-6 md:p-8 pb-4 border-b border-black/10">
          <h2 class="text-2xl md:text-3xl font-bold leading-tight m-0">{{ selectedArticle.title }}</h2>
          <button
            class="flex items-center justify-center w-10 h-10 rounded-lg border-none cursor-pointer transition-transform duration-200 hover:scale-105 shrink-0 ml-4"
            :style="{ backgroundColor: themeColorOrange, color: themeColorWhite }"
            @click="closeArticle"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 md:p-8 pt-4">
          <img
            v-if="selectedArticle.image"
            :src="selectedArticle.image"
            :alt="selectedArticle.title"
            class="w-full h-[50vh] object-contain object-center rounded-2xl mb-8"
          />
          
          <div class="text-lg leading-relaxed w-full modal-text-render">
            <div
              v-for="(section, idx) in selectedArticle.content"
              :key="idx"
              class="mb-6"
            >
              <h3 v-if="section.sub_title" class="text-xl font-bold mb-3">{{ section.sub_title }}</h3>
              <div class="space-y-3">
                <template v-for="(line, lIdx) in section.sub_content.split('\n')" :key="lIdx">
                  <p v-if="!line.trim().startsWith('•') && !line.match(/^\d+\./)">
                    {{ line }}
                  </p>
                </template>
              </div>
            </div>
          </div>

          <a 
            v-if="selectedArticle.callToActionLink" 
            :href="selectedArticle.callToActionLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-3 mt-8 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-250 hover:-translate-y-0.5 hover:scale-[1.02] shadow-[0_6px_15px_rgba(255,107,45,0.35)] hover:shadow-[0_12px_24px_rgba(255,107,45,0.45)] group/cta"
            :style="{ backgroundColor: themeColorOrange, color: themeColor }"
          >
            {{ selectedArticle.callToActionText }}
            <svg class="w-5 h-5 transition-transform duration-250 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heading-card {
  color: #223843;
  line-height: 1.5rem;
  letter-spacing: -0.03em;  
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: clamp(1.0rem, 1.5vw, 2rem); 
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modalEnter {
  animation: modalEnter 0.3s ease-out forwards;
}

.modal-text-render ul {
  padding-left: 1.5rem;
  margin: 0.5rem 0 1rem;
  list-style-type: disc;
}
.modal-text-render li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
</style>
