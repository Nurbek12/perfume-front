<template>
    <v-card border flat theme="light" class="pt-2">
        <v-img width="100%" height="200" :alt="item.title_ru+' image'" :src="item?.images?.[0]?.medium_square_crop||'/img/nophoto.jpg'"></v-img>
        <v-divider class="mb-1"></v-divider>
        <router-link :to="`/product/${item.id}`" class="px-3 text-decoration-none font-weight-medium text-subtitle-1 py-1 text-primary">{{ item?.[`title_${locale as 'uz'}`] }}</router-link>
        <v-card-text class="py-1 px-3"><span class="font-weight-medium">{{ t('products.price') }}:</span> {{ item?.price }} $</v-card-text>
        <v-card-text class="py-1 px-3"><span class="font-weight-medium">{{ t('products.brand') }}:</span> {{ item?.brand.name }}</v-card-text>
        <v-card-text class="py-1 px-3"><span class="font-weight-medium">{{ t('products.shipping') }}:</span> {{ countries[item.shipping_from]?.name }}</v-card-text>
        <v-card-text class="py-1 px-3"><span class="font-weight-medium">{{ t('products.model') }}:</span> {{ item.model }}</v-card-text>
        <v-card-text class="py-1 px-3"><span class="font-weight-medium">{{ t('products.warranty') }}:</span> {{ item.warranty }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3 d-flex align-center justify-space-between">
            <div class="d-flex align-center">
                <span  class="font-weight-medium mr-2">{{ t('products.rate') }}:</span>
                <v-rating readonly model-value="0" half-increments density="compact" color="amber" size="small"></v-rating>
            </div>
            <v-btn @click="save(item)"  variant="flat" size="40" color="primary" class="text-none">
                <v-icon>mdi-heart{{ saved_item(item.id!) ? '' : '-outline' }}</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { countries } from '../../assets/countries'
import { IProduct } from '../../interfaces/index.variant'

const { locale, t } = useI18n()
const { getters, commit } = useStore()

const saved_item = (id: number) => !!getters.saved.find((c: any) => c.id === id)
const save = (item: any) => {
    if (!saved_item(item.id!)) commit('ADD_TO_SAVE', item)
    else commit('REMOVE_TO_SAVE', item)
}
const { item } = defineProps<{ item: IProduct }>()
</script>