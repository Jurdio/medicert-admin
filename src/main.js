import { createApp } from 'vue'
import App        from './App.vue'
import router     from './router'

/* PrimeVue core */

import Chart    from 'primevue/chart'   // якщо реєструєш глобально
import PrimeVue   from 'primevue/config'
import Ripple     from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
/* Toast service */
import ToastService from 'primevue/toastservice'

/* CSS */
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/main.css'



const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)                   // ⬅️ 1. Підключили сервіс Toast

/* директиви */
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

/* глобальний компонент Toast */
import Toast from 'primevue/toast'
app.component('Toast', Toast)           // ⬅️ 2. Зареєстрували компонент

app.mount('#app')
