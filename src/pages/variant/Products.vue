<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="4" class="pr-0">
                <v-card flat border>
                    <v-card-text class="text-primary">{{ t('products.search_by_name') }}</v-card-text>
                    <v-card-text class="py-0 pb-1">
                        <v-text-field :placeholder="t('products.search_by_name')" append-inner-icon="mdi-magnify" flat
                            density="compact" class="border rounded" hide-details variant="solo" bg-color="background"
                            color="primary" v-model="filters.search" @update:model-value="setValue('search', $event)"></v-text-field>
                    </v-card-text>
                    <v-card-text class="pb-0 pt-2">
                        <span class="text-primary">{{ t('products.search_by_price') }}</span>
                    </v-card-text>
                    <v-card-text class="pb-0 pt-2 px-3">
                        <v-row class="pa-2">
                            <v-col class="pa-2" cols="6">
                                <v-text-field min="0" v-model="filters.min_price" @update:model-value="setValue('min_price', +$event)" bg-color="background" class="border rounded" type="number" variant="solo" flat hide-details density="compact" :placeholder="t('products.min')"></v-text-field>
                            </v-col>
                            <v-col class="pa-2" cols="6">
                                <v-text-field min="0" v-model="filters.max_price" @update:model-value="setValue('max_price', +$event)" bg-color="background" class="border rounded" type="number" variant="solo" flat hide-details density="compact" :placeholder="t('products.max')"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text class="pb-0">
                        <span class="text-primary">{{ t('products.categories') }}</span>
                    </v-card-text>
                    <v-card-text class="py-0">
                        <v-list
                            :items="(getters.categories as ICategory[])"
                            item-children="children"
                            :item-title="`name_${locale}`"
                            density="compact"
                            nav
                            class="px-0"
                            open-strategy="single"
                            item-value="id"
                            mandatory
                            v-model="filters.category"
                            active-class="text-primary"
                            >
                            <template #title="{title,item}">
                                <span class="font-weight-light text-hover-link" :class="{ 'text-primary': (filters.category as any) === item.id }" @click.stop="setValue('category', item.id)">{{ title }}</span>
                            </template>
                            <template #append="{item, isActive}">
                                <v-icon v-if="item.children!.length">mdi-{{ isActive?'minus':'plus' }}</v-icon>
                            </template>
                        </v-list>
                    </v-card-text>
                    <v-card-text class="py-0">
                        <span class="text-primary">{{ t('products.brands') }}</span>
                    </v-card-text>
                    <v-card-text class="py-0">
                        <v-list density="compact" nav class="px-0" mandatory color="primary">
                            <v-list-item class="py-0" v-for="b,i in getters.brands" :key="i" :active="(filters.brand as any) === b.id" height="25" :value="b.id" link @click="setValue('brand', b.id)">
                                {{ b.name }}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="8" v-if="loading">
                <p class="text-center text-grey font-weight-light">{{ t('loading') }}...</p>
            </v-col>
            <v-col cols="12" sm="8" v-else>
                <v-list class="py-0 px-0" bg-color="background">
                    <p v-if="!loading&&items.length===0" class="text-center text-grey font-weight-light">{{t('no_data')}}</p>
                    <AppProductList v-for="item,i in items" :key="i" :product="item" />
                </v-list>
                <v-pagination density="comfortable" :length="Math.ceil(count/25)" :model-value="+filters.page" @update:model-value="setValue('page', $event)" variant="flat" active-color="primary"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { debounce } from 'lodash'
import { useI18n } from 'vue-i18n'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAllProducts } from '../../api/products'
import { ICategory, IProduct } from '../../interfaces/index.variant'
import AppProductList from '../../components/variant/AppProductList.vue'

const count = ref(0)
const route = useRoute()
const loading = ref(true)
const { getters } = useStore()
const { locale, t } = useI18n()
const items = ref<IProduct[]>([])

const router = useRouter()
const filters = reactive({
    search: route.query.search || '',
    brand: route.query.brand || '',
    category: route.query.category || '',
    min_price:  route.query.min_price || 0,
    max_price: route.query.max_price || 0,
    page: route.query.page || 1,
})

const setValue = (key: keyof typeof filters, value: any) => {
    if(route.query[key] == value) return

    const updatedQuery = { ...route.query };
    if (value === 0 || value === '') delete updatedQuery[key]
    else updatedQuery[key] = value

    filters[key] = value
    // router.replace({ query: {...route.query, [key]: [value]} })
    router.replace({ query: updatedQuery })
    getProducts()
}

const getProducts = debounce(async () => {
    loading.value = true
    items.value = []
    const { data } = await getAllProducts(location.search?location.search+'&expand=images':'?expand=images')
    items.value = data.results
    count.value = data.count
    loading.value = false
}, 500)

getProducts()
</script>