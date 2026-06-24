<script setup>
import { themeColor, themeColorOrange, themeColorLille } from "../config.js";
import { ref } from "vue";
import background from "../data/images/background_pic.webp"
import Header from "../components/Header.vue";

const faqs = [
    {
        question: "What is Gates?",
        answer: "It is a software that lives in your company network. It perform CAD and GD&T autonomous revision revision to spot manufacturing issues. Every cad files in the network, it encounter a critical checkpoints by which is either green lit or highlighted for revision. A human in the loop is required once an issue is found."
    },
    {
        question: "Who is it for?",
        answer: "It's a software for who design and produce hardware. Gates serves from big R&D deparments with multiple machines to small workshops that owns just a 3D printer. Our solution is especially valuable for those who struggle to fully utilize their machines due to cumbersome order inquiries."
    },
    {
        question: "How it does it?",
        answer: "The software is composed of a Manufacturing Agent and a public-facing Model-Based Definition (MBD) interface. The Agent checks the manufacturability and return reports on the health status of CAD files in your company network. While the MDB interface can provided a guide to both internal ed external stakeholders ( Customers or Suppliers ) towards the product they want, respecting your standards and assessing what the machines can reasonably produce."
    },
    {
        question: "What does Gates provides to Your Business?",
        answer: "Internally to the factory, Gates automates feasability checks and provides real-time alerts for non-viable designs. While externally, by hosting a public-facing online Model-based Definition interface, the platform empowers customers/suppliers to self-engineer, price, and correct their parts before an order is even placed. This results in higher-quality leads, instant quoting, and a simplified interaction model that allows manufacturers to expand their client base while focusing only on feasible, ready-to-produce projects."
    },
    {
        question: "What problem does it solve?",
        answer: "It saves the huge amount of time spent on design revision. It streamlines quoting and automates technical checks, enabling manufacturers to operate more efficiently and focus on what they do best: building."
    },
    {
        question: "What differentiates it from competitors?",
        answer: "Unlike standalone tools, Gates work on the network and even if a designer forget to double check its project, Gates will flag errrors if found some. Gates do not interfere with your business decisions, instead we provide a framework around it, with the goal of improving operational efficiency."
    },
    {
        question: "Can I be listed into one of the Certified Manufacturers list?",
        answer: "Yes, we are starting a programme to collect a list a company who prefer to be listed into a wider network of makers so they can reach a wider customer base. Send us an email at contact@floating-gates.com if you would like a preview of the service."
    },
    {
        question: "How is data handled and stored?",
        answer: "For the Basic, Standard and Pro plans, we offer secure cloud access as well as on-premise options, with all data protected under GDPR-compliant practices. For enterprise customers, software and data governance are fully transferred to the purchaser."
    },
    {
        question: "What is a Custom address?",
        answer: "Gates is a managed cloud service and it is going to host a server for the infrastructrure and its'services. For the Basic and Standard programme we are going to use the suffix floating-gates.com while for Enterprise customer we purchase a stand alone domain name"
    },
    {
        question: "Do you offer affiliate programs?",
        answer: "Yes. Creators and manufacturers can earn commissions by bringing new customers to the platform. By subscribing at: app.floating-gates.com/referral-login"
    },
    {
        question: "What is your refund policy?",
        answer: "If your account remains inactive during a billing cycle—meaning there is no activity from you or your potential customers—you will automatically receive a full refund. Refunds are processed at the end of the month and issued within 5–10 business days."
    }
];


const openIndex = ref(null); // If you only want one open at a time

const toggleItem = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const isOpen = (index) => openIndex.value === index;
</script>

