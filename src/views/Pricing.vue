<script setup>
import Header from '../components/Header.vue'

import { themeColor, themeColorOrange, themeColorWhite,
         display_price_list, app_login_url } from "../config.js";

const heading = "Plans and Pricing";
const subHeading = "Pricing refer only to the hosting services (GATES). You always choose the final price to charge the customer to manufacture their devices. We just suggest.";
const startButtonName = "Get Started";
</script>


<template>
<Header :context="'landing-page'" />

<div class="untree_co-section" id="pricing-section">
  <div class="container">
    <div class="row pricing-title ">
      <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
        <h2 class="heading">
          {{ heading }}
          <sub :style="{ color: themeColorOrange, 'font-size': '0.8rem' }">for GATES</sub>
        </h2>        
        <p class="mb-5">{{ subHeading }}</p>
      </div>
    </div>
    <div class="col-lg-12">
       <div class="row justify-content-center g-4"> 
          <!-- Free Plan -->
          <div class="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="50">
            <div class="pricing">
              <div class="body">
                <div class="price">
                  <span class="d-block plan">Free</span>
                  <span class="price" :style="[{ color: themeColor }]">0<sup>€/Month</sup></span>
                </div>
                <ul class="list-unstyled ul-check primary mb-5">
                  <li>CAD online</li>
                  <li>Manufacturing Hub to manage orders </li>
                  <li>Automated Quotations</li>
                </ul>
                <p class="text-center mb-0">
                  <a
                    :href="app_login_url"
                    class="btn "
                    :style="[{ backgroundColor: themeColor },
                            { borderColor: themeColor },
                            { color: themeColorWhite }
                            ]">
                    Get Started
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div class="pricing">
              <div class="body">
                <div class="price">
                  <span class="d-block plan">{{ display_price_list[0].name }}</span>
                  <span class="price" :style="[{ color: themeColor }]"
                        >{{ display_price_list[0].price }}<sup>€/Month</sup></span>
                </div>
                <pre></pre>
                <ul class="list-unstyled ul-check primary mb-5">
                  <li> CAD hosted at your address </li>
                  <li> Manufacturing Hub to manage orders </li>
                  <li> Automated Quotations </li>
                  <li> Your Brand in Display </li>
                </ul>
                <p class="text-center mb-0">
                  <a
                    :href="app_login_url"
                    class="btn "
                    :style="[{ backgroundColor: themeColor },
                            { borderColor: themeColor },
                            { color: themeColorWhite } ]">
                    Get Started </a >
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div class="pricing">
              <div class="body">
                <div class="price">
                  <span class="d-block plan">{{ display_price_list[1].name }}</span>
                  <span class="price" :style="[{ color: themeColor }]"
                        ><span><sup>{{ display_price_list[1].price }}</sup></span></span>
                </div>
                <ul class="list-unstyled ul-check primary mb-5">
                  <li>All 'Basic' features</li>
                  <li>Manufacturing Checks</li>
                  <li>Feasability Agent</li>
                  <li>Structural Integrity simulations</li>
                  <li>Listed in Manufacturing World Map </li>
                </ul>
                <p class="text-center mb-0">
                  <a
                    :href="app_login_url"
                    class="btn"
                    :style="[
                            { backgroundColor: themeColorWhite },
                            { borderColor: themeColorWhite },
                            { color: themeColor }  ]" > In next release</a>
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div class="pricing">
              <div class="body">
                <div class="price">
                  <span class="d-block plan">{{ display_price_list[2].name }}</span>
                  <span class="price" :style="[{ color: themeColor }]">
                    
                    <span><sup>{{ display_price_list[2].price }}</sup></span></span >
                </div>
                <ul class="list-unstyled ul-check primary mb-5">
                  <li>Proprietary URL</li>
                  <li>Shape Optimization </li>
                  <li>Customer data Ownership</li>
                  <li>Parametric CAD of your best product</li>
                  <!-- <li>Non subscription package</li> -->
                </ul>
                <p class="text-center mb-0">
                  <a
                    href="/services"
                    class="btn "
                    :style="[{ backgroundColor: themeColor },
                            { borderColor: themeColor },
                            { color: themeColorWhite } ]">
                    Check Out our Services</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<div class="bg-light refund-guarantee" id="refund-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <!-- Header -->
        <div class="row">
          <div class="col-12 text-center mb-5" data-aos="fade-up" data-aos-delay="0">
            <div class="refund-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg"  width="80" height="80"  fill="none" viewBox="0 0 24 24" stroke-width="2" :stroke="themeColorOrange" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
              </svg>
              
            </div>
            <h3 class="refund-heading">
              100% Refund Guarantee
            </h3>
            <p class="refund-subtitle">
              Pay only for what you use. No hidden fees, no commitments.
            </p>
          </div>
        </div>        
        
        <!-- Process Timeline -->
        <div class="row mt-5">
          <div class="col-12" data-aos="fade-up" data-aos-delay="300">
            <div class="refund-timeline">
              <h5 class="timeline-title text-center mb-4">How It Works</h5>
              <div class="timeline-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h6>End of Month</h6>
                    <p>The system checks if the hub has been visited in the previous month</p>
                  </div>
                </div>
                <div class="step-arrow">→</div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h6>Auto Refund</h6>
                    <p>Full refund will be processed within 5-10 business days, if visitors are 0</p>
                  </div>
                </div>
              </div>
              <div class="text-center" data-aos="fade-up" data-aos-delay="400">
                <!-- <div class="refund-cta"> -->
                  <h5 class="cta-title mb-3">Have Questions?</h5>
                  <p class="cta-text mb-4">Learn more about our policies and get answers to common questions.</p>
                  <a href="/faq" class="btn btn-outline-primary btn-lg cta-button">
                    Visit FAQ
                  </a>
                  <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<style scoped>
