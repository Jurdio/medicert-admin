// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Створюємо Vuetify інстанс
export default createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    components,
    directives,
})
