<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="6">
            <v-skeleton-loader :loading="loading" type="image,image,button,button,button,button">
                <v-card flat width="100%">
                    <v-avatar rounded size="100%">
                        <v-img height="400" width="100%" :src="images?.[currentImage]?.image?.full_size||'/img/nophoto.jpg'"></v-img>
                    </v-avatar>
                    <v-card-actions class="px-0">
                        <v-slide-group
                            v-model="currentImage"
                            class="pa-4" mandatory
                            selected-class="bg-primary"
                            show-arrows>
                            <v-slide-group-item v-slot="{ isSelected, toggle }"
                            v-for="image, i in images" :key="i">
                                <v-avatar size="50" rounded @click="toggle" :color="!isSelected?'grey-lighten-3':'primary'" class="mx-1 pa-1">
                                    <v-img :src="image.image.thumbnail||'/img/nophoto.jpg'" cover></v-img>
                                </v-avatar>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-card-actions>
                </v-card>
            </v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="6">
            <v-skeleton-loader :loading="loading" type="article, avatar, text, paragraph" min-height="100%" color="transparent">
                <v-card variant="text">
                    <span class="text-primary text-subtitle-1">{{ product?.brand?.name }}</span>
                    <v-card-title class="pa-0">{{ product?.title }}</v-card-title>
                    <!-- <v-card-text class="px-0 py-2">{{ product.description }}</v-card-text> -->
                    <v-card-text class="px-0 py-2">        
                        <!-- <v-breadcrumbs :items="items" density="compact" class="pa-0">
                            <template v-slot:divider>
                                <v-icon icon="mdi-chevron-right"></v-icon>
                            </template>
                        </v-breadcrumbs> -->
                        <div class="d-flex align-center gap-1">
                            <span>{{ product?.category?.[`name_${locale as 'uz'|'en'|'ru'}`] }}</span>
                            <v-icon v-if="!!product?.category?.children?.[0]">mdi-chevron-right</v-icon>
                            <span>{{ product?.category?.children?.[0]?.[`name_${locale as 'uz'|'en'|'ru'}`] }}</span>
                            <v-icon v-if="!!product?.category.children?.[0]?.children?.[0]">mdi-chevron-right</v-icon>
                            <span class="text-disabled">{{ product?.category.children?.[0]?.children?.[0]?.[`name_${locale as 'uz'|'en'|'ru'}`] }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text class="px-0 pt-2 pb-0">
                        <v-radio-group hide-details inline v-model="selectedColor">
                            <v-radio
                                v-for="c in product?.colors"
                                :key="c.id"
                                density="compact"
                                v-show="c.name !== 'No Color'"
                                class="text-caption"
                                :label="c.name"
                                :color="c.hex"
                                @change="setColor(c.id)"
                                :base-color="c.hex"
                                :value="c.id" />
                        </v-radio-group>
                        <!-- <v-btn-toggle shaped mandatory :model-value="0">
                            <v-btn v-for="c, j in ['#ff0','#00f','#f00']" :key="j" :color="c" size="40" variant="flat"></v-btn>
                        </v-btn-toggle> -->
                    </v-card-text>
                    <v-card-text class="px-0 pb-2 pt-0">
                        <v-rating readonly color="amber" half-increments :length="5" :size="32" :model-value="(product.rating as any)" active-color="amber" />
                    </v-card-text>
                    <v-card-text class="pb-0 pt-2 pl-0 text-h5 text-primary">
                        {{product?.price! - (product?.price! * product?.discount! / 100)}}
                        <span v-show="product?.discount" class="text-medium-emphasis text-subtitle-1 text-decoration-line-through" style="line-height: 0">
                            {{ product?.price }}
                        </span>
                        {{ t('sum') }}
                    </v-card-text>
                    <v-card-text class="px-0 pt-4">
                        <div class="w-sm-50 w-100 d-flex justify-space-between">
                            <div class="mr-2" style="max-width: 200px; width: 100%;">
                                <div v-if="!!cart_item(product.id!)" class="w-100 d-flex justify-space-between align-center">
                                    <v-btn size="40" color="primary" variant="flat" class="text-none" @click="commit('REMOVE_TO_CART', product)"><v-icon>mdi-minus</v-icon></v-btn>
                                    <div class="d-flex justify-center text-center">{{ cart_item(product.id!).quantity }}</div>
                                    <v-btn size="40" color="primary" variant="flat" class="text-none ml-0" @click="commit('ADD_TO_CART', product)"><v-icon>mdi-plus</v-icon></v-btn>
                                </div>
                                <v-btn height="40" block v-else @click="commit('ADD_TO_CART', product)" color="primary" variant="flat" class="text-none">Добавить в корзину</v-btn>
                            </div>
                            <v-btn @click="save(product)" size="40" color="primary" variant="flat" class="text-none">
                                <v-icon>mdi-heart{{saved_item(product.id)?'':'-outline'}}</v-icon>
                            </v-btn>
                        </div>
                    </v-card-text>
                    <v-card-text class="pa-0">
                        <v-tabs v-model="tab" density="compact" color="primary">
                            <v-tab :value="1">Описание</v-tab>
                            <v-tab :value="2">Применение</v-tab>
                        </v-tabs>
                        <v-window v-model="tab">
                            <v-window-item v-for="k,i in ['description_', 'usage_']" :value="i+1">
                                <div class="py-2">
                                    {{ product[k+locale] }}
                                </div>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-skeleton-loader>
        </v-col>
        <v-col cols="12">
            <v-skeleton-loader :loading="loading" type="sentences,avatar, paragraph" min-height="100%">
                <v-sheet width="100%" class="py-4 px-2">
                    <div class="d-flex align-center justify-space-between">
                        <span class="pl-2 text-h5 text-primary">Отзывы ({{ product?.ratings?.length }})</span>
                        <v-btn :disabled="disableCommentButton" v-if="getters.isLogged" @click="dialog=true" size="35" color="primary" variant="flat">
                            <v-icon>mdi-chat-outline</v-icon>
                        </v-btn>
                    </div>
                    <v-list-item v-for="r,i in (product?.ratings as IReview[])" :key="i" class="py-3 px-3">
                        <v-list-item-title class="d-flex">
                            <span class="mr-2">{{ r.user.first_name }}</span>
                            <span class="mt-0">
                                <v-rating :model-value="r.rate" readonly :length="5" size="small" density="compact" color="amber"></v-rating>
                            </span>
                        </v-list-item-title>
                        <p class="text-caption pl-2">{{ r.review }}</p>
                        <v-list-item-subtitle class="my-1 d-flex justify-end text-caption">{{ r.date }}</v-list-item-subtitle>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-sheet>
            </v-skeleton-loader>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="450" width="100%">
        <v-card>
            <v-card-title class="text-primary">Отправить отзыв</v-card-title>
            <v-card-text class="py-3">
                <v-row>
                    <v-col cols="12">
                        <v-textarea v-model="review.review" placeholder="Напишите отзыв" no-resize hide-details density="comfortable" variant="outlined" />
                    </v-col>
                    <v-col cols="6">
                        <v-rating v-model="review.rate" hover :length="5" density="compact" color="amber"></v-rating>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-end">
                        <v-btn @click="handleReview" color="primary">Отправить</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, defineEmits, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// import { productid } from '../../products'
import { IProduct, IProductUnit, IReview } from '../../interfaces'
import { getProductById, createReview } from '../../api/products'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const dialog = ref(false)
const loading = ref(false)
const currentImage = ref(0)
const selectedColor = ref(0)
const product = ref<IProduct|any>({})
const review = reactive({
    review: "",
    rate: 0
})

const tab = ref(1)
const { params } = useRoute()
const { getters, commit } = useStore()
const cart_item = (id: number) => getters.cart.find((p: any) => p.id === id)
const saved_item = (id: number) => !!getters.saved.find((c: any) => c.id === id)
const save = (item: IProduct) => {
    if(!saved_item(item.id!)) commit('ADD_TO_SAVE', item)
    else commit('REMOVE_TO_SAVE', item)
}

const disableCommentButton = computed(() => {
    return product.value.ratings.some((r: any) => r.user.id === getters.user.id)
})

const images = computed(() => {
    if(!!selectedColor.value) return [product.value?.units?.find((c: any) => c.color === selectedColor.value)]
    else return product.value?.images
})

const setColor = (colorid: number) => {
    const c: IProductUnit = product.value?.units.find((u: IProductUnit) => u.color === colorid)!
    if(!c) return
    commit('SET_COLOR_CART', [product.value, c.id])
}

const init = async () => {
    loading.value = true
    const { data } = await getProductById(params.id as any, 'expand=images,colors,ratings,category,brand,units')
    // console.log(data);
    product.value = data
    // product.value = productid
    loading.value = false
    console.log(data);
    if(product.value.colors.length>0 && product.value.colors[0].name!=='No Color') selectedColor.value = product.value.colors[0].id
}

const handleReview = async () => {
    const { data } = await createReview({
        user: getters.user.id as any,
        product: parseInt(params.id as string),
        ...review,
    })
    console.log(data);
    dialog.value = false
    alert('Succesfully rated!')
}

init()

const emits = defineEmits(['loaded'])
onMounted(() => {
    emits('loaded')
})

</script>