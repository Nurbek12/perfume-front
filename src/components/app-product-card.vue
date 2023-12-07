<template>
  <v-card width="100%" flat class="text-center">
    <v-card-text>
        <router-link :to="`/product/${product.id}`">
            <v-avatar size="100%" rounded>
                <v-img :src="product.images?.[0]?.image?.full_size||'/img/nophoto.jpg'" height="170" />
            </v-avatar>
        </router-link>
    </v-card-text>
    <router-link :to="`/product/${product.id}`" class="text-primary text-decoration-none text">
        <v-card-title class="py-0 text-subtitle-1">{{ product.title }}</v-card-title>
    </router-link>
    <!-- balance :  0 brand :  1 category :  6 colors :  [1]:  id :  1 images :  (2) [1, 2] is_gift :  false is_published :  false price :  27000 rating :  "2.00" ratings :  [1] reviews :  [] title :  "Test Product" usage :  "Test Usage" -->
    <v-card-text class="py-0 text-overflow-3">{{ product[`description_en`] }}</v-card-text>
    <v-card-text class="pb-0 pt-2 text-h5 text-primary">{{product.price - (product.price * product.discount / 100)}} {{ t('sum') }} <span v-show="product.discount" class="text-medium-emphasis text-subtitle-1 text-decoration-line-through" style="line-height: 0">{{ product.price }} {{ t('sum') }}</span></v-card-text>
    <v-card-text class="py-0 pt-2">
        <v-rating readonly color="amber" hover :length="5" :size="32" :model-value="(product.rating as any)" active-color="amber" />
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
        <div class="w-100 mr-2">
            <div v-if="!!cart_item(product.id!)" class="w-100 d-flex justify-space-between align-center">
                <v-btn size="40" color="primary" variant="flat" class="text-none" @click="commit('REMOVE_TO_CART', product)"><v-icon>mdi-minus</v-icon></v-btn>
                <div class="d-flex justify-center text-center">{{ cart_item(product.id!).quantity }}</div>
                <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" @click="commit('ADD_TO_CART', product)"><v-icon>mdi-plus</v-icon></v-btn>
            </div>
            <v-btn height="40" block v-else @click="commit('ADD_TO_CART', product)" color="primary" variant="flat" class="text-none">Добавить в корзину</v-btn>
        </div>
        <v-btn @click="save(product)" size="40" color="primary" variant="flat" class="text-none">
            <v-icon>mdi-heart{{saved_item(product.id!)?'':'-outline'}}</v-icon>
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { IProduct } from '../interfaces'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const { getters, commit } = useStore()
const { product } = defineProps<{ product: IProduct }>()
const cart_item = (id: number) => getters.cart.find((p: any) => p.id === id)
const saved_item = (id: number) => !!getters.saved.find((c: any) => c.id === id)

const save = (item: IProduct) => {
    if(!saved_item(item.id!)) commit('ADD_TO_SAVE', item)
    else commit('REMOVE_TO_SAVE', item)
}
</script>