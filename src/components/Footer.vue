<script setup>
import { contactInfo, themeColorOrange, partner_app_login_url } from "../config.js";
import iconGithub from "../data/images/github-logo.svg";
import iconSubstack from "../data/images/substack-logo.png";

const copyrightText = "Copyright 2026, All rights reserved.";
const column1Text = "We are focused on building a bridge between unused production capacity and customer abundance. Our mission is to enable makers and innovators to utilise the idle machinery in the factories, through a platform that combines customised production with scalable manufacturing."

const connectHeading = "Connect with us";

const socialItems = [
    {
        link: "https://github.com/floating-gates/",
        icon: iconGithub,
    },
    {
        link: "https://floatinggates.substack.com/profile/posts",
        icon: iconSubstack,
    },
];
</script>

<template>
  <footer class="bg-[#efefef] text-[#888] text-sm py-[70px]" id="footer">
    <div class="footer-dots"></div>
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="flex flex-col lg:flex-row justify-between gap-12">       
        <div class="w-full">
          <div class="flex flex-col md:flex-row gap-8">
            <div class="w-full md:w-1/2 flex flex-col gap-10">
              <div class="widget">
                <div class="flex items-center gap-3 mb-3">
                  <img src="../data/images/logo.webp"
                       alt="Floating Gates Logo"
                       class="h-[30px] mb-2 w-auto shrink-0" />
                </div>
                <p class="mr-3">{{ column1Text }}</p>
              </div>
            </div>
            
            <div class="w-full md:w-1/2">
              <div class="widget">
                <a :href="partner_app_login_url" class="inline-flex items-center">
                  <h3 class="text-base font-semibold mb-3 inline-flex items-center ">
                    Become a Partner
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="none"
                         :stroke="themeColorOrange"
                         stroke-width="4"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="h-[1em] w-auto shrink-0">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </h3>
                </a>
                <p class="leading-relaxed">Get your hands dirty and come join us, it is going to be a rollercoaster.</p>
              </div>
              <div class="widget mt-5">
                <h3 class="text-base font-semibold mb-3">{{ connectHeading }}</h3>
                <ul class="flex gap-4 p-0 m-0 list-none">
                  <li>
                    <a :href="socialItems[0].link" class="inline-block transition-all duration-300
                                                          hover:opacity-20">
                      <img :src="socialItems[0].icon"
                           alt="Go to Github" class="h-8 w-auto max-w-full" />
                    </a>
                  </li>
                  <li>
                    <a :href="socialItems[1].link" class="inline-block transition-all
                                                          duration-300 hover:opacity-20">
                      <img :src="socialItems[1].icon"
                           alt="Go to Substack" class="h-8 w-auto max-w-full" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-3/12">
          <div class="widget">
            <h3 class="text-base font-semibold mb-3">Contacts</h3>
            <address class="not-italic mb-4">Loc: {{ contactInfo.address }}</address>
            <ul class="list-none p-0 m-0 mb-4 flex flex-col gap-2.5">
              <li>
                <a :href="'mailto:' + contactInfo.email" class="text-[#777] hover:text-[#D77A61] transition-colors duration-300">
                  <span>Email: {{ contactInfo.email }}</span>
                </a>
              </li>
              <li>
                <span>VAT: {{ contactInfo.vat }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-300/40 mt-12 pt-8">
        <div class="w-full text-center">
          <p class="m-0">
            {{ copyrightText }}
            &nbsp;|&nbsp;
            <a href="/terms_and_services">Terms and Services</a>
            and 
            <a href="/privacy-policy">Privacy Policy</a>
            apply
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-dots {
  position: absolute;
}
</style>
