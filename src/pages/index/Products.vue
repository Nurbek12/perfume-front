<template>
  <v-container>
    <v-row>
        <!-- md="5" lg="4" -->
        <v-col cols="12" >
            <v-card width="100%" flat>
                <v-img gradient="">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="4" class="pa-1">
                                <v-text-field v-model="filterParams.title" @click:clear="init" clearable clear-icon="mdi-close" append-inner-icon="mdi-magnify" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Поиск" />
                            </v-col>
                            <v-col cols="12" md="4" class="pa-1">
                                <v-select @click:clear="init" hide-no-data v-model="filterParams.category" :items="getters.categories" :item-title="`name_${locale}`" item-value="id" transition="fade-transition" clear-icon="mdi-close" clearable density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все разделы" />
                            </v-col>
                            <v-col cols="12" md="4" class="pa-1">
                                <v-select @click:clear="init" hide-no-data v-model="filterParams.category_1" :items="child_categories_1" :item-title="`name_${locale}`" item-value="id" transition="fade-transition" clear-icon="mdi-close" clearable density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все подразделы" />
                            </v-col>
                            <v-col cols="12" md="4" class="pa-1">
                                <v-select @click:clear="init" hide-no-data v-model="filterParams.category_2" :items="child_categories_2" :item-title="`name_${locale}`" item-value="id" transition="fade-transition" clear-icon="mdi-close" clearable density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все подразделы" />
                            </v-col>
                            <v-col cols="12" md="3" class="pa-1">
                                <v-select @click:clear="init" hide-no-data v-model="filterParams.brand" item-title="name" :items="getters.brands" item-value="id" transition="fade-transition" clear-icon="mdi-close" clearable density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Все бренды" />
                            </v-col>
                            <v-col cols="6" md="2" class="pa-1">
                                <v-text-field @click:clear="init" clearable clear-icon="mdi-close" v-model="filterParams.min_price" type="number" min="0" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Мин. цена" />
                            </v-col>
                            <v-col cols="6" md="2" class="pa-1">
                                <v-text-field @click:clear="init" clearable clear-icon="mdi-close" v-model="filterParams.max_price" type="number" min="0" density="comfortable" hide-details variant="solo" bg-color="background" flat placeholder="Макс. цена" />
                            </v-col>
                            <!-- <v-col cols="12" class="pt-7">
                                <v-range-slider min="0" :model-value="[50, 250]" max="500" density="compact" color="primary" track-size="4" hide-details thumb-label="always"></v-range-slider>
                            </v-col> -->
                            <v-col cols="12" md="1" class="pa-2">
                                <v-btn color="primary" height="42" variant="flat" block class="text-none" :disabled="filterBtnDisabled" @click="init">
                                    <!-- <span>Посмотреть</span> -->
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- <v-card-actions class="px-4 pb-4">
                    </v-card-actions> -->
                </v-img>
            </v-card>
        </v-col>
        <!-- md="7" lg="8" -->
        <v-col cols="12" >
            <v-row class="px-2">
                <v-col cols="12" class="px-1 pb-2 d-flex align-center justify-space-between">
                    <span class="text-h5 text-primary">Продукты</span>
                    <div class="d-flex gap-1">
                        <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" :disabled="prev" @click="page--,init()"><v-icon>mdi-chevron-left</v-icon></v-btn>
                        <v-sheet height="40" class="px-2 text-none ml-0 rounded d-flex align-center justify-center text-subtitle-1">{{ perpagetext }}</v-sheet>
                        <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" :disabled="next" @click="page++, init()"><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </div>
                    <!-- <v-pagination density="compact" length="4" variant="flat" active-color="primary"/> -->
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
                <v-col cols="12" sm="6" md="4" lg="3" class="pa-1" v-for="perfume,i in items" :key="i">
                    <app-product-card :product="perfume" />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AppProductCard from '../../components/app-product-card.vue'
import { getAllProducts } from '../../api/products'
import { ICategory } from '../../interfaces'
import { ref, computed, reactive, defineEmits, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
// import { products as data } from '../../products'

const router = useRouter()
const { query } = useRoute()
const { locale, t } = useI18n()

const page = ref(1)
const perpage = ref(9)
const totalCount = ref(0)
const next = ref(true)
const prev = ref(true)
const loading = ref(true)
const filterParams = reactive<any>({
    title: '',
    category: query.category ? parseInt(query.category as string) : null,
    category_1: query.category_1 ? parseInt(query.category_1 as string) : null,
    category_2: query.category_2 ? parseInt(query.category_2 as string) : null,
    brand: null,
    min_price: '',
    max_price: ''
})

const items = ref([])
const child_categories_1 = computed(() => {
    if(!filterParams.category) return []
    return getters.categories.find((c: ICategory) => c.id === filterParams.category)?.children || []
})

const child_categories_2 = computed(() => {
    if(!filterParams.category || !filterParams.category_1) return []
    const parent = getters.categories
        .find((c: ICategory) => c.id === filterParams.category)?.children || []

    return parent
        .find((c: ICategory) => c.id === filterParams.category_1)?.children || []
})

const { getters, commit } = useStore()

const perpagetext = computed(() => {
    const p = (page.value - 1) * perpage.value;
    return `${p + 1}-${p + items.value.length} / ${totalCount.value}`
})
const qs = computed(() => {
    const params = new URLSearchParams()
    Object.keys(filterParams).map((key) => {
        if(typeof filterParams[key] === 'string' && !filterParams[key].trim()) return
        if(!!filterParams[key])
            params.append(key, filterParams[key])
    })
    if (page.value) 
        params.append('page', String(page.value))

    if (perpage.value) 
        params.append('limit', String(perpage.value))
    return params.toString()
})
const filterBtnDisabled = computed(() => {
    return Object.values(filterParams).filter(v => {
        if(typeof v === 'string' && !v.trim()) return false
        if(!!v) return !!v
    }).length === 0
})

const init = async () => {
    if(!!query.category) router.replace({ query: {} })
    loading.value = true
    const { data } = await getAllProducts(`expand=images,units,colors&${qs.value}`)
    items.value = data.results as any
    totalCount.value = data.count
    prev.value = !data.previous
    next.value = !data.next
    console.log(data);
    loading.value = false
}

init()

const emits = defineEmits(['loaded'])
onMounted(() => {
    emits('loaded')
})
</script>