<template>
<Header :context="'landing-page'" />
<div class="faq-section"
     :style="{ backgroundImage: `url(${background})` }">
  <div class="row justify-content-center">
    
    <h2 class="faq-header heading">Got Questions?  <em :style="{color: themeColorOrange}">We've Got Answers</em></h2>

    <div class="faq-container">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
        :class="{ 'is-open': isOpen(index) }"  >
        <button
          @click="toggleItem(index)"
          class="faq-question"
          :aria-expanded="isOpen(index)"    >
          <div class="question-left">
            <div class="question-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <span class="question-text">{{ faq.question }}</span>
          </div>
          <span class="faq-icon">
            <svg
              :class="{ 'rotated': isOpen(index) }"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </span>
        </button>
        
        <div class="faq-answer" :class="{ 'is-open': isOpen(index) }">
          <div class="answer-content">
            <div class="answer-text">{{ faq.answer }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.faq-container {
    margin: 0 auto 2rem;
    max-width: 60%;
}

.faq-section {
    padding: 7rem 0 3rem 0;
    position: relative;
    background-size: cover;
    background-position: center top;   /* anchor to top if it's a tall image */
    width: 100%;
}

.faq-section::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: radial-gradient(
        ellipse at center top, rgba(108, 117, 125, 0.03) 0%, transparent 70%);
    pointer-events: none;
}

.faq-header {
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 5rem;
}

.faq-subtitle {
    font-size: 1.2rem;
    color: #6c757d;
    margin: 0 auto 2rem;
    max-width: 80%;
    line-height: 1.5;
}

.faq-item {
    background: #fff;
    -webkit-text-fill-color: v-bind(themeColor); /* Force white when open */
    border-radius: 16px;
    margin-bottom: 1.2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border: 2px solid transparent;
    color: v-bind(themeColor);
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
}

.faq-item.is-open {
    color: v-bind(themeColorWhite); /* Force white when open */ 
    -webkit-text-fill-color: v-bind(themeColorWhite); 
}

.faq-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: v-bind(themeColorLille);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.faq-item:hover {
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.faq-item.is-open {
    border-color: v-bind(themeColor);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
}

.faq-item.is-open::before {
    background: v-bind(themeColor);
    transform: scaleX(1);
}

.faq-question {
    width: 100%;
    padding: 2rem 2.5rem;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
}

.faq-item.is-open .faq-question {
    background: v-bind(themeColor);
    color: #fff;
}

.question-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.question-number {
    font-size: 2rem;
    font-weight: 700;
    color: v-bind(themeColor);
    opacity: 0.8;
    min-width: 30px;
    transition: all 0.3s ease;
}

.faq-item.is-open .question-number {
    color: #fff;
    opacity: 1;
}

.question-text {
    font-weight: 550;
    font-size: 1.8rem;
}

.faq-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: v-bind(themeColorLille);
    display: flex;
    align-items: center;
    justify-content: center;
    color: v-bind(themeColor);
    transition: all 0.3s ease;
}

.faq-item.is-open .faq-icon {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    transform: scale(1.1);
}

.faq-icon svg.rotated {
    transform: rotate(180deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
}

.faq-answer.is-open {
    max-height: 500px;
}

.answer-text {
    color: v-bind(themeColor);
    font-size: 1.4rem;
    line-height: 1.6;
    padding: 2rem;
}



/* ===== Mobile Responsive ===== */
@media (max-width: 768px) {
    .faq-section {
        padding: 4rem 1.5rem;
    }

    .faq-container {
     max-width: 95%;
    }

    .faq-title {
        font-size: 2.2rem;
    }
    
    .faq-subtitle {
        font-size: 1.1rem;
    }
    
    .faq-question {
        padding: 1.5rem 1rem;
    }
    
    .question-left {
        gap: 1rem;
    }
    
    .question-number {
        font-size: 1.6rem;
    }
    
    .question-text {
        font-size: 1.3rem;
        font-weight: 500;
    }
    
    .faq-icon {
        width: 40px;
        height: 40px;
    }
    
    .answer-text {
    font-size: 1rem;
    padding: 1rem 1rem 1.5rem 1.5rem;
  }
}
</style>
