<script setup>
import { ref } from "vue";
import background from "../data/images/background_pic.webp";
import screenshot from "../data/images/network.webp" 
import {
    WindowsIcon,
    LinuxIcon,
    DownloadIcon,
    SmallCheckIcon,
    ServerIcon,
    ClientIcon,
    CheckInCircle,
} from "../helper/icons_generator.js";
import {
    themeColor,
    themeColorOrange,
    install_docs_url,
    install_client_docs_url,
} from "../config.js";

import IconGoodTwoManufacture from "../data/images/Icon-good2manufacture.svg";
import IconGoodTwoManufactured from "../data/images/Icon-good2manufactured.svg";
import serverLogo from "../data/images/ServerLogo.svg";
import clientLogo from "../data/images/ClientLogo.svg";

import Header from "../components/Header.vue";
import { handleDownloadClick } from "../helper/download.js";

const serverRelease = {
    version: "1.0.0",
    date: "21 September 2026",
};

const clientRelease = {
    version: "1.1.0",
    date: "21 September 2026",
};

const serverPlatform = {
    id: "linux",
    label: "Linux - x64",
    filename: "good2manufacture.tar.gz",
    icon: LinuxIcon,
};

const clientPlatforms = [
    {
        id: "windows",
        label: "Windows - x64",
        filename: "good2manufactured.exe",
        icon: WindowsIcon,
    },
    {
        id: "linux",
        label: "Linux - x64",
        filename: "good2manufactured",
        icon: LinuxIcon,
    },
];

const selectedClientPlatform = ref(clientPlatforms[0]);

const requirements = [
    {
        platform: "Server",
        items: ["Linux kernel ≥ 6.3", "Podman version ≥ 5.9", "8 GB RAM minimum"],
    },
    {
        platform: "Client",
        items: ["Windows 10/11 or Fedora 44+", "4 GB RAM minimum", "Reachable Server instance"],
    },
];
</script>

