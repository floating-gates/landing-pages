<script setup>
import advantages_yoy from "../data/images/dual_use.webp";
import { themeColor, themeColorOrange, themeColorWhite, app_login_url } from "../config.js";
import background from "../data/images/background_pic.webp";
import { CheckInCircle, BarChartIcon, ReceiptTaxIcon, ChevronDoubleRight } from "../helper/icons_generator.js";
</script>

<template>
  <div class="untree" id="hero" :style="{ backgroundImage: `url(${background})` }">
    <div class="smaller flex flex-col justify-center align-center min-h-screen gap-10">
      <div class="text-center" data-aos="fade-up">
        <h1 class="section-title">
          Avoid Silly Mistakes
          <span class="dot">•</span>
          Allow Customers drop-in
          <span class="dot">•</span>
          Be sure Suppliers follow Standards
        </h1>
        <p class="subtitle">
          Traditional design reviews miss roughly 20% of engineering flaws. These slips are deceptively expensive, leading to over-tolerancing, material waste, manufacturing rework, and field failures. The same problem, though more subtle and yet even more problematic, can be stated as the human failure to adhere to production standards in accordance with the "good & old" design guidelines.
        </p>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-12">
        <div class="w-full md:w-1/2" data-aos="fade-right" data-aos-delay="100">
          <ul class="advantage-list">
            <li class="advantage-item">
              <div class="item-icon">
                <CheckInCircle stroke-width="1.5" />
              </div>
              <div class="item-content">
                <h4 class="item-title">Highlights Production Issues</h4>
                <p class="item-description">
                  40% of drawings are saved into an un-manufacturable configuration, bringing with them countless hours of manual review.
                </p>
              </div>
            </li>

            <li class="advantage-item">
              <div class="item-icon">
                <BarChartIcon stroke-width="1.5" />
              </div>
              <div class="item-content">
                <h4 class="item-title">Shows Future Maintenance Hurdles</h4>
                <p class="item-description">
                  Space must be a necessity for operators to act on your device, be sure that maintenance is possible.
                </p>
              </div>
            </li>

            <li class="advantage-item">
              <div class="item-icon">
                <ReceiptTaxIcon stroke-width="1.5" />
              </div>
              <div class="item-content">
                <h4 class="item-title">Pricing Advices</h4>
                <p class="item-description">
                  Accurate pricing suggestions permit talking with customers willing to pay.
                </p>
              </div>
            </li>


            <li class="advantage-item advantage-item-cta" :style="{ backgroundColor: themeColor }">
              <a :href="app_login_url" class="cta-link">
                <span class="item-icon" :style="{ backgroundColor: themeColorWhite }">
                  <ChevronDoubleRight stroke-width="1.5" :stroke="themeColor" />
                </span>
                <h3 class="item-title" :style="{ fontSize: '1.25rem', color: themeColorWhite }">
                  All Stakeholders Adheres to your Design Rules.
                </h3>
              </a>
            </li>
          </ul>
        </div>

        <div class="w-full flex justify-center"
             data-aos="fade-left" data-aos-delay="150">
            <img
              :src="advantages_yoy"
              alt="Automation performance metrics"
              class="hero-img-fluid w-full"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.untree {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 0 1.5rem;
    box-sizing: border-box;
    overflow-x: hidden; /* safety net: prevents any child overflow from creating horiz scrollbar */
}

.smaller {
    width: 100%;
    max-width: 1700px;
    margin: 0 auto;
    box-sizing: border-box; /* ensures padding is included in width calculation */
    min-height: 100vh; /* fallback for browsers without dvh support */
}

/* 100vh on mobile browsers includes space behind the collapsing
   address bar, which makes content look vertically off-center /
   causes an awkward jump on scroll. dvh tracks the actual visible
   viewport instead. */
@supports (min-height: 100dvh) {
  .smaller {
    min-height: 100dvh;
  }
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: v-bind(themeColor);
  position: relative;
  display: block; /* changed from inline-block to allow natural wrapping */
  margin-bottom: 1rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  line-height: 1.3;
  word-spacing: 0.1em; /* gives dots subtle breathing room on wrapping */
}

.section-title .dot {
    color: v-bind(themeColorOrange);
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.subtitle {
  max-width: 900px;
  line-height: 1.6;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;
  box-sizing: border-box;
}

.space {
  margin-top: 3rem;
}

.advantage-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.advantage-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* The CTA card's whole surface should be tappable, not just the
   small icon circle — matters even more on touch screens than on
   desktop, where a mis-tap just means trying again with a mouse. */
.advantage-item-cta {
  padding: 0;
}

.cta-link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
}

.item-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: v-bind(themeColor);
  color: white;
  border-radius: 10px;
  margin-right: 1.25rem;
}

.item-icon svg {
  width: 24px;
  height: 24px;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: v-bind(themeColor);
  margin-bottom: 0.5rem;
}

.item-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
}

.login-container {
  padding-left: 5%;
  padding-right: 5%;
  max-width: 1536px;
}

.visual-wrapper {
  transition: all 0.3s ease;
}

.visual-wrapper:hover {
  transform: scale(1.02);
}

/* ══════════════════════════════════════════
   RESPONSIVE — TABLET (768px and down)
   ══════════════════════════════════════════ */
@media (max-width: 768px) {
  .untree {
    padding: 0 1.25rem;
  }

  .section-title {
    font-size: clamp(1.3rem, 5vw, 1.75rem);
  }

  .subtitle {
    max-width: 100%;
    font-size: 0.95rem;
    padding: 0;
  }

  .advantage-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 1rem;
  }

  .advantage-item-cta {
    padding: 0;
  }

  .cta-link {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .item-icon {
    margin-bottom: 1rem;
    margin-right: 0;
  }

  .item-content {
    width: 100%;
  }
}

/* ══════════════════════════════════════════
   RESPONSIVE — MOBILE (480px and down)
   ══════════════════════════════════════════ */
@media (max-width: 480px) {
  .untree {
    padding: 0 1rem;
  }

  .section-title {
    font-size: clamp(1.2rem, 6vw, 1.5rem);
  }

  .subtitle {
    font-size: 0.9rem;
    padding: 0;
  }

  .advantage-item,
  .advantage-item-cta {
    padding: 0.85rem;
    margin-bottom: 0.75rem;
  }

  .cta-link {
    padding: 0.85rem;
  }

  .item-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 0.75rem;
  }

  .item-icon svg {
    width: 20px;
    height: 20px;
  }

  .item-title {
    font-size: 1rem;
  }

  .item-description {
    font-size: 0.9rem;
  }
}
</style>
