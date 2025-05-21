// main.js
import { createApp } from 'vue'
import App        from './App.vue'
import router     from './router'

/* PrimeVue */
import PrimeVue   from 'primevue/config'
import Ripple     from 'primevue/ripple'       // директива ripple
import StyleClass from 'primevue/styleclass'   // директива styleclass

/* CSS */
import 'primevue/resources/themes/saga-blue/theme.css' // можеш змінити тему
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'              // ⬅️ УТИЛІТИ flex/spacing

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })           // увімкнули ripple глобально

/* Директиви, які потрібні для демо-сайдбару */
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

app.mount('#app')
