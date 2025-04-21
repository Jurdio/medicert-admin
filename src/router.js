import { createRouter, createWebHistory } from 'vue-router'
import CertificateForm from './components/CertificateForm.vue'
import DraftHistory from './components/DraftHistory.vue'
import NftVerifier from "@/components/icons/NftVerifier.vue";

const routes = [
    { path: '/', redirect: '/protection' },
    { path: '/protection', component: CertificateForm },
    { path: '/history', component: DraftHistory },
    { path: '/verify', component: NftVerifier },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
