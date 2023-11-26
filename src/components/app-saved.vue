<template>
<v-card flat min-height="500">
    <v-card-title class="text-primary">Избранные продукты</v-card-title>
    <v-card-text>
        <Splide :options="slideOptions">
            <SplideSlide v-for="perfume,i in getters.saved" :key="i">
                <app-product-card :product="perfume" />
            </SplideSlide>
        </Splide>
        <div class="w-100 text-center" v-show="!getters.saved.length">Пусто</div>
    </v-card-text>
</v-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from 'vuex'
import AppProductCard from './app-product-card.vue'
import { Splide, SplideSlide, Options } from '@splidejs/vue-splide';

const { getters } = useStore()
const slideOptions: Options = reactive({
    rewind: true,
    height: '100%',
    perMove: 1,
    perPage: 2,
    arrows: getters.saved.length !== 0,
    breakpoints: { 
        960: { 
            perPage: 1 
        } 
    },
    pagination: false
})
</script>