<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="6">
            <v-card flat>
                <v-img height="400" width="100%" :src="product.image"></v-img>
                <v-card-actions class="px-0">
                    <v-slide-group
                        v-model="currentImage"
                        class="pa-4"
                        selected-class="bg-primary"
                        show-arrows>
                        <v-slide-group-item v-slot="{ isSelected, toggle }"
                            v-for="n in 15" :key="n">
                            <v-avatar size="50" rounded @click="toggle" :color="!isSelected?'grey-lighten-3':'primary'" class="mx-1 pa-1">
                                <v-img :src="product.image" cover></v-img>
                            </v-avatar>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6">
            <v-card variant="text">
                <span class="text-primary text-subtitle-1">Perfume Brand</span>
                <v-card-title class="pa-0">{{ product.title }}</v-card-title>
                <v-card-text class="px-0 py-2">{{ product.description }}</v-card-text>
                <v-card-text class="px-0 py-2">        
                    <v-breadcrumbs :items="items" density="compact" class="pa-0">
                        <template v-slot:divider>
                            <v-icon icon="mdi-chevron-right"></v-icon>
                        </template>
                    </v-breadcrumbs>
                </v-card-text>
                <v-card-text class="px-0 pt-2 pb-0">
                    <v-radio-group inline>
                        <v-radio
                            v-for="c, i in colors"
                            :key="i"
                            density="compact"
                            class="text-caption"
                            :label="c.name"
                            :color="c.code"
                            :base-color="c.code"
                            :value="c.name" />
                    </v-radio-group>
                    <!-- <v-btn-toggle shaped mandatory :model-value="0">
                        <v-btn v-for="c, j in ['#ff0','#00f','#f00']" :key="j" :color="c" size="40" variant="flat"></v-btn>
                    </v-btn-toggle> -->
                </v-card-text>
                <v-card-text class="px-0 pb-2 pt-0">
                    <v-rating readonly color="amber" hover :length="5" :size="32" :model-value="(product.rate as any)" active-color="amber" />
                </v-card-text>
                <v-card-text class="pb-0 pt-2 pl-0 text-h5 text-primary">
                    {{product.price - (product.price * product.discount / 100)}} $
                    <span v-show="product.discount" class="text-medium-emphasis text-subtitle-1 text-decoration-line-through" style="line-height: 0">
                        {{ product.price }} $
                    </span>
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
                        <v-window-item v-for="n in 2" :key="n" :value="n">
                            <div class="py-2">
                                Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Взобравшись, текст дорогу выйти эта великий одна скатился большой приставка что, имеет дороге даль всеми бросил буквоград то города.
                            </div>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-sheet width="100%" class="pa-4 px-2">
                <span class="pl-4 text-h5">Отзывы</span>
                <v-list-item v-for="i in 3" :key="i" class="py-3">
                    <template #prepend>
                        <v-avatar size="40" color="primary">
                            А
                        </v-avatar>
                    </template>
                    <v-list-item-title>Анна Николаевна</v-list-item-title>
                    <v-list-item-subtitle>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Реторический текстов власти о силуэт выйти океана коварных снова страна?</v-list-item-subtitle>
                </v-list-item>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { perfumes } from '../../products'
import { IProduct } from '../../interfaces'

const currentImage = ref(0)
const items = [
{
    title: 'Макияж',
    disabled: false,
},
{
    title: 'Для лица',
    disabled: false,
},
{
    title: 'Тональные средства',
    disabled: true,
},
]
const colors = [
    { name: 'Желтый', code: '#ee0' },
    { name: 'Синый', code: '#00f' },
    { name: 'Фиолетовый', code: '#f0f' },
]

const tab = ref(1)
const { params } = useRoute()
const { getters, commit } = useStore()
const cart_item = (id: number) => getters.cart.find((p: any) => p.id === id)
const saved_item = (id: number) => !!getters.saved.find((c: any) => c.id === id)
const save = (item: IProduct) => {
    if(!saved_item(item.id!)) commit('ADD_TO_SAVE', item)
    else commit('REMOVE_TO_SAVE', item)
}

const product = computed(() => {
    return perfumes.find((p: IProduct) => p.id === Number(params.id))
})
</script>