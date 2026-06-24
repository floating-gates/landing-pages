<script setup>
import { themeColor, themeColorOrange, themeColorWhite,
         display_price_list, app_login_url, contactInfo } from "../config.js";
import { computed } from 'vue'; // Import computed
import background from "../data/images/background_pic.webp";
import Header from '../components/Header.vue'
import Refund from '../components/Refund.vue'

const heading = "Plans and Pricing";
const subHeading = "Pricing refer to the hosting services for the online Model-Based Defintion (MBD) platform and its Factory. You always get to choose the final price to charge your customers to manufacture their devices. We only smooth the process.";

// Create a unified list for the loop
const pricingPlans = computed(() => [
    {
        name: display_price_list[0].name,
        where: "Cloud Service",
        price: display_price_list[0].price,
        suffix: "",
        features: [
            "Online Model-Based Defintion platform",
            "Software-Defined Factory",
            // "Brand Customization",
            "Max 50MB of Project Storage",
            "Non private 3D models"  ],
        buttonText: "Get Started",
        buttonUrl: app_login_url,
        isSecondary: false
    },
    {
        name: display_price_list[1].name,
        price: display_price_list[1].price,
        where: "Cloud Service",
        suffix: "€/Month - incl. VAT",
        features: ["Custom platform URL",
                   "Conversation on Project",
                   "Parametric CAD of your best product",
                   "Private Projects"],
        buttonText: "Get Started",
        buttonUrl: app_login_url,
        isSecondary: false
    },
    {
        name: display_price_list[2].name,
        price: display_price_list[2].price,
        where: "Cloud Service",
        suffix: "",
        features: ["All 'Basic' features",
                   "Manufacturing Feasability Agent",
                   // "Manufacturing Simulations",
                   "Automated Quotations",
                   "Presence in Manufacturing World Map"],
        buttonText: "Get Started",
        buttonUrl: app_login_url,
        isSecondary: true // For the white background button
    },
    {
        name: display_price_list[3].name,
        price: display_price_list[3].price,
        where: "Deploy in Factory",
        suffix: "",
        features: [
            "All 'Basic' features",
            "Local Installation",
            "One time purchase",
            "Unlimited Numbers of PC covered",
            "Factory-Wide Manufacturing Agent",
            // "Syntetization of Manufacturing Knowledge"
            
        ],
        buttonText: "Speak to Us",
        buttonUrl: "mailto:" + contactInfo.email,
        isSecondary: false
    }
]);
</script>

<template>
<Header :context="'landing-page'" />
<div class="untree_co-hero py-lg-8" id="pricing-section" :style="{ backgroundImage: `url(${background})` }">
  <div class="container wider-container">
    <div class="row align-items-center justify-content-center">
      <div class="col-lg-8 text-center">
        <h2 class="heading">{{ heading }}</h2>
        <p class="text-muted subtitle">{{ subHeading }}</p>
      </div>
    </div>
    
    <div class="row justify-content-center g-4">
      <div 
        v-for="(plan, index) in pricingPlans" 
        :key="plan.name"
        class="col-md-6 col-lg-3"
        data-aos="fade-up"
        :data-aos-delay="50 * (index + 1)"
        >
        <div class="pricing">
          <div class="body">
            <span class="title">{{ plan.name }}</span>
            <div class="location-tag">{{ plan.where }}</div>
            
            <div class="price">
              <span>
                {{ plan.price }}
                <sup v-if="plan.suffix">{{ plan.suffix }}</sup>
              </span>
            </div>
            
            <ul class="list-unstyled ul-check primary mb-5">
              <li v-for="feature in plan.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
            
            <p class="text-center mb-0">
              <a
                :href="plan.buttonUrl"
                class="btn"
                :style="plan.isSecondary ? [
                        { backgroundColor: themeColorWhite },
                        { borderColor: themeColorWhite },
                        { color: themeColor }
                        ] : [
                        { backgroundColor: themeColor },
                        { borderColor: themeColor },
                        { color: themeColorWhite }
                        ]"
                >
                {{ plan.buttonText }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<Refund />
</template>

<style scoped>

.btn {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-bottom: 0.7rem;
}

.btn:hover {    
    transform: scale(1.05);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    z-index: 2;
}

/* Added styling for the location-tag */
.location-tag {
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: -0.05rem;
    margin-bottom: 0.5rem;
    color: v-bind(themeColorOrange);
}

.price {
    font-size: 1.8rem;
    margin: 1rem 0 0.9rem 0;
    font-weight: 500;
    text-align: center;
    color: v-bind(themeColor);
}

.price sup {
    font-size: 0.7rem; /* smaller superscript for €/Month */
}

.subtitle {
    margin-bottom: 4rem;
}


.ul-check.primary li {
    position: relative;
    padding-left: 1.5rem; /* space for tick */
    margin-bottom: 0.75rem;
    font-weight: 500;
    color: v-bind(themeColor)
}

.ul-check.primary li::before {
    content: "✓"; /* tick symbol */
    position: absolute;
    left: 0;
    top: 0;
    color: v-bind(themeColorOrange);
    font-weight: 700;
    font-size: 1.2rem;
}

.pricing {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 1rem; /* keep it smooth */
}

.title {
    display: flex;
    justify-content: center; /* horizontally center content */
    align-items: center;     /* vertically center if multiple lines */
    font-size: 2.8rem;
    font-weight: 600;
    color: v-bind(themeColor);
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    margin-top: 0.7rem;
    text-align: center;      /* ensures multi-line text stays centered */
}

.body {
    background: linear-gradient(
        145deg, 
        v-bind(themeColorWhite) 0%, 
        #e3e3e340 100% /* Slightly darker shade of your theme color */
    );
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.35);
}

.pricing:hover {
    transform: scale(1.03);
}

.center {
    text-align: center;
}
</style>

