<script setup>
import advantages_yoy from "../data/images/advantages_yoy.webp";
import { themeColor, themeColorOrange, themeColorWhite, app_login_url } from "../config.js";
import background from "../data/images/background_pic.webp";
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div class="item-content">
                <h4 class="item-title">Highlights Production Issues before Manufacturing starts</h4>
                <p class="item-description">
                  40% of drawings are saved into an un-manufacturable configuration, bringing with them countless hours of manual review.
                </p>
              </div>
            </li>

            <li class="advantage-item">
              <div class="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
                </svg>
              </div>
              <div class="item-content">
                <h4 class="item-title">Pricing Advices</h4>
                <p class="item-description">
                  Accurate pricing suggestions permit talking with customers willing to pay.
                </p>
              </div>
            </li>


            <li class="advantage-item" :style="{ backgroundColor: themeColor }">
              <a :href="app_login_url"
                 class="item-icon"
                 :style="{ backgroundColor: themeColorWhite }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
              </a>
              <h3 class="item-title" :style="{ fontSize: '1.25rem', color: themeColorWhite }">
                All Stakeholders Adheres to your Design Rules.
              </h3>
            </li>
          </ul>
        </div>

        <div class="w-full md:w-1/2 flex justify-center rounded-xl"
             data-aos="fade-left" data-aos-delay="150">
            <img
              :src="advantages_yoy"
              alt="Automation performance metrics"
              class="w-full h-auto rounded-xl"
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
}

.smaller {
    width: 100%;       /* Added */
    max-width: 1700px;
    margin: 0 auto;    /* Added - Centers the container bounds horizontally */
}

.section-title {
  font-size: 2rem;
  font-weight: 650;
  color: v-bind(themeColor);
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.section-title .dot {
    color: v-bind(themeColorOrange);
    shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.subtitle {
  max-width: 900px;
  line-height: 1.6;
  margin: 0 auto;
  text-align: center;
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
  /* v-bind(themeColorWhite); */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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

/* Mobile Responsive */
@media (max-width: 767.98px) {
  .section-title {
    font-size: 1.75rem;
  }

  .section-subtitle {
    max-width: 90%;
    margin-bottom: 2rem;
  }
    
  .advantage-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 1rem;
  }

  .item-icon {
    margin-bottom: 1rem;
    margin-right: 0;
  }

  .item-content {
    width: 100%;
  }

  /* Image below advantages */
  .row.align-items-center {
    flex-direction: column;
  }

  .col-lg-4, .col-lg-8 {
    max-width: 100%;
    flex: 0 0 100%;
  }

  .col-lg-8 {
    margin-top: 1.5rem;
  }
}
</style>
