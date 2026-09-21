<script setup>
import { ref } from "vue";
import background from "../data/images/background_pic.webp";
import { Logo, LinuxIcon, DownloadIcon, SmallCheckIcon } from "../helper/icons_generator.js";
import { themeColorOrange, install_docs_url } from "../config.js";

import IconGoodTwoManufacture from "../data/images/Icon-good2manufacture.svg";
import serverLogo from "../data/images/ServerLogo.svg";

import Header from "../components/Header.vue";
import { handleDownloadClick } from "../helper/download.js";

const manual_version = "1.0.0";
const releaseDate = "21 September 2026";

const lin_installer = "";
const platform = {
    label: "Linux - x64",
    filename: "good2manufacture.tar.gz",
    icon: "linux",
};

const requirements = [
    {
        platform: "Linux",
        items: ["Kernel version ≥ 6.3", "Podman version ≥ 5.9", "8 GB RAM minimum"],
    },
];
</script>

<template>
<div class="flex flex-col min-h-screen">
  <Header />
  <div
    class="flex-grow flex flex-col items-center justify-center bg-cover bg-center px-4 py-12"
    :style="{ backgroundImage: `url(${background})` }"
    >
    <div class="w-full max-w-6xl">
      <!-- Title Section -->
      <div class="text-center mb-12">
        <h2 class="heading flex items-center justify-center inline-flex">
          <img :src="IconGoodTwoManufacture" alt="Good2Manufacture" class="w-30 h-30 mr-8" />
          <span>
            Good2Manufacture
            <span :style="{ color: themeColorOrange }">Server</span>
          </span>
        </h2>
        <p class="text-lg text-gray-600 mt-2">
          Allow your client to communicate and perceive all the files in your factory computers and associates.
        </p>
        <p class="text-sm text-gray-500 mt-1">
          Version: {{ manual_version }} | Released: {{ releaseDate }}
        </p>
      </div>
      
      <!-- Download Card -->
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-12">
        <div class="flex items-center space-x-4">
          <img :src="IconGoodTwoManufacture" alt="Good2Manufacture" class="w-17 h-17 mr-1" />
          <span class="text-2xl font-bold mx-1">×</span>
          <LinuxIcon class="w-12 h-12" />
          <div class="flex-grow ml-3">
            <h3 class="text-xl font-semibold">
              {{ platform.label }}
            </h3>
            <p class="text-gray-600">{{ platform.filename }}</p>
          </div>
          <button
            @click="handleDownloadClick"
            class="bg-brand-dark text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition transition hover:opacity-90"
            >
            <DownloadIcon width="16" height="16" stroke-width="2.2" />
            <span>Download</span>
          </button>
        </div>
      </div>
      
      <!-- System Requirements -->
      <div class="max-w-2xl mx-auto my-8">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl text-brand-dark font-bold tracking-tight">
            System Requirements
          </h2>
        </div>
        
        <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <!-- Platforms & Items List (8 Cols) -->
            <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div 
                v-for="r in requirements" 
                :key="r.platform" 
                class="flex flex-col space-y-3"
                >
                <div class="flex items-center space-x-2 border-b border-gray-100 pb-2">
                  <h3 class="text-base font-bold text-brand-dark">
                    {{ r.platform }}
                  </h3>
                </div>
                
                <ul class="space-y-2.5">
                  <li 
                    v-for="item in r.items" 
                    :key="item" 
                    class="flex items-start text-sm text-gray-600 leading-snug"
                    >
                    <div class="flex-shrink-0 mt-0.5 mr-2.5 p-0.5 rounded-full bg-[var(--theme-color-white)] text-brand-dark border border-[var(--theme-color-lille)]">
                      <SmallCheckIcon width="14" height="14" stroke-width="2" class="text-brand-dark" />
                    </div>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Server Logo / Visual Anchor (4 Cols) -->
            <div class="md:col-span-4 flex items-center justify-center h-full min-h-[120px]">
              <img 
                :src="serverLogo" 
          alt="Server Logo" 
          class="w-full max-w-[160px] max-h-36 object-contain opacity-90" 
        />
      </div>
    </div>
  </div>
</div>
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">How to connect to Gates' server</h2>
        <div class="bg-white rounded-lg shadow p-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Need detailed setup instructions?</h3>
            <p class="text-gray-600 mt-1">Read our official installation guide to connect your agent to the server step-by-step.</p>
          </div>
          <a 
            :href="install_docs_url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="mt-4 sm:mt-0 inline-flex items-center justify-center bg-brand-dark px-5 py-2.5 rounded-lg transition hover:opacity-90 font-bold whitespace-nowrap"
          >
            View Documentation &rarr;
          </a>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<style scoped>
@reference "../main.css";

a {
    color: var(--theme-color-white) !important;
}

</style>
