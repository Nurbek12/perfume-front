<template>
    <v-navigation-drawer :model-value="drawer" @update:model-value="$emit('close-nav')" temporary>
        <template #prepend>
            <div class="py-2">
                <span class="px-4">KESHMED</span>
            </div>
        </template>

        <v-list density="compact" nav color="primary" aria-label="nav-links">
            <v-list-item density="compact" v-for="link,i in links" :key="i" link :to="{name: link.url}" aria-label="link" exact :title="t('links.'+link.url)"></v-list-item>
        </v-list>
        

        <template v-slot:append>
            <div class="pa-2">
                <v-btn href="tel:+998908893700" block variant="text" flat prepend-icon="mdi-phone" class="mb-2 text-caption" color="primary">+998 (90) 889 37 00</v-btn>
                <v-menu location="bottom center" transition="fade-transition">
                    <template #activator="{props}">
                        <v-btn block v-bind="props" variant="outlined" color="primary" class="text-none text-body-2 font-weight-light">
                            <template #prepend>
                                <v-avatar rounded size="20">
                                    <v-img :src="currentLang?.img" alt="site-nav-language image"></v-img>
                                </v-avatar>
                            </template>
                            <span>{{ currentLang?.title }}</span>
                        </v-btn>
                    </template>
                    <v-list density="compact" nav>
                        <v-list-item link v-for="lang, i in languages" :key="i" @click="changeLang(lang.lang)">
                            <template #prepend>
                                <v-avatar rounded size="30">
                                    <v-img :src="lang.img" alt="site-nav-language image" class="select language"></v-img>
                                </v-avatar>
                            </template>
                            <v-list-item-title>{{ lang.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { computed, defineProps, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { languages } from '../../constants'

const { locale, t } = useI18n()
const props = defineProps({
    drawer: Boolean,
})
const { drawer } = toRefs(props)
const currentLang = computed(() => languages.find((l) => l.lang === locale.value))
const changeLang = (l: string) => {
  localStorage.setItem('language', l)
  locale.value = l
}
const links = [
    { icon: 'mdi', title: 'Главная', url: 'home' },
    { icon: 'mdi', title: 'Продукты', url: 'products' },
    // { title: 'Запчасти', url: 'parts' },
    { icon: 'mdi', title: 'Избранные', url: 'saved' },
    { icon: 'mdi', title: 'Производители', url: 'brands' },
]
</script>