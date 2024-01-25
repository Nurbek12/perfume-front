<template>
  <v-app-bar color="background" flat height="60">
    <v-app-bar-title>{{ getters.user.name || 'Admin Dashboard' }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn color="primary" variant="flat" size="40" @click="changeTheme">
        <v-icon>{{themeIcon}}</v-icon>
      </v-btn>
      <v-menu transition="fade-transition">
        <template v-slot:activator="{props}">
          <v-btn class="mx-2" v-bind="props" flat size="40" variant="flat" color="primary" elevation="1">
            {{currentLang?.lang}}
          </v-btn>
        </template>

        <v-list elevation="2" density="compact">
          <v-list-item v-for="(item, i) in languages" link :key="i" @click="changeLang(item.lang)">
            <v-list-item-title class="text-caption" v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import vuetify from "../plugins/vuetify"
import { languages } from '../constants'

const { locale } = useI18n()
const { getters } = useStore()

const currentLang = computed(() => languages.find((l) => l.lang === locale.value))
const changeLang = (l: string) => {
  localStorage.setItem('language', l)
  locale.value = l
}

const changeTheme = () => {
  vuetify.theme.global.name.value =
  vuetify.theme.global.name.value === "dark" ? "light" : "dark";
}

const themeIcon = computed(() => {
  return vuetify.theme.global.name.value === "dark" ? "mdi-weather-night" : "mdi-white-balance-sunny";
})
</script>