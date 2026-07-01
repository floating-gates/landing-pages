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
    }
]);
</script>


<template>
<div class="untree my-10"  :style="{ backgroundImage: `url(${background})` }">  
  <div class="container m-auto p-4">
    <div class="flex flex-col items-center justify-center text-center my-16">
      <div class="w-full lg:w-8/12">
        <h2 class="heading">{{ heading }}</h2>
        <p class="text-gray-500 text-lg leading-relaxed">{{ subHeading }}</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
      <div 
        v-for="(plan, index) in pricingPlans" 
        :key="plan.name"
        class="pricing-card group transition-all duration-300 ease-in-out transform hover:scale-[1.03] rounded-2xl shadow-[0_12px_25px_rgba(0,0,0,0.35)] overflow-hidden"
        data-aos="fade-up"
        :data-aos-delay="50 * (index + 1)"
        >
        <div 
          class="h-full p-6 flex flex-col justify-between"
          :style="{ background: `linear-gradient(145deg, ${themeColorWhite} 0%, #e3e3e340 100%)` }"
          >
          <div>
            <span 
              class="flex justify-center items-center text-[2.8rem] font-semibold text-center mt-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              :style="{ color: themeColor }"
              >
              {{ plan.name }}
            </span>
            
            <div 
              class="text-center text-base font-normal uppercase tracking-tighter mb-2"
              :style="{ color: themeColorOrange }"
              >
              {{ plan.where }}
            </div>
            
            <div 
              class="text-[1.8rem] my-4 font-medium text-center"
              :style="{ color: themeColor }"
              >
              <span>
                {{ plan.price }}
                <sup v-if="plan.suffix" class="text-[0.7rem] align-super ml-0.5">{{ plan.suffix }}</sup>
              </span>
            </div>
            
            <ul class="items-center mb-4">
              <li 
                v-for="feature in plan.features" 
                :key="feature"
                class="relative py-2 text-center before:content-['✓\a0\a0']"
                :style="`color: ${themeColor}; --tw-before-color: ${themeColorOrange};`"
                >
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="m-auto">
            <a
              :href="plan.buttonUrl"
              class="btn block text-center transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg" >
              {{ plan.buttonText }}
            </a>
          </div>
          
        </div>
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

ul li::before {
    color: v-bind(themeColorOrange);
}

.pricing {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 5rem; /* keep it smooth */
}

.pricing-card {
    border-radius: 2rem; /* keep it smooth */
    
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
