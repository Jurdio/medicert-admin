import { createRouter, createWebHistory } from 'vue-router'
import CertificateForm from './components/CertificateForm.vue'
import DraftHistory from './components/DraftHistory.vue'
import NftVerifier from "@/components/icons/NftVerifier.vue";
import Dashboard from './components/Dashboard.vue'

const routes = [
    { path: '/', redirect: '/protection' },
    { path: '/protection', component: CertificateForm },
    { path: '/history', component: DraftHistory },
    { path: '/verify', component: NftVerifier },
    { path: '/dashboard', component: Dashboard }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
