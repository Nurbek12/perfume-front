<template>
  <v-slide-group show-arrows="desktop">
    <v-slide-group-item v-for="brand in getters.brands" :key="brand.id">
      <div class="d-flex flex-column align-center">
        <router-link :to="`/brand/${brand.id}`" class="text-center text-decoration-none">
          <v-sheet v-ripple border height="120" class="mr-3 d-flex justify-center align-center text-h4 rounded" width="220" color="primary">
            <v-img height="100%" width="100%" :src="brand.image" cover></v-img>  
          </v-sheet>
          <span class="text-body-2 text-medium-emphasis text-decoration-none">{{ brand.name }}</span>
        </router-link>
      </div>
    </v-slide-group-item>
    <template #next>
      <v-btn size="40" variant="flat" color="primary">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </template>
    <template #prev>
      <v-btn size="40" variant="flat" color="primary">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
  </v-slide-group>

  <!-- <swiper
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false
    }"
    :navigation="true"
    :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 100,
      },
      '1024': {
        slidesPerView: 5,
        spaceBetween: 150,
      },
    }"
    :modules="[Autoplay, Navigation]"
  >
    <swiper-slide v-for="i in 10" :key="i">
        <v-sheet height="120" class="mr-3 d-flex justify-center align-center text-h4 rounded" width="220" color="grey">Brand {{i}}</v-sheet>
    </swiper-slide>
  </swiper> -->
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'

const { getters } = useStore()
</script>

<style>
/* .swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.autoplay-progress {
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--swiper-theme-color);
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}
     */
</style>