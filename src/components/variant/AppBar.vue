<template>
<v-app-bar theme="light" flat color="background" height="60">
    <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex gap-1" v-if="!mobile">
            <v-btn height="28" color="primary" class="text-none text-body-2 font-weight-light" variant="text" v-for="link,i in links" :key="i" :to="{ name: link}" exact>
                {{ t('links.'+link) }}
            </v-btn>
        </div>
        <router-link to="/" class="text-h6 text-primary text-decoration-none">
            <v-avatar size="150" rounded>
                <v-img src="/static/logo.svg" alt="site-logo"></v-img>
            </v-avatar>
        </router-link>

        <div class="d-flex align-center gap-1" v-if="!mobile">
            <v-btn color="primary" to="/saved" size="28" variant="text" class="text-none text-body-2 font-weight-light mr-1">
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn href="tel:+998908893700" color="primary" height="28" prepend-icon="mdi-phone" variant="text" class="text-none text-body-2 font-weight-light mr-1">
                <span>+998 (90) 889 37 00</span>
            </v-btn>
            <v-menu location="bottom center" transition="fade-transition">
                <template #activator="{props}">
                    <v-btn color="primary" height="28" v-bind="props" variant="outlined" class="text-none text-body-2 font-weight-light">
                        <template #prepend>
                            <v-avatar rounded size="20">
                                <v-img :src="currentLang?.img" alt="site-languages"></v-img>
                            </v-avatar>
                        </template>
                        <span>{{ currentLang?.title }}</span>
                    </v-btn>
                </template>
                <v-list density="compact" nav>
                    <v-list-item link v-for="lang, i in languages" :key="i" @click="changeLang(lang.lang)">
                        <template #prepend>
                            <v-avatar rounded size="30">
                                <v-img :src="lang.img" alt="sile-languages-choice"></v-img>
                            </v-avatar>
                        </template>
                        <v-list-item-title>{{ lang.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <v-btn v-else aria-labelledby="toggle-nav-drawer" aria-label="toggle-drawer" @click="$emit('open-nav')" size="40" variant="flat" color="primary">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-container>
</v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { languages, links } from '../../constants'

const { locale, t } = useI18n()

const currentLang = computed(() => languages.find((l) => l.lang === locale.value))
const changeLang = (l: string) => {
  localStorage.setItem('language', l)
  locale.value = l
}

const { mobile } = useDisplay()
</script>