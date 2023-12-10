<template>
  <v-footer class="bg-grey-darken-4 d-flex flex-column pb-15 pb-md-5" absolute>
    <v-container class="py-0">
      <div class="text-center mb-2">
        <span class="text-h6">Perfume Shop</span>
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
            <span>{{ t('footer.title') }}</span>
            <div class="w-100 text-justify mt-2 text-body-2 text-grey-lighten-1">
              {{ t('footer.text') }}
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="text-center">{{ new Date().getFullYear() }} — <strong>Perfume Shop</strong></div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import AppFooterLink from './app-footer-link.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const social_links = [
  { icon: 'mdi-facebook', title: 'Perfume Shop', url: '' },
  { icon: 'mdi-twitter', title: '@perfume.shop', url: '' },
  { icon: 'mdi-linkedin', title: 'Pefume_Shop', url: '' },
  { icon: 'mdi-instagram', title: '@perfume_shop_', url: '' },
  { icon: 'mdi-telegram', title: '@perfume_shop', url: '' },
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