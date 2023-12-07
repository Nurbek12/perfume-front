<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="6">
            <v-skeleton-loader :loading="loading" type="image,image,button,button,button,button">
                <v-card flat width="100%" class="pa-2">
                    <v-avatar rounded size="100%">
                        <v-img height="400" width="100%" :src="brand?.image||'/img/nophoto.jpg'"></v-img>
                    </v-avatar>
                </v-card>
            </v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="6">
            <v-skeleton-loader :loading="loading" color="transparent" type="image,image,button,button,button,button">
                <v-card flat width="100%" color="transparent">
                    <v-card-title class="text-primary">{{ brand?.name }}</v-card-title>
                    <v-card-text>
                        {{ brand && brand[`description_${locale}`] }}
                    </v-card-text>
                </v-card>
            </v-skeleton-loader>
        </v-col>
        <v-col cols="12" class="px-1 pb-2 d-flex align-center justify-space-between">
            <span class="text-h5 text-primary">Продукты</span>
            <div class="d-flex gap-1">
                <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" :disabled="prev" @click="page--,init()"><v-icon>mdi-chevron-left</v-icon></v-btn>
                <v-sheet height="40" class="px-2 text-none ml-0 rounded d-flex align-center justify-center text-subtitle-1">{{ perpagetext }}</v-sheet>
                <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" :disabled="next" @click="page++, init()"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </div>
            <!-- <v-pagination density="compact" length="4" variant="flat" active-color="primary"/> -->
        </v-col>
        <!-- <template v-if="loading">
            <v-col cols="12" sm="6" md="4" class="pa-1" v-for="i in 3" :key="i">
                <v-skeleton-loader type="image,article,button,button,button" />
            </v-col>
        </template>
        <template v-if="items.length===0&&!loading">
            <v-col cols="12" class="pa-1 text-center">
                {{ t('no_data') }}
            </v-col>
        </template> -->
        <v-col cols="12" sm="6" md="4" lg="3" class="pa-1" v-for="perfume,i in perfumes" :key="i">
            <app-product-card :product="perfume" />
        </v-col>
    </v-row>
</v-container>
</template>
    
<script lang="ts" setup>
import { ref, computed, defineEmits, onMounted } from 'vue'
import AppProductCard from '../../components/app-product-card.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { IProduct } from '../../interfaces'
import { getProductById } from '../../api/products'
import { useI18n } from 'vue-i18n'
import { perfumes, brands } from '../../products'

const { locale, t } = useI18n()
const brand = ref<any>(null)

const page = ref(1)
const perpage = ref(9)
const totalCount = ref(0)
const next = ref(true)
const prev = ref(true)
const items = ref([])
const loading = ref(false)
const currentImage = ref(0)
const product = ref<IProduct|any>({})

const { params } = useRoute()
const { getters, commit } = useStore()
const cart_item = (id: number) => getters.cart.find((p: any) => p.id === id)
const saved_item = (id: number) => !!getters.saved.find((c: any) => c.id === id)
const save = (item: IProduct) => {
    if(!saved_item(item.id!)) commit('ADD_TO_SAVE', item)
    else commit('REMOVE_TO_SAVE', item)
}

const perpagetext = computed(() => {
    const p = (page.value - 1) * perpage.value;
    return `${p + 1}-${p + items.value.length} / ${totalCount.value}`
})

const init = async () => {
    loading.value = true
    // const { data } = await getProductById(params.id as any, 'expand=images,colors,reviews,category,brand')
    // console.log(data);
    // product.value = data
    brand.value = brands.results[0]
    loading.value = false
}

init()


const emits = defineEmits(['loaded'])
onMounted(() => {
    emits('loaded')
})
</script>