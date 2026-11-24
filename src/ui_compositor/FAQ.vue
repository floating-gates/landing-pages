<script setup>

import { ref } from "vue";
import background from "../data/images/background_pic.webp"
import Header from "../components/Header.vue";
import { ChevronDownIcon } from "../helper/icons_generator.js";

const faqs = [
    {
        question: "What is Good2Manufacture?",
        answer: "It is a software layer for companies of all sizes. It perform CAD and GD&T autonomous revision revision to spot manufacturing issues. Every cad files in the network, it encounter a critical checkpoints by which is either green lit or highlighted for revision. A human in the loop is required once an issue is found."
    },
    {
        "question": "What is the Huckster Interface?",
        "answer": "The Huckster Interface is a public-facing web portal that gives stakeholders ( external suppliers, customers, and internal employees ) a single, standardized channel for submitting design files. Uploaded CAD and GD&T documentation it is possible to check for manufacturing feasibility, providing instant insight on whether the design can actually be produced before it moves further down the pipeline."
    },
    {
        question: "Who is it for?",
        answer: "It's a software for who design and produce hardware. Floating Gates serves from big R&D deparments with multiple machines to small workshops that owns just a 3D printer. Our solution is especially valuable for those who struggle to fully utilize their machines due to cumbersome order inquiries."
    },
    {
        question: "How it does it?",
        answer: "The software is composed of a Manufacturing Agent and a public-facing Model-Based Definition (MBD) interface, called Huckster. The Agent checks the manufacturability and return reports on the health status of CAD files in your company network. While the MDB interface can provided a guide to both internal ed external stakeholders ( Customers or Suppliers ) towards the product they want, respecting your standards and assessing what the machines can reasonably produce."
    },
    {
        question: "What does Gates provides to Your Business?",
        answer: "A way to discover mistakes before they are being produced or a heavy design revision session start. Automating feasability checks and provides alerts for non-viable designs and by hosting an Huckster interface, empowers customers and suppliers to self-engineer, price, and correct their parts before commiting."
    },
    {
        question: "What problem does it solve?",
        answer: "It avoids previously un-avoidable design mistakes and saves 90% of time spent on design revision. Enabling manufacturers to operate more efficiently and focus on what they do best: building."
    },
    {
        question: "What differentiates it from competitors?",
        answer: "It works headless, which means it lives on the network and even if a designer forget to double check its project, Good2Manufacture will flag errrors if found. Godd2Manufacture do not interfere with your business decisions, instead we provide a framework around it."
    },
    {
        question: "How is data handled and stored?",
        answer: "For the Basic and Pro plans, we offer secure cloud access as well as on-premise options, with all data protected under GDPR and Cyber Resilient Act compliant infrastructure. For enterprise customers, software and data governance are fully transferred to the purchaser."
    },
    {
        question: "What is the address for Huckster Interface?",
        answer: "Each Huckster Interface instance in Standard and Pro is hosted by Floating Gates as a managed cloud service, so you don't need to provide or maintain any infrastructure of your own. Your instance lives under the floating-gates.com domain, for example 'yourcompany'.floating-gates.com. Enterprise programme can decide to have or not a public Huckster interface."
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
    
    <h2 class="faq-header heading">Got Questions?  <em class="text-brand-orange">We've Got Answers</em></h2>

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
            <ChevronDownIcon
              :class="{ 'rotated': isOpen(index) }"
              width="24"
              height="24"
              stroke-width="2.5"
            />
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
@reference "../main.css";

.faq-header {
    text-align: center;
    margin-top: 0;
    margin-bottom: 5rem;
}

.faq-item {
    background: #fff;
    -webkit-text-fill-color: var(--theme-color); /* Force white when open */
    border-radius: 16px;
    margin-bottom: 1.2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border: 2px solid transparent;
    color: var(--theme-color);
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
}

.faq-item.is-open .faq-question {
    background: var(--theme-color);
    color: var(--theme-color-white);
    -webkit-text-fill-color: var(--theme-color-white);
}

.faq-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--theme-color-lille);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.faq-item:hover {
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.faq-item.is-open {
    border-color: var(--theme-color);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
}

.faq-item.is-open::before {
    background: var(--theme-color);
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
    background: var(--theme-color);
    color: var(--theme-color-lille);
}

.question-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.question-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--theme-color);
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
    background: var(--theme-color-lille);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--theme-color);
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
    font-size: 1.4rem;
    line-height: 1.6;
    padding: 2rem;
}

/* ===== Mobile Responsive ===== */
@media (max-width: 768px) {
    .faq-section {
        padding: var(--header-stack) 1.5rem 3rem;
    }
    .faq-container {
     max-width: 95%;
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
