<template>
    <AppNavbar :drawer="drawer" @close-nav="drawer=false" />
    <AppBar @open-nav="drawer=true" />
    <v-main class="min-h-screen">
        <v-container class="d-flex align-center justify-center" style="min-height: 50vh;">
            <div class="text-h1 font-weight-bold">
                <span class="text-primary">4</span>
                <span>0</span>
                <span class="text-primary">4</span>
            </div>
        </v-container>
    </v-main>
    <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppFooter from '../components/app-footer.vue'
import AppBar from '../components/variant/AppBar.vue'
import AppNavbar from '../components/variant/AppNavbar.vue'

const drawer = ref(false)
</script>