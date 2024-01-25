<template>
    <v-list-item theme="light" variant="flat" color="surface" link :to="`/product/${product!.id}`" border lines="three" rounded class="mb-3 pa-2">
        <template #prepend>
            <v-avatar size="150" rounded color="grey-lighten-3">
                <v-img :alt="product?.title_uz +' image'" :src="product?.images?.[0]?.medium_square_crop || '/img/nophoto.jpg'"></v-img>
            </v-avatar>
        </template>
        <v-list-item-title class="text-primary text-body-2">{{ product!.brand.name }}</v-list-item-title>
        <v-list-item-title>{{ product![`title_${locale}`] }}</v-list-item-title>
        <v-list-item-subtitle class="text-caption">{{ product![`description_${locale}`] }}</v-list-item-subtitle>
        <v-list-item-title>
            <v-rating readonly model-value="0" half-increments density="compact" color="amber" size="small"></v-rating>
        </v-list-item-title>
        <v-list-item-title class="text-body-1">{{ product!.price }} $</v-list-item-title>
    </v-list-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
// import { baseURL } from '../../api'

const { locale } = useI18n()
const { product } = defineProps({
    product: {
        type: Object,
    }
})
</script>