<template>
    <v-menu :attach="false" scroll-strategy="none" :no-click-animation="true" offset="28" :close-on-content-click="false" :close-on-back="true">
        <template v-slot:activator="{ props, isActive }">
            <v-list-item height="40" v-bind="props" class="bg-primary text-white rounded">
                <template #append>
                    <v-icon>mdi-chevron-{{ isActive?'up':'down' }}</v-icon>
                </template>
                <v-list-item-title>Категории</v-list-item-title>
            </v-list-item>
        </template>
        <app-links-list />
    </v-menu>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import AppLinksList from './app-links-list.vue'

const mobile = useDisplay().mobile
const route = useRoute()
const path = ref(route.path)

watch(() => route.path, (v) => {
    path.value = v
})
</script>