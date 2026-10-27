<script setup>
import Header from "./Header.vue";
import background from "../data/images/background_pic.webp";
import screenshot from "../data/images/screenshot.png";
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

const stakeholders = [
  {
    title: "External Suppliers",
    desc: "Send CAD and GD&T through the same factory channel, so incoming designs are checked against your manufacturing rules before they enter review.",
    // icon: FactoryIcon,
  },
  {
    title: "Customers",
    desc: "Drop design files into a public portal and see immediately whether the part can be produced, instead of waiting for a manual feasibility pass.",
    // icon: HucksterIcon,
  },
  {
    title: "Internal Employees",
    desc: "Use one standardized intake for internal projects, keeping shop-floor, engineering, and sales files on the same manufacturability path.",
    // icon: ClientIcon,
  },
];


const outcomes = [
  "One public-facing channel for suppliers, customers, and employees",
  "CAD and GD&T submissions checked for manufacturing feasibility",
  "Instant insight on whether a design can actually be produced",
  "Unmanufacturable files are stopped before they enter the pipeline",
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
        <div class="text-center mb-12" data-aos="fade-up">
          <h1 class="heading">
            Huckster <em>Interface</em>
          </h1>
          <p class="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            The Huckster Interface is a public-facing web portal that gives
            stakeholders ( external suppliers, customers, and internal employees )
            a channel for submitting design files. Once CAD and GD&amp;T documentation is uploaded,
            it can be checked for manufacturing feasibility, providing instant insight on whether the
            design can actually be produced before it moves further down the pipeline.
          </p>
          <div class="cta-row">
            <a class="btn-primary-cta" :href="demo_url">
              Check out a Demo
              <ChevronDoubleRight stroke-width="2.5" />
            </a>
            <a class="btn-ghost-cta font-bold" :href="app_login_url">
              Start for Free
              <ChevronDoubleRight stroke-width="2.5" :stroke="themeColor" width="13" height="13" />
            </a>
          </div>
        </div>

        <div class="screenshot-wrap mb-16" data-aos="fade-up" data-aos-delay="80">
          <img
            :src="screenshot"
            alt="Huckster Interface portal showing a CAD upload and manufacturability check"
            class="screenshot"
          />
        </div>

        <div class="mb-16" data-aos="fade-up" data-aos-delay="100">
          <h2 class="section-heading">One channel for every stakeholder</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article
              v-for="item in stakeholders"
              :key="item.title"
              class="info-card"
            >
              <!-- <div class="item-icon"> -->
              <!--   <component :is="item.icon" width="20" height="20" /> -->
              <!-- </div> -->
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">{{ item.desc }}</p>
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
              Instant insight before production
            </h2>
            <p class="card-desc mb-5">
              Uploaded CAD and GD&amp;T files are checked for manufacturing
              feasibility, so stakeholders know whether a design can actually be
              produced before it is discussed, quoted, or released downstream.
            </p>
            <ul class="outcome-list">
              <li v-for="item in outcomes" :key="item">
                <span class="check">
                  <SmallCheckIcon width="12" height="12" stroke-width="2.2" />
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>
            <a class="btn-primary-cta mt-6" :href="demo_url">
              Try the Huckster Interface
              <ChevronDoubleRight stroke-width="2.5" />
            </a>
          </div>
          <div class="outcome-visual">
            <div class="visual-chip">
              <FactoryIcon width="22" height="22" />
              <span>Enforcable Standard (CAD + GD&amp;T)</span>
            </div>
            <div class="visual-chip">
              <CheckInCircle width="22" height="22" />
              <span>Discrepancies on GD&amp;T</span>
            </div>
            <div class="visual-chip">
              <FileIcon width="22" height="22" />
              <span>Feasability Check for CAD files</span>
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

.screenshot-wrap {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(34, 56, 67, 0.08);
  border-radius: 20px;
  padding: 12px;
  box-shadow: 0 18px 40px rgba(34, 56, 67, 0.08);
}

.screenshot {
  display: block;
  width: 100%;
  border-radius: 14px;
  object-fit: cover;
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

.item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #f1f5f9;
  color: v-bind(themeColor);
  margin-bottom: 0.9rem;
}

.step-num {
  display: inline-block;
  color: v-bind(themeColorOrange);
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 0.65rem;
}

.card-title {
  color: v-bind(themeColor);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
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
