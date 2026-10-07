<script setup>
import { ref } from "vue";
import { themeColor, themeColorOrange, themeColorLille, contactInfo } from "../config.js";
import Header from "../components/Header.vue";
import simulation_service_img from "../data/images/simulation_service.jpg";
import stochastic_img from "../data/images/stochastic_img.webp";
import param_design from "../data/images/parametric-design-service.webp";
import background from "../data/images/background_pic.webp";
import dual_use_img from "../data/images/dual_use.webp";
import cluster_img from "../data/images/cluster.webp"
const phone = contactInfo["phone"].replace(/[\s+]/g, "");
const message = "Hi! I'm interested in one of your enterprise services";
const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const services = [
{
    name: "Good2Manufacture Deployment",
    description: "We deploy the Good2Manufacture Server software stack and client daemons locally across your shop floor and enterprise network. Operating securely behind your firewall, the system autonomously scans your factory network, CAD libraries, and GD&T documentation for design flaws, missing draft angles, and tolerance conflicts. This ensures 100% data sovereignty and strict adherence to your centralized DfM playbook before production begins.",
    image: dual_use_img, // Update variable reference as needed
    advantages: [
      "Guarantees 100% intellectual property privacy through automated, behind-the-firewall local analysis.",
      "Prevents costly manufacturing errors and rework by catching CAD/GD&T issues before hitting machines.",
      "Standardizes design conventions across all internal endpoints, suppliers, and incoming customer files."
    ],
    outcome: [
      "A fully integrated, factory-wide Model-Based Definition (MBD) agent that continuously monitors endpoints, highlights risk areas, and greenlights manufacturable parts in real time."
    ]
},
    {
    name: "Economic Cluster Install",
    description: "We procure, configure, and install an affordable compute mini-cluster tailored to your factory's exact computational demands. Designed to host heavy engineering workloads-such as Good2Manufacture automated checks, CAD processing, and local AI inferencing - without cloud subscription overhead, our team handles physical assembly, network isolation, and stack optimization directly inside your facility.",
    image: cluster_img, // Update variable reference as needed
    advantages: [
      "Cost-effective high-performance computing without recurring, unpredictable cloud service bills.",
      "Turnkey installation featuring isolated local networking, power backup, and hardware optimization.",
      "Scalable architecture that grows seamlessly with your factory's computational and data processing needs."
    ],
    outcome: [
      "A plug-and-play, enterprise-grade mini-cluster operating locally on your shop floor to power air-gapped simulations and engineering automation."
    ]
  }
    
    // {
  //   name: "Parametric CAD development",
  //   description: "We develop for you the model necessary to parametrize a given device. By embedding key design parameters directly into your models, we enable rapid iteration guided by measurable physical objectives. Those parametric CAD models allows to your customer to explore design variations of your catalog to converge toward a lead faster than ever before.",
  //   image: param_design,
  //   advantages: [
  //     "Instantly update and optimize designs through parameter adjustments.",
  //     "Reduce manual design work and human error.",
  //     "Enable objective-driven design exploration."
  //   ],
  //   outcome: [
  //     "A parametric CAD model generation system that programmatically generates and modifies CAD models, allowing seamless and fast design iterations."
  //   ]
  // },
  // {
  //   name: "AI Driven CAD Generation",
  //   description: "Traditional parametric workflows require the final users to manually change variables to update the device they intend to purchase/query info. Our AI Design Engine abstracts this complexity, replacing manual parameters editing with a Natural Language Interface that bridges the gap for non expert customers.",
  //   image: stochastic_img,
  //   advantages: [
  //     "Eliminate the 'Technical Tax' by allowing users to define design goals through natural language instead of manual coordinate entry.",
  //     "Accelerate the design-to-order cycle by automating the mapping of user requirements to precise parameters."
  //   ],
  //   outcome: [
  //     "A seamless, intent-driven configuration experience that transforms descriptive text into 3D-ready geometry instantly."
  //   ]
  // }
];

const selectedIndex = ref(0);
const selectService = (index) => {
  selectedIndex.value = index;
};
</script>

<template>
<Header :context="'landing-page'" />
<div class="faq-section"
     :style="{ backgroundImage: `url(${background})` }">

    <div class="max-w-7xl mx-auto flex flex-col items-center">
      
      <!-- Section Header -->
      <div class="my-6 text-center max-w-3xl">
        <h2 class="heading" >
          Enterprise Services
        </h2>
        <p class="text-lg text-gray-600 leading-relaxed m-0">
          Our enterprise services can be seamlessly integrated within Gates or developed independently according to your specific requirements.
        </p>
      </div>

      <!-- Main Grid Container -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">        
        <div class="lg:col-span-4 flex items-center">
          <ul class="w-full list-none p-0 m-0 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
            <li
              v-for="(service, index) in services"
              :key="index"
              @click="selectService(index)"
              class="px-5 py-4 cursor-pointer transition-all duration-200 font-medium text-gray-800 border-b border-gray-200 last:border-b-0 hover:bg-gray-100"
              :class="{ 'font-semibold text-white!': selectedIndex === index }"
              :style="selectedIndex === index ? { backgroundColor: themeColor } : {}"
            >
              {{ service.name }}
            </li>
          </ul>
        </div>

        <!-- Selected Service Details -->
        <div class="lg:col-span-8 flex items-center">
          <div class="w-full bg-white p-5 sm:p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 
              class="font-semibold text-2xl mb-4"
              :style="{ color: themeColor }"
            >
              {{ services[selectedIndex].name }}
            </h3>
            
            <p class="text-gray-600 leading-relaxed mb-6">
              {{ services[selectedIndex].description }}
            </p>

            <!-- Image Container -->
            <div class="text-center my-8">
              <img 
                :src="services[selectedIndex].image" 
                alt="Service illustration" 
                class="max-h-[500px] rounded-2xl mx-auto object-contain" 
              />
            </div>

            <!-- Outcome Section -->
            <div class="mb-6">
              <h4 
                class="font-semibold text-base mb-3"
                :style="{ color: themeColor }"
              >
                Outcome
              </h4>
              <ul class="list-none p-0 m-0">
                <li 
                  v-for="(item, i) in services[selectedIndex].outcome" 
                  :key="i" 
                  class="text-gray-700 mb-2 pl-6 relative leading-normal"
                >
                  <span 
                    class="absolute left-0 font-bold"
                    :style="{ color: themeColorOrange }"
                  >✓</span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- Advantages Section -->
            <div class="mb-6">
              <h4 
                class="font-semibold text-base mb-3"
                :style="{ color: themeColor }"
              >
                Advantages
              </h4>
              <ul class="list-none p-0 m-0">
                <li 
                  v-for="(item, i) in services[selectedIndex].advantages" 
                  :key="i" 
                  class="text-gray-700 mb-2 pl-6 relative leading-normal"
                >
                  <span 
                    class="absolute left-0 font-bold"
                    :style="{ color: themeColorOrange }"
                  >✓</span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- WhatsApp Action Button -->
            <div class="flex justify-center mt-8">
              <a 
                :href="whatsAppUrl" 
                class="inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
              >
                <img 
                  src="../data/images/WhatsAppButtonGreenMedium.svg" 
                  alt="Contact via WhatsApp" 
                  class="h-[50px] w-auto" 
                />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
