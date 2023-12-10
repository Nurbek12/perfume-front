<template>
    <v-container>
      <v-row class="mt-0">
          <v-col cols="12">
              <v-row class="px-1">
                <v-col cols="12" class="pt-0 px-1 d-flex align-center justify-space-between">
                    <span class="text-h5 text-primary">Подарки</span>
                    <div class="d-flex gap-1">
                        <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" disabled><v-icon>mdi-chevron-left</v-icon></v-btn>
                        <v-sheet height="40" class="px-2 text-none ml-0 rounded d-flex align-center justify-center text-subtitle-1">{{ perpagetext }}</v-sheet>
                        <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" disabled><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </div>
                </v-col>
                <template v-if="loading">
                    <v-col cols="12" sm="6" md="4" class="pa-1" v-for="i in 3" :key="i">
                        <v-skeleton-loader type="image,article,button,button,button" />
                    </v-col>
                </template>
                <template v-if="items.length===0&&!loading">
                    <v-col cols="12" sm="6" md="4" class="pa-1">
                        {{ t('no_data') }}
                    </v-col>
                </template>
                <v-col cols="12" sm="6" md="4" class="pa-1" lg="3" v-for="perfume,i in items" :key="i">
                    <app-product-card :product="perfume" />
                </v-col>
              </v-row>
          </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, onMounted } from 'vue'
import AppProductCard from '../../components/app-product-card.vue'
// import { perfumes } from '../../products'
import { getAllGifts } from '../../api/products'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const loading = ref(false)
const page = ref(1)
const items = ref([])
const perpage = ref(12)
const totalCount = ref(0)
const perpagetext = computed(() => {
    const p = (page.value - 1) * perpage.value;
    return `${p + 1}-${p + items.value.length} / ${totalCount.value}`
})

const init = async () => {
    loading.value = true
    const { data } = await getAllGifts(`expand=images,colors,units&page=${page.value}&limit=${perpage.value}`)
    items.value = data.results
    loading.value = false
}

init()

const emits = defineEmits(['loaded'])
onMounted(() => {
    emits('loaded')
})
</script>