<script setup>
import Header from "./Header.vue";
import background from "../data/images/background_pic.webp";
import screenshot from "../data/images/mistral_output.png";

// Import model logos
import IconMCP from "../data/images/Icon-MCP.svg";
import claudeLogo  from "../data/images/claude.webp";
import mistralLogo from "../data/images/mistral.webp";
import openaiLogo  from "../data/images/openai.webp";

import {
    themeColor,
    themeColorOrange,
    demo_url,
    app_login_url,
} from "../config.js";
import {
    FileIcon,
    CheckInCircle,
    FactoryIcon,
    ClientIcon,
    ChevronDoubleRight,
    SmallCheckIcon,
    HucksterIcon
} from "../helper/icons_generator.js";

const llms = [
    {
        name: "Claude",
        logo: claudeLogo,
    },
    {
        name: "Mistral",
        logo: mistralLogo,
    },
    {
        name: "OpenAI",
        logo: openaiLogo,
    },
];

const outcomes = [
    "Standardized protocol connecting LLMs to local resources and APIs",
    "Secure credential handling and fine-grained tool execution permissions",
    "Real-time dynamic context updates and bi-directional communication",
    "Eliminates custom glue code across different AI models and platforms",
];
</script>

<template>
<div class="flex flex-col min-h-screen">
  <Header />
  <div
    class="below-header flex-grow flex flex-col items-center bg-cover bg-center px-4 pb-12 min-h-screen"
    :style="{ backgroundImage: `url(${background})` }"  >
    <div class="w-full max-w-6xl">
      <div class="text-center mb-12" data-aos="fade-up">
        <!-- Centered flex container with gap spacing -->
        <div class="mt-4 flex flex-row items-center justify-center gap-3">
          <img :src="IconMCP" class="mr-3" width="42" height="42" alt="MCP server" />
          <h1 class="heading">
            MCP <em>Server</em>
          </h1>
        </div>
        <p class="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
          The MCP Server provides a unified Model Context Protocol interface that securely connects 
          AI models to your databases, APIs, and local developer tools. By standardizing resource discovery 
          and tool execution, your AI assistants gain safe, real-time access to the exact data and action 
          capabilities they need to perform complex workflows.
        </p>
        <div class="cta-row">
          <a class="btn-ghost-cta font-bold" :href="app_login_url">
            Start for Free
            <ChevronDoubleRight stroke-width="2.5" :stroke="themeColor" width="13" height="13" />
          </a>
        </div>
      </div>
      
      <div class="screenshot-wrap mb-16" data-aos="fade-up" data-aos-delay="80">
        <img
          :src="screenshot"
          alt="MCP Server portal displaying tool registrations and active context streams"
          />
      </div>
      
      <div class="mb-16" data-aos="fade-up" data-aos-delay="100">
        <h2 class="section-heading">Compatible with all major AI Labs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article
            v-for="item in llms"
            :key="item.name"
            class="info-card flex items-center justify-center p-6"
            >
            <img :src="item.logo" :alt="item.name" class="object-contain" />
          </article>
        </div>
      </div>
      
      <div
        class="outcome-card mb-8"
        data-aos="fade-up"
        data-aos-delay="140"
        >
        <div class="outcome-copy">
          <h2 class="section-heading section-heading--left">
            Instant context before execution
          </h2>
          <p class="card-desc mb-5">
            Tool schemas and resource capabilities are validated live during interaction, 
            ensuring your AI agents act safely and accurately before executing commands 
            or querying production data.
          </p>
          <ul class="outcome-list">
            <li v-for="item in outcomes" :key="item">
              <span class="check">
                <SmallCheckIcon width="12" height="12" stroke-width="2.2" />
              </span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="outcome-visual">
          <div class="visual-chip">
            <FactoryIcon width="22" height="22" />
            <span>Standardized Protocol (MCP Specs)</span>
          </div>
          <div class="visual-chip">
            <CheckInCircle width="22" height="22" />
            <span>Real-time Tool Validation</span>
          </div>
          <div class="visual-chip">
            <FileIcon width="22" height="22" />
            <span>Secure Resource & API Connectors</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@reference "../main.css";

.cta-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 1.75rem;
}

.btn-ghost-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.75rem 1.4rem;
    background: transparent;
    color: v-bind(themeColor);
    border: 2px solid v-bind(themeColor);
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s;
}

.btn-ghost-cta:hover {
    background: rgba(0, 0, 0, 0.04);
}

.section-heading {
    color: v-bind(themeColor);
    font-size: clamp(1.4rem, 2vw, 2rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 1.25rem;
    text-align: center;
}

.section-heading--left {
    text-align: left;
}

.info-card {
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(4px);
    border-radius: 16px;
    padding: 1.4rem 1.35rem;
    box-shadow: 0 8px 24px rgba(34, 56, 67, 0.05);
    border: 1px solid rgba(34, 56, 67, 0.06);
}

.card-desc {
    color: #4b5563;
    line-height: 1.6;
    font-size: 0.95rem;
}

.outcome-card {
    display: grid;
    grid-template-columns: 1.4fr 0.8fr;
    gap: 2rem;
    align-items: center;
    background: rgba(255, 255, 255, 0.86);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 12px 32px rgba(34, 56, 67, 0.06);
}

.outcome-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0;
    margin: 0;
    list-style: none;
}

.outcome-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    color: #374151;
    line-height: 1.5;
}

.check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: var(--theme-color-white);
    border: 1px solid var(--theme-color-lille);
    color: v-bind(themeColor);
    flex-shrink: 0;
    margin-top: 2px;
}

.outcome-visual {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
}

.visual-chip {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1rem;
    border-radius: 14px;
    background: #f8fafc;
    color: v-bind(themeColor);
    font-weight: 600;
    border: 1px solid rgba(34, 56, 67, 0.06);
}

@media (max-width: 768px) {
    .outcome-card {
        grid-template-columns: 1fr;
    padding: 1.4rem;
  }

  .section-heading {
    text-align: left;
  }
}
</style>
