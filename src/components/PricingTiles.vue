<script setup>
import { themeColor, themeColorOrange, themeColorWhite,
         display_price_list, app_login_url, contactInfo } from "../config.js";
import { ref, computed } from 'vue'; // Import ref and computed
import background from "../data/images/background_pic.webp";
import Header from '../components/Header.vue'
import Refund from '../components/Refund.vue'

const heading = "Plans and Pricing";
const subHeading = "Pricing refer to the hosting services for the online Model-Based Defintion (MBD) platform and its Factory. You always get to choose the final price to charge your customers to manufacture their devices. We only smooth the process.";

// Active currency state
const currentCurrency = ref('EUR');
const currencies = ['EUR', 'USD'];

const currencySymbols = {
  EUR: '€',
  USD: '$',
};

// Static exchange rates
const exchangeRates = {
  EUR: 1,
  USD: 1.1, 
};

const formatPrice = (basePrice, planIndex) => {
  if (!isNaN(basePrice) && basePrice !== "") {
    const converted = (Number(basePrice) * exchangeRates[currentCurrency.value]).toFixed(0);
    return `${currencySymbols[currentCurrency.value]}${converted}`;
  }
  
  if (typeof basePrice === 'string' && basePrice.toLowerCase().includes('free')) {
    return basePrice; 
  }

  return String(basePrice).replace('€', currencySymbols[currentCurrency.value]);
};

// Create a unified list for the loop
const pricingPlans = computed(() => [
    {
        name: display_price_list[0].name,
        where: "Cloud Service",
        price: formatPrice(display_price_list[0].price, 0),
        suffix: "",
        features: [
            "Online Model-Based Defintion platform",
            "Software-Defined Factory",
            "Max 50MB of Project Storage",
            "Non private 3D models"  ],
        buttonText: "Get Started",
        buttonUrl: app_login_url,
    },
    {
        name: display_price_list[1].name,
        price: formatPrice(display_price_list[1].price, 1),
        where: "Cloud Service",
        suffix: "/Month - incl. VAT",
        features: ["Custom platform URL",
                   "Conversation on Project",
                   "Parametric CAD of your best product",
                   "Private Projects"],
        buttonText: "Get Started",
        buttonUrl: app_login_url,
    },
    {
        name: display_price_list[2].name,
        price: formatPrice(display_price_list[2].price, 2),
        where: "Cloud Service",
        suffix: "",
        features: ["All 'Basic' features",
                   "Manufacturing Feasability Agent",
                   "Automated Quotations",
                   "Presence in Manufacturing World Map"],
        buttonText: "Get Started",
        buttonUrl: app_login_url,
    },
    {
        name: display_price_list[3].name,
        price: formatPrice(display_price_list[3].price, 3),
        where: "Deploy in Factory",
        suffix: "",
        features: [
            "All 'Basic' features",
            "Local Installation",
            "One time purchase",
            "Unlimited Numbers of PC covered",
            "Factory-Wide Manufacturing Agent",
        ],
        buttonText: "Speak to Us",
        buttonUrl: "mailto:" + contactInfo.email,
    }
]);
</script>


<template>
<!-- Added pb-24 here to create the spacing at the bottom before the footer appears -->
<div class="untree" :style="{ backgroundImage: `url(${background})` }">  
  <!-- Centered container with mx-auto -->
  <div class="flex flex-col w-full p-12 items-center justify-center min-h-screen gap-12">

    <!-- Header Section with Centered Text and Right-Aligned Toggle -->
    <div class="flex flex-col md:flex-row items-center justify-between relative gap-6">
      <!-- Invisible spacer to keep the center block perfectly balanced on desktop -->
      <div class="hidden md:block w-32"></div>

      <!-- Centered Header -->
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="heading">{{ heading }}</h2>
        <p class="text-gray-500 text-lg leading-relaxed">{{ subHeading }}</p>
      </div>
      
      <!-- Currency Toggle Block (Right Aligned) -->
      <div class="ml-15 flex shrink-0">
        <div class="bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200">
          <button 
            v-for="currency in currencies" 
            :key="currency"
            @click="currentCurrency = currency"
            class="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none"
            :class="currentCurrency === currency 
              ? 'bg-white shadow-sm text-gray-900 font-bold' 
              : 'text-gray-500 hover:text-gray-900'"
            :style="currentCurrency === currency ? { color: themeColor } : {}"
          >
            {{ currency }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Pricing Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-center">
      <div 
        v-for="(plan, index) in pricingPlans" 
        :key="plan.name"
        class="pricing-card group transition-all duration-300 ease-in-out transform hover:scale-[1.03] rounded-2xl shadow-[0_12px_25px_rgba(0,0,0,0.35)] overflow-hidden"
        data-aos="fade-up"
        :data-aos-delay="50 * (index + 1)"
        >
        <div class="h-full p-6 flex flex-col justify-between py-6"
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
            
            <ul class="items-center mb-4 mx-2">
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
            <a :href="plan.buttonUrl"
               class="btn block text-center transition-all duration-300 transform
                      hover:-translate-y-0.5 hover:shadow-lg" >
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
    font-size: 0.7rem;
}

.subtitle {
    margin-bottom: 4rem;
}

.ul-check.primary li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 500;
    color: v-bind(themeColor)
}

ul li::before {
    color: v-bind(themeColorOrange);
}

.pricing {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 5rem;
}

.pricing-card {
    border-radius: 2rem;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.8rem;
    font-weight: 600;
    color: v-bind(themeColor);
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    margin-top: 0.7rem;
    text-align: center;
}

.body {
    background: linear-gradient(
        145deg, 
        v-bind(themeColorWhite) 0%, 
        #e3e3e340 100%
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
