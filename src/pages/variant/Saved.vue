<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <div class="w-100 py-4 d-flex justify-space-between align-center">
                <span class="text-primary text-body-1">{{ t('saved_products') }}</span>
            </div>
            <div v-show="getters.saved.length === 0">
                <span class="text-grey text-body-2">{{ t('no_data') }}...</span>
            </div>
            <Splide :options="slideOptions">
                <SplideSlide v-for="item,i in getters.saved" :key="i">
                    <AppProductCard :item="item" />
                </SplideSlide>
            </Splide>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Splide, SplideSlide, Options } from '@splidejs/vue-splide'
import AppProductCard from '../../components/variant/AppProductCard.vue';

const { t } = useI18n()
const { getters } = useStore()
const slideOptions: Options = {
    rewind: true, 
    arrows: false,
    pagination: false,
    gap: '10px',
    perMove: 1,
    perPage: 4,
    breakpoints: {
		550: {
			perPage: 1,
		},
		700: {
			perPage: 2,
		},
        960: {
            perPage: 3,
        }
  }
}
</script>