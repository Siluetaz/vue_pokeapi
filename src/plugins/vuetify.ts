import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdiGenderFemale, mdiGenderMale, mdiShimmer } from '@mdi/js'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      "genderFemale":  mdiGenderFemale,
      "genderMale":  mdiGenderMale,
      "shimmer":  mdiShimmer,
    },
    sets: {
      mdi,
    },
  },
})