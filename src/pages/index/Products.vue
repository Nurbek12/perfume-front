<template>
  <v-container>
    <v-row>
        <v-col cols="12" md="5" lg="4">
            <v-card width="100%" flat>
                <v-img gradient="">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-text-field append-inner-icon="mdi-magnify" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Поиск" />
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <v-select transition="fade-transition" clear-icon="mdi-close" clearable :items="categories" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все разделы" />
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <v-select transition="fade-transition" clear-icon="mdi-close" clearable :items="categories" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все подразделы" />
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <v-select transition="fade-transition" clear-icon="mdi-close" clearable :items="categories" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все подразделы" />
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <v-select transition="fade-transition" clear-icon="mdi-close" clearable  :items="categories" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все бренды" />
                            </v-col>
                            <v-col cols="6" class="pb-0 pr-1">
                                <v-text-field type="number" min="0" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Мин. цена" />
                            </v-col>
                            <v-col cols="6" class="pb-0 pl-1">
                                <v-text-field type="number" min="0" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Макс. цена" />
                            </v-col>
                            <!-- <v-col cols="12" class="pt-7">
                                <v-range-slider min="0" :model-value="[50, 250]" max="500" density="compact" color="primary" track-size="4" hide-details thumb-label="always"></v-range-slider>
                            </v-col> -->
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="px-4 pb-4">
                        <v-btn color="primary" height="42" variant="flat" block class="text-none">
                            <span>Посмотреть</span>
                        </v-btn>
                    </v-card-actions>
                </v-img>
            </v-card>
        </v-col>
        <v-col cols="12" md="7" lg="8">
            <v-row class="px-2">
                <v-col cols="12" class="px-1 d-flex align-center justify-space-between">
                    <span class="text-h5 text-primary">Продукты</span>
                    <div class="d-flex gap-1">
                        <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" disabled><v-icon>mdi-chevron-left</v-icon></v-btn>
                        <v-sheet height="40" class="px-2 text-none ml-0 rounded d-flex align-center justify-center text-subtitle-1">1 / 3</v-sheet>
                        <v-btn size="40" color="primary" variant="flat" class="text-none ml-0"><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </div>
                    <!-- <v-pagination density="compact" length="4" variant="flat" active-color="primary"/> -->
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pa-1" v-for="perfume,i in perfumes.slice(0, 9)" :key="i">
                    <app-product-card :product="perfume" />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AppProductCard from '../../components/app-product-card.vue'
import { perfumes } from '../../products'
import { useStore } from 'vuex'

const categories = ["Макияж","Уход", "Аксессуары", "Подарки", "Бренды", "Скидки"]

const { getters, commit } = useStore()
const cart_item = (id: number) => getters.cart.find((p: any) => p.id === id)
</script>