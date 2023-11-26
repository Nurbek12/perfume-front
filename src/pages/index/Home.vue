<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3" class="pr-0" v-if="!mobile">
                <app-links-list />
            </v-col>
            <v-col cols="12" md="9">
                <app-carousel />
            </v-col>

            <!-- SECTION 1 -->

            <v-col cols="12">
                <v-sheet width="100%" color="surface" class="py-4 px-4 rounded">
                    <v-row>
                        <v-col cols="12" sm="6" md="3" v-for="item, i in icons2" :key="i">
                            <v-list-item nav lines="two">
                                <template #prepend>
                                    <v-icon size="35" color="primary">{{ item.icon }}</v-icon>
                                </template>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
            
            <!-- SECTION 2 -->

            <v-col cols="12">
                <app-home-brand-sliders />
            </v-col>
            
            <!-- SECTION 3 -->

            <v-col cols="12" class="d-flex justify-space-between align-center">
                <span class="text-h4 text-bottom-border">Новинки</span>
                <!-- <div class="d-flex gap-1">
                    <v-btn size="40" color="primary" variant="flat" class="text-none ml-0"><v-icon>mdi-chevron-left</v-icon></v-btn>
                    <v-btn @click="page1+1" size="40" color="primary" variant="flat" class="text-none ml-0"><v-icon>mdi-chevron-right</v-icon></v-btn>
                </div> -->
            </v-col>
            <v-col cols="12">
                <Splide v-model:page="page1" :options="slideOptions" aria-label="My Favorite Images">
                    <SplideSlide v-for="perfume, i in perfumes" :key="i">
                        <app-product-card :product="perfume" />
                    </SplideSlide>
                </Splide>
            </v-col>

            <!-- SECTION 4 -->
            
            <v-col cols="12">
                <v-banner
                    lines="one"
                    icon="mdi-shopping"
                    color="primary"
                    rounded
                    class="my-4 bg-primary">
                    <v-banner-text>
                        Далеко-далеко за словесными горами в стране гласных и согласных, живут рыбные тексты.
                    </v-banner-text>
    
                    <template #actions>
                        <v-btn variant="flat" color="white">Action</v-btn>
                    </template>
                </v-banner>
            </v-col>
            
            <!-- SECTION 5 -->

            <v-col cols="12" class="d-flex justify-space-between align-center">
                <span class="text-h4 text-bottom-border">Популярные</span>
                <!-- <div class="d-flex gap-1">
                    <v-btn size="40" color="primary" variant="flat" class="text-none ml-0"><v-icon>mdi-chevron-left</v-icon></v-btn>
                    <v-btn size="40" color="primary" variant="flat" class="text-none ml-0"><v-icon>mdi-chevron-right</v-icon></v-btn>
                </div> -->
            </v-col>
            <v-col cols="12">
                <Splide :options="slideOptions" aria-label="My Favorite Images">
                    <SplideSlide v-for="perfume, i in perfumes" :key="i">
                        <app-product-card :product="perfume" />
                    </SplideSlide>
                </Splide>
            </v-col>
            
            <!-- SECTION 6 -->
            
            <v-col cols="12">
                <v-sheet width="100%" class="pa-4 px-2">
                    <v-list-item v-for="i in 3" :key="i" class="py-3">
                        <template #prepend>
                            <v-avatar size="50" color="primary">
                                Д
                            </v-avatar>
                        </template>
                        <v-list-item-title>Далеко-далеко за словесными горами.</v-list-item-title>
                        <v-list-item-subtitle>Далеко-далеко за, словесными горами в стране гласных и согласных живут рыбные тексты. Переписали, проектах великий ручеек текст ты о переулка коварный даль необходимыми страну букв текстами вопроса деревни там ведущими заголовок. Рукописи напоивший то рыбного заманивший по всей семантика переписали послушавшись последний сих первую грамматики это бросил страну деревни, до парадигматическая ручеек себя.</v-list-item-subtitle>
                    </v-list-item>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import AppCarousel from '../../components/app-carousel.vue'
import AppHomeBrandSliders from '../../components/app-home-brand-sliders.vue'
import AppProductCard from '../../components/app-product-card.vue'
import AppLinksList from '../../components/app-links-list.vue'
import { Splide, SplideSlide, Options } from '@splidejs/vue-splide'
import { IProduct } from '../../interfaces'
import { perfumes } from '../../products'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const mobile = useDisplay().mobile

const page1 = ref(1)
const icons2 = [
    { icon: "mdi-airplane", title: "Free Shipping", subtitle: "lorem ipsum dolor emit" },
    { icon: "mdi-diamond-stone", title: "Jobs Rich Free", subtitle: "lorem ipsum dolor emit" },
    { icon: "mdi-coffee", title: "Support 24/7", subtitle: "lorem ipsum dolor emit" },
    { icon: "mdi-anchor", title: "100% Safe", subtitle: "lorem ipsum dolor emit" },
]
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