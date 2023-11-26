import { createVuetify, VuetifyOptions } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'

export default createVuetify({
  ssr: true,
  directives,
  components: {
    ...components,
    ...labs
  },
  display: {
    mobileBreakpoint: 'md'
  },
  theme: {
    defaultTheme: localStorage.getItem('theme') || 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#E91E63",
          background: '#f6f9fc'
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#FFCA28",
        },
      },
    }
  }
} as VuetifyOptions)