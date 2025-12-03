import { createRouter, createWebHistory } from 'vue-router'
import LandingPage       from '../views/LandingPage.vue'
import Pricing           from '../views/Pricing.vue'
import Mission           from '../views/Mission.vue'
import ValueProposition  from '../views/ValueProposition.vue'
import TermsService      from '../views/TermsService.vue'
import PrivacyPolicy     from '../views/PrivacyPolicy.vue'
import Services          from '../views/Services.vue'
import Guide             from '../views/Guide.vue'
import FAQ               from '../views/FAQ.vue'
import CaseStudies       from '../views/CaseStudies.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/mission', component: Mission },
    // { path: '/product', component: Product },
    { path: '/value-proposition', component: ValueProposition },
    { path: '/services', component: Services },
    { path: '/terms_and_services', component: TermsService },
    { path: '/privacy-policy', component: PrivacyPolicy },
    { path: '/guide', component: Guide },
    { path: '/faq',   component: FAQ },
    { path: '/pricing', component: Pricing },
    { path: '/case-studies', component: CaseStudies }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
