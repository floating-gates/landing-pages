import { createRouter, createWebHistory } from 'vue-router'
import LandingPage       from '../ui_compositor/LandingPage.vue'
import Pricing           from '../ui_compositor/Pricing.vue'
import Mission           from '../ui_compositor/Mission.vue'
import ValueProposition  from '../ui_compositor/ValueProposition.vue'
import TermsService      from '../ui_compositor/TermsService.vue'
import PrivacyPolicy     from '../ui_compositor/PrivacyPolicy.vue'
import Services          from '../ui_compositor/Services.vue'
import Guide             from '../ui_compositor/Guide.vue'
import FAQ               from '../ui_compositor/FAQ.vue'
import CaseStudies       from '../ui_compositor/CaseStudies.vue'
import Product           from '../ui_compositor/Product.vue'
import Download          from '../ui_compositor/Download.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/mission', component: Mission },
    { path: '/use-case', component: CaseStudies },
    { path: '/value-proposition', component: ValueProposition },
    { path: '/services', component: Services },
    { path: '/terms_and_services', component: TermsService },
    { path: '/privacy-policy', component: PrivacyPolicy },
    { path: '/guide', component: Guide },
    { path: '/faq',   component: FAQ },
    { path: '/pricing', component: Pricing },
    { path: '/product', component: Product },
    { path: '/articles', component: CaseStudies },
    { path: '/download', component: Download }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
