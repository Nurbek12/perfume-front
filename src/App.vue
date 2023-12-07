<template>
    <v-app>
        <app-bar />
        <v-main class="min-h-screen">
            <router-view @loaded="overlay=true" />
        </v-main>
        <template v-if="overlay">
            <app-footer />
            <app-nav-bottom />
        </template>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from './components/app-bar.vue'
import AppNavBottom from './components/app-nav-bottom.vue'
import AppFooter from './components/app-footer.vue'
import { getAllCategories } from './api/categories'
import { getAllBrands } from './api/brands'
import { useStore } from 'vuex'
import { brands, categories } from './products'

const overlay = ref(false)
const { commit } = useStore()

const init = async () => {
    // const [c, b] = await Promise.all([getAllCategories(''), getAllBrands('')])
    // commit('SET_CATEGORIES', c.data.results)
    // commit('SET_BRANDS', b.data.results)
    // console.log(c.data, b.data); 
    commit('SET_CATEGORIES', categories.results)
    commit('SET_BRANDS', brands.results)
}

init()
</script>