<template>
<div class="flex flex-col min-h-screen">
  <Header />
  <div
    class="below-header flex-grow flex flex-col items-center bg-cover bg-center px-4 pb-12 min-h-screen"
    :style="{ backgroundImage: `url(${background})` }"
    >
    <div class="w-full max-w-6xl">
      <div class="flex flex-row items-center">
        <div class="flex flex-col items-center mr-4">
          <h1 class="heading">
            Good<em>2Manufacture</em>
          </h1>
          <p class="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            An network software that serves as a standalone quality control system for mechanical design documents. It functions as a digital error-checking system, operating 24/7, to ensure internal compliance with Design for Manufacturing (DFM) standards enforceable on all stakeholders.
          </p>

          <p class="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            
            It ensures every design adheres strictly to your specific manufacturing standards, eliminating costly material waste, production rework, and field failures before they ever hit the factory floor.
          </p>
          <p class="pair-note">
            A Server without Clients cannot see factory files. A Client without a Server cannot evaluate them.
          </p>
        </div>
        
        <div class="items-center">
          <div class="p-7" data-aos="fade-up" data-aos-delay="80">
            <img :src="screenshot">
          </div>
        </div>
      </div>
      
      <div class="download-grid mb-14">
        <section id="server" class="download-card">
          <div class="download-kicker">
            <ServerIcon width="18" height="18" />
            <span class="my-2">Required</span>
          </div>
          <div class="download-title">
            <img :src="IconGoodTwoManufacture" alt="" class="w-14 h-14" />
            <div>
              <h2>Good2Manufacture <span class="accent">Server</span></h2>
              <p>Linux host behind your firewall. Enterprise stack only.</p>
            </div>
          </div>
          <p class="version-line">
            Version: {{ serverRelease.version }} | Released: {{ serverRelease.date }}
          </p>
          
          <div class="download-row">
            <div class="flex items-center space-x-2 flex-shrink-0">
              <LinuxIcon class="w-10 h-10" />
            </div>
            <div class="flex-grow min-w-0">
              <h3 class="text-xl font-semibold truncate">{{ serverPlatform.label }}</h3>
              <p class="text-gray-600 truncate">{{ serverPlatform.filename }}</p>
            </div>
            <button
              @click="handleDownloadClick()"
              class="btn-primary-cta w-full sm:w-auto flex-shrink-0 justify-center"
              >
              <DownloadIcon width="16" height="16" stroke-width="2.2" />
              <span>Download</span>
            </button>
          </div>
        </section>
        
        <div class="download-plus" aria-hidden="true">+</div>
        
        <section id="client" class="download-card">
          <div class="download-kicker">
            <ClientIcon width="18" height="18" />
            <span class="my-2">Required</span>
          </div>
          <div class="download-title">
            <img :src="IconGoodTwoManufactured" alt="" class="w-14 h-14" />
            <div>
              <h2>Good2Manufactured <span class="accent">Client</span></h2>
              <p>Daemon on every design and shop-floor PC.</p>
            </div>
          </div>
          <p class="version-line">
            Version: {{ clientRelease.version }} | Released: {{ clientRelease.date }}
          </p>
          
          <div class="flex border-b border-gray-200 mb-5 overflow-x-auto">
            <button
              v-for="item in clientPlatforms"
              :key="item.id"
              @click="selectedClientPlatform = item"
              :class="[
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap',
                      selectedClientPlatform.id === item.id
                      ? 'border-[var(--theme-color-orange,#f97316)] text-gray-900 font-semibold'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      ]"
              >
              <span>{{ item.label }}</span>
            </button>
          </div>
          
          <div class="download-row">
            <div class="flex items-center space-x-2 flex-shrink-0">
              <component :is="selectedClientPlatform.icon" class="w-10 h-10" />
            </div>
            <div class="flex-grow min-w-0">
              <h3 class="text-xl font-semibold truncate">{{ selectedClientPlatform.label }}</h3>
              <p class="text-gray-600 truncate">{{ selectedClientPlatform.filename }}</p>
            </div>
            <button
              @click="handleDownloadClick(selectedClientPlatform)"
              class="btn-primary-cta w-full sm:w-auto flex-shrink-0 justify-center"
              >
              <DownloadIcon width="16" height="16" stroke-width="2.2" />
              <span>Download</span>
            </button>
          </div>
        </section>
      </div>
      
      <div class="w-full max-w-6xl my-8">
        <div class="mb-6">
          <h2 class="text-2xl text-brand-dark font-bold tracking-tight">
            System Requirements
          </h2>
        </div>
        
        <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md
                    transition-shadow duration-300 p-6 md:p-8">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
            <div class="md:col-span-4 flex items-center justify-center gap-4 h-full min-h-[120px]">
              <img :src="serverLogo" alt="Server" class="w-full max-w-[120px] max-h-28 object-contain opacity-90" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="w-full max-w-6xl my-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">How to stand up the network</h2>
        <div class="docs-grid">
          <div class="docs-card">
            <div class="docs-copy">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Install the Server</h3>
                <p class="text-gray-600 mt-1">Stand up the enterprise stack, then connect Client daemons to it.</p>
              </div>
            </div>
            <a
              :href="install_docs_url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary-cta"
              >
              Server Docs
            </a>
          </div>
          <div class="docs-card">
            <div class="docs-copy">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Install the Client</h3>
                <p class="text-gray-600 mt-1">Put the agent on every endpoint that holds CAD or GD&amp;T.</p>
              </div>
            </div>
            <a
              :href="install_client_docs_url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary-cta"
              >
              Client Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@reference "../main.css";

.pair-note {
    margin: 1rem auto 0;
    max-width: 42rem;
    color: #4b5563;
    font-weight: 600;
}

.download-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}

.download-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 28px rgba(34, 56, 67, 0.08);
    padding: 2rem ;
    scroll-margin-top: calc(var(--header-stack) + 1rem);
}

.download-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 0.9rem;
    color: v-bind(themeColor);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.download-title {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 0.4rem;
}

.download-title h2 {
    font-size: 1.35rem;
    font-weight: 700;
    color: v-bind(themeColor);
    line-height: 1.2;
}

.download-title p,
.version-line {
    color: #6b7280;
}

.accent {
    color: v-bind(themeColorOrange);
}

.version-line {
    font-size: 0.875rem;
    margin-bottom: 1.1rem;
}

.download-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}

.docs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.docs-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(34, 56, 67, 0.05);
    padding: 1.35rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.docs-copy {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: v-bind(themeColor);
}

a.btn-primary-cta {
    color: var(--theme-color-white) !important;
}

@media (min-width: 640px) {
    .download-row {
        flex-direction: row;
        align-items: center;
    }
}

.download-plus {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    color: v-bind(themeColorOrange);
}

@media (min-width: 900px) {
    .download-grid {
        grid-template-columns: 1fr auto 1fr;
        align-items: stretch;
    }
    
    .docs-grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .docs-card {
        flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
