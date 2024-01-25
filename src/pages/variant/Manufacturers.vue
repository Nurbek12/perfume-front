<template>
    <v-container>
        <v-row>
            <v-col cols="12" v-show="(getters.brands as IBrand[]).length === 0">{{ t('no_data') }}...</v-col>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item, i in (getters.brands as IBrand[])" :key="i">
                <AppBrandItem :brand="item" :n="i" @open-this="open_this(i)"/>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="600">
            <v-card v-if="(getters.brands as IBrand[])[index]">
                <v-card-text class="px-3">
                    <v-list-item>
                        <template #prepend>
                            <v-avatar rounded size="100">
                                <v-img :alt="(getters.brands as IBrand[])[index]?.name" :src="(getters.brands as IBrand[])[index].medium_square_crop||'/img/nophoto.jpg'"></v-img>
                            </v-avatar>
                        </template>
                        <template #title>{{ (getters.brands as IBrand[])[index].name }}</template>
                        <template #subtitle>
                            <div class="d-flex gap-1 align-center">
                                <v-avatar size="25" rounded>
                                    <v-img alt="flag" :src="countries[(getters.brands as IBrand[])[index].country!].flag"></v-img>
                                </v-avatar>
                                <span>{{ countries[(getters.brands as IBrand[])[index].country!].name }}</span>
                            </div>
                        </template>
                    </v-list-item>
                    <v-card-text class="px-3">
                        {{ (getters.brands as IBrand[])[index][`description_${locale as 'uz'}`] }}
                    </v-card-text>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '@unhead/vue'
import { countries } from '../../assets/countries'
import { IBrand } from '../../interfaces/index.variant'
import AppBrandItem from '../../components/variant/AppBrandItem.vue'

useHead({
    title: "Лучшие Бренды Медицинского Оборудования",
    meta: [
        {name: "description", content: "Исследуйте лучшие бренды медицинского оборудования. Надежные производители с высоким качеством и инновационными технологиями. Подберите оптимальное оборудование для вашей медицинской практики."},
        {name: "keywords", content: "бренды медицинского оборудования, производители здравоохранения, медтехника, инновационные медицинские устройства, выбор профессионалов, обзор брендов"},
    ]
})
const { getters } = useStore()
const { locale, t } = useI18n()
const dialog = ref(false)
const index = ref<number>(0)

const open_this = (i: number) => {
    dialog.value = true
    index.value = i
}
</script>