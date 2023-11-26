<template>
  <v-navigation-drawer temporary :model-value="drawer" width="350" @update:modelValue="$emit('close-cart')" location="right">
    <v-list>
        <v-list-item v-for="c in getters.cart" :key="c.id">
            <template #prepend>
                <v-avatar size="60" color="grey-lighten-3" rounded>
                    <v-img :src="c.image"></v-img>
                </v-avatar>
            </template>
            <v-list-item-title class="text-primary">{{ c.title }}</v-list-item-title>
            <v-list-item-subtitle>
                {{ c.quantity }} x {{c.discount?c.price - (c.price * c.discount / 100):c.price}}$ = {{ (c.discount?c.price - (c.price * c.discount / 100):c.price) * c.quantity }}$
            </v-list-item-subtitle>
            <div class="d-flex justify-start aling-center">
                <v-btn size="25" color="primary"><v-icon>mdi-minus</v-icon></v-btn>
                <v-btn size="25" class="ml-1" color="primary"><v-icon>mdi-minus</v-icon></v-btn>
            </div>
        </v-list-item>
    </v-list>
    <template #append>
        <div class="pa-2">
            <v-btn block color="primary" class="text-none">Платить ({{getters.total_cart_sum}} $)</v-btn>
        </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { defineProps, toRef } from 'vue'
import { useStore } from 'vuex'

const { getters } = useStore()
const props = defineProps<{drawer: boolean}>()
const drawer = toRef(props, 'drawer')
</script>