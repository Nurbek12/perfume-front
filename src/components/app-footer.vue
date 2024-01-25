<template>
  <v-footer class="bg-grey-darken-4 d-flex flex-column pb-15 pb-md-5" absolute>
    <v-container class="py-0">
      <div class="text-center mb-2">
        <span class="text-h6">KESH MED</span>
      </div>
      <v-row class="mb-0">
        <v-col cols="6" sm="4" md="3">
          <app-footer-link :title="t('footer.social_links')" :links="social_links" />
        </v-col>

        <v-col cols="6" sm="4" md="3">
          <app-footer-link :title="t('footer.site_links')" :links="site_links" />
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <div class="d-flex flex-column h-100 w-100 rounded overflow-hidden">
            <iframe title="geolocation" width="100%" height="240px" id="gmap_canvas"
                src="https://maps.google.com/maps?q=qarshi,kesmedh&t=&z=11&ie=UTF8&iwloc=&output=embed"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="text-center">{{ new Date().getFullYear() }} — <strong>Kesh Med</strong></div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import AppFooterLink from './app-footer-link.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const social_links = [
  { icon: 'mdi-gmail', title: 'keshmed37@gmail.com', url: 'mailto:keshmed37@gmail.com' },
  { icon: 'mdi-instagram', title: '@keshmed37', url: 'https://www.instagram.com/keshmed37' },
  { icon: 'mdi-telegram', title: '@keshmed37', url: 'https://t.me/keshmed37' },
  { icon: 'mdi-phone', title: '+998 (90) 889 37 00', url: 'tel:+998908893700' },
  { icon: 'mdi-whatsapp', title: '+998 (90) 889 37 00', url: 'whatsapp.com' },
]

const site_links = [
  { icon: 'mdi-home-outline', title: 'Home Page', url: '/' },
  { icon: 'mdi-magnify', title: 'Products', url: '/products' },
  { icon: 'mdi-gift-outline', title: 'Brand', url: '/brands' },
  { icon: 'mdi-heart-outline', title: 'Saved', url: '/saved' },
]
</script>