.heading {
    margin: 3rem;  
    font-size: 3.0rem;  
    font-weight: 550;
    text-align: center;
}

.btn {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
    
    transform: scale(1.05);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    z-index: 2; /* ensures it overlays above neighbors */
}

.price {
    font-size: 1rem; /* smaller than before, adjust as needed */
    font-weight: 500;
}

.price sup {
    font-size: 0.7rem; /* smaller superscript for €/Month */
}


.ul-check.primary li {
    position: relative;
    padding-left: 1.5rem; /* space for tick */
    margin-bottom: 0.75rem;
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
    border-radius: 2rem; /* keep it smooth */
    width: 100%;
}

.body {
    background-color: white;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.35);
    
}

.pricing:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    z-index: 2; /* ensures it overlays above neighbors */
}


/*       REFUND SECTION STYLE        */
.refund-guarantee {
    /* background: #f8f9fa; */
    padding: 5rem 0;
}

.refund-icon svg {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.refund-heading {
    font-size: 2.5rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 1rem;
}

.refund-subtitle {
    font-size: 1.2rem;
    color: #6c757d;
    max-width: 500px;
    margin: 0 auto;
}

.refund-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    height: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.refund-timeline {
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.timeline-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
}

.row.justify-content-center {
  display: flex;
  flex-wrap: wrap; /* ensures cards wrap on smaller screens */
  align-items: center; /* vertically centers cards */
  justify-content: center; /* horizontal centering */
  min-height: 400px; /* optional: the height you want the cards centered within */
}

.timeline-steps {
    margin: 2rem;
    display: flex;
    align-items: center;
    justify-content: center; /* center the whole block horizontally */
    flex-wrap: wrap;
    gap: 1rem;
    text-align: center; /* ensures steps are aligned center */
}

.step {
    flex: 0 1 180px; /* keeps steps flexible but with min width */
    max-width: 200px;
}

.step-arrow {
    font-size: 1.5rem;
    color: v-bind(themeColor);
    align-self: center;
    margin: 0 1rem;
}

.step-number {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: v-bind(themeColor);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0 auto 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.step-content h6 {
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.5rem;
}

.step-content p {
    color: #6c757d;
    font-size: 1.2rem;
    margin: 0.2;
}

.step-arrow {
    font-size: 1.5rem;
    color: v-bind(themeColor);
    align-self: center;
    margin: 0 1rem;
}


.cta-title {
    padding: 2.2rem;
    
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
}

.cta-text {
    color: #6c757d;
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
}

.cta-button {
    border-color: v-bind(themeColor);
    color: v-bind(themeColor);
    padding: 0.75rem 2rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.cta-button:hover {
    background-color: v-bind(themeColor);
    border-color: v-bind(themeColor);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .refund-heading {
    font-size: 2rem;
  }
  
  .timeline-steps {
    flex-direction: column;
    align-items: center;
  }
  
  .step-arrow {
    transform: rotate(90deg);
    margin: 1rem 0;
  }
  
  .refund-card {
    margin-bottom: 1rem;
  }
}

</style>
