<template>
    <v-container>
      <v-row class="mt-0">
          <v-col cols="12">
              <v-row class="px-1">
                <v-col cols="12" class="pt-0 px-1 d-flex align-center justify-space-between">
                    <span class="text-h5 text-primary">Избранные продукты</span>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pa-1" lg="3" v-for="perfume,i in getters.saved" :key="i">
                    <app-product-card :product="perfume" />
                </v-col>
              </v-row>
          </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { defineEmits, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppProductCard from '../../components/app-product-card.vue'

const { getters } = useStore()
const emits = defineEmits(['loaded'])
onMounted(() => {
    emits('loaded')
})
</script>