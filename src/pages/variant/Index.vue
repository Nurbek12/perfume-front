<template>
    <AppNavbar :drawer="drawer" @close-nav="drawer=false" />
    <AppBar @open-nav="drawer=true" />
    <v-main class="min-h-screen">
        <router-view />
    </v-main>
    <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { getTree } from '../../api/categories'
import { getAllBrands } from '../../api/brands'
import AppFooter from '../../components/app-footer.vue'
import AppBar from '../../components/variant/AppBar.vue'
import AppNavbar from '../../components/variant/AppNavbar.vue'


const drawer = ref(false)
const { commit } = useStore()

const init = async () => {
    const [c, b] = await Promise.all([
        getTree(),
        getAllBrands('')
    ])
    
    commit('SET_CATEGORIES', c.data)
    commit('SET_BRANDS', b.data.results)
}

init()
</script>