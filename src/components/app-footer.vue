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
          <div class="d-flex flex-column w-100">
            <span>Lorem ipsum dolor sit amet.</span>
            <div class="w-100 text-justify mt-2 text-body-2 text-grey-lighten-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae consequuntur blanditiis, nobis ullam atque impedit sequi voluptatibus tempora eveniet facilis beatae dignissimos voluptas dolorum magnam iure unde adipisci perspiciatis similique!
            </div>
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
  { icon: 'mdi-facebook', title: 'Kesh Med', url: '' },
  { icon: 'mdi-twitter', title: '@kesh.med', url: '' },
  { icon: 'mdi-linkedin', title: 'Kesh_Med', url: '' },
  { icon: 'mdi-instagram', title: '@kesh_med_', url: '' },
  { icon: 'mdi-telegram', title: '@kesh_med', url: '' },
  { icon: 'mdi-phone', title: '+998 90 123 45 67', url: '' },
]

const site_links = [
  { icon: 'mdi-home-outline', title: 'Home Page', url: '/' },
  { icon: 'mdi-magnify', title: 'Products', url: '/products' },
  { icon: 'mdi-gift-outline', title: 'Gifts Page', url: '/gifts' },
  { icon: 'mdi-heart-outline', title: 'Saved Products', url: '/saved' },
  { icon: 'mdi-cart-outline', title: 'Shopping Cart', url: '/cart' },
  { icon: 'mdi-account-outline', title: 'Profile', url: '/profile' },
]
</script>