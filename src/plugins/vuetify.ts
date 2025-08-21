import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'

import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'medievalTheme',
    themes: {
      medievalTheme: {
        dark: false,
        colors: {
          primary: '#8c1c13',
          secondary: '#1e3a5f',
          background: '#f4ecd8',
          surface: '#d8c29d',
          onPrimary: '#f4ecd8',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

export default vuetify
