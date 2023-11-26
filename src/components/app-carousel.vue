<template>
    <Splide :options="{ rewind: true, pagination: true, arrows: true, autoplay: true }">
        <SplideSlide v-for="slide, i in slides" :key="i">
            <v-sheet width="100%" height="500" rounded>
                <v-avatar size="100%" rounded>
                    <v-img :src="slide" cover></v-img>
                </v-avatar>
            </v-sheet>
        </SplideSlide>
    </Splide>
<!-- <v-carousel color="white" cycle height="500" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="(slide, i) in slides" :key="i" cover :src="slide" />
</v-carousel>   -->
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide'
const slides = [
    '/bg/1390.jpg',
    '/bg/2052.jpg',
    '/bg/2062.jpg',
]
</script>