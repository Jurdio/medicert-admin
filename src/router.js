import { createRouter, createWebHistory } from 'vue-router'
import CertificateFormGroup from './components/CertificateFormGroup.vue'
import DraftHistory from './components/DraftHistory.vue'
import NftVerifier from "@/components/icons/NftVerifier.vue";
import Dashboard from './components/Dashboard.vue'

const routes = [
    { path: '/', redirect: '/protection' },
    { path: '/protection', component: CertificateFormGroup },
    { path: '/history', component: DraftHistory },
    { path: '/verify', component: NftVerifier },
    { path: '/dashboard', component: Dashboard }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
