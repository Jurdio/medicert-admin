import { createRouter, createWebHistory } from 'vue-router'
import CertificateForm from './components/CertificateForm.vue'

const routes = [
    { path: '/', redirect: '/protection' },
    { path: '/protection', component: CertificateForm },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
