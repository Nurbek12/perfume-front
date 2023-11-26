<template>
  <v-app-bar density="compact" color="surface" height="130" flat>
    <v-container>
      <v-row>
        <v-col cols="12" class="py-0 d-flex justify-space-between align-center">
            <router-link class="text-h6 text-primary text-decoration-none font-weight-normal" to="/">
              <v-img width="150" src="/logos/logo.png"></v-img>
            </router-link>
            <div class="d-flex gap-1">
              <template v-if="!mobile">
                <!-- <v-list-item class="small-list-spacer text-right text-primary"
                    density="compact" nav
                    prepend-icon="mdi-map-marker"
                    title="Qashqadaryo"
                    subtitle="Manzil">
                </v-list-item> -->
                <v-list-item class="small-list-spacer text-right text-primary"
                    density="compact" nav
                    prepend-icon="mdi-clock-outline"
                    title="10:00-18:00"
                    subtitle="Ish vaqti">
                </v-list-item>
              </template>
              <v-list-item class="small-list-spacer text-right text-primary"
                  density="compact" nav
                  prepend-icon="mdi-phone"
                  title="+998 90 123 45 67"
                  subtitle="Yetkazib berish xizmati">
              </v-list-item>
            </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-0 pr-0" cols="7" sm="4" md="3" v-if="mobile">
            <app-home-category />
        </v-col>
        <v-col class="pb-0 d-flex justify-space-between align-center" cols="5" sm="8" md="12">
          <!-- <span></span> -->
          <div class="d-flex gap-1 h-100" v-if="!mobile">
            <v-btn class="h-100 text-caption text-uppercase" color="primary" density="compact" variant="text" prepend-icon="mdi-home-outline" to="/" exact>{{ t('links.home') }}</v-btn>
            <v-btn class="h-100 text-caption text-uppercase" color="primary" density="compact" variant="text" prepend-icon="mdi-magnify" to="/products">{{ t('links.products') }}</v-btn>
            <v-btn class="h-100 text-caption text-uppercase" color="primary" density="compact" variant="text" prepend-icon="mdi-gift-outline" to="/gifts">{{ t('links.gifts') }}</v-btn>
            <!-- <v-btn class="h-100 text-caption text-uppercase" color="primary" density="compact" variant="text" prepend-icon="mdi-heart-outline" to="/saved">{{ t('links.saved') }}</v-btn> -->
            <v-btn class="h-100 text-caption text-uppercase" color="primary" density="compact" variant="text" prepend-icon="mdi-cart-outline" to="/cart">{{ t('links.cart') }}</v-btn>
            <!-- <v-btn class="h-100 text-caption text-uppercase" color="primary" density="compact" variant="text" prepend-icon="mdi-account-outline" to="/profile">{{ t('links.profile') }}</v-btn> -->
          </div>
          <span v-else></span>
          <div class="d-flex gap-1 ml-4 justify-end">
              <!-- <v-btn variant="flat" size="40" elevation="2" color="primary">
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn> -->
              <v-btn @click="changeTheme" variant="flat" size="40" color="primary">
                <v-icon>{{themeIcon}}</v-icon>
              </v-btn>
              <v-menu transition="fade-transition">
                <template v-slot:activator="{props}">
                  <v-btn v-bind="props" variant="flat" size="40" color="primary">
                    {{ currentLang?.lang }}
                  </v-btn>
                </template>

                <v-list elevation="2" density="compact">
                  <v-list-item v-for="(item, i) in languages" link :key="i" @click="changeLang(item.lang)">
                    <v-list-item-title class="text-caption" v-text="item.title"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- <v-menu transition="fade-transition">
                <template v-slot:activator="{props}">
                  <v-btn v-bind="props" variant="flat" size="40" color="primary">
                    EUR
                  </v-btn>
                </template>

                <v-list elevation="2" density="compact">
                  <v-list-item v-for="(item, i) in ['$ USD', '€ EUR', '₽ RUB', 'SUM']" link :key="i">
                    <v-list-item-title class="text-caption">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> -->
              <v-btn variant="flat" size="40" color="primary" to="/profile">
                <v-icon>mdi-login-variant</v-icon>
              </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import AppHomeCategory from './app-home-category.vue'
import { useDisplay } from 'vuetify'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import vuetify from "../plugins/vuetify"

const { locale, t } = useI18n()

const languages = [
  { lang: 'en', img: '/flags/us.svg', title: "English" },
  { lang: 'ru', img: '/flags/ru.svg', title: "Русский" },
  { lang: 'uz', img: '/flags/uz.svg', title: "O'zbekcha" },
]

const currentLang = computed(() => languages.find((l) => l.lang === locale.value))
const changeLang = (l: string) => {
  localStorage.setItem('language', l)
  locale.value = l
}

const changeTheme = () => {
  vuetify.theme.global.name.value =
  vuetify.theme.global.name.value === "dark" ? "light" : "dark";
  localStorage.setItem('theme', vuetify.theme.name.value)
}

const themeIcon = computed(() => {
  return vuetify.theme.global.name.value === "dark" ? "mdi-weather-night" : "mdi-white-balance-sunny";
})
const mobile = useDisplay().mobile
</script>