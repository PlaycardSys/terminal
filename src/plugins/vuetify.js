import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
    theme: {
      defaultTheme: 'playcardsysTheme',
      themes: {
        playcardsysTheme: {
          dark: false,
          colors: {
            background: '#F8F7FA',
          },
        },
      },
    },
  })