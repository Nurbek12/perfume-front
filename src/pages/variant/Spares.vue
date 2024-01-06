<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card border flat>
                    <v-card-text class="d-flex gap-1 align-center">
                        <router-link to="#" class="text-decoration-none text-black text-hover-link">Медицинское Оборудование</router-link> /
                        <router-link to="#" class="text-decoration-none text-black text-hover-link">Анестезиологическое Оборудование/реанимация</router-link> /
                        <router-link to="#" class="text-decoration-none text-black text-hover-link">Аппараты Гемодиализа</router-link>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card flat border>
                    <v-card-text class="text-primary">Филтр</v-card-text>
                    <v-card-text class="pt-0 pb-1">
                        <v-text-field placeholder="Искать по назавыние..." append-inner-icon="mdi-magnify" flat
                            density="compact" hide-details variant="solo" bg-color="background"
                            color="primary" v-model="search"></v-text-field>
                    </v-card-text>
                    <v-card-text class="pt-0 pb-0">
                        <v-list
                            :items="categories"
                            item-children="children"
                            item-title="name"
                            density="compact"
                            nav
                            class="px-0"
                            open-strategy="single"
                            item-value="_id"
                            active-class="text-primary"
                            @click:open="open"
                            >
                        <template #title="{title}">
                            {{ title }}
                        </template>
                        <template #append="{item, isActive}">
                            <v-icon v-if="item.children.length">mdi-{{ isActive?'minus':'plus' }}</v-icon>
                        </template>
                    </v-list>
                    <!-- <template></template> -->
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="8">
                <v-list class="py-0" bg-color="background">
                    <!-- <AppProductList v-for="i in 12" :key="i" :title="`Product title ${i}`" /> -->
                </v-list>
                <v-pagination length="12" variant="flat" active-color="primary"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppProductList from '../../components/variant/AppProductList.vue'

const router = useRouter()
const search = ref('')
const open = (e: { id: unknown|number, path: unknown[]|number[], value: boolean }) => {
    const query: any = {}
    e.path.map((p, i) => query[['category','category_1','category_2'][i]] = p)
    router.replace({ query })
}

const breadLinks = [
    { title: 'Dashboard', disabled: false, href: 'breadcrumbs_dashboard' },
    { title: 'Link 1', disabled: false, href: 'breadcrumbs_link_1' },
    { title: 'Link 2', disabled: true, href: 'breadcrumbs_link_2' },
]

const categories = [
{
        name: "Диагностическое оборудование",
        id: 1,
        children: [
            {
                name: "Имиджинг",
                id: 101,
                children: [
                    { name: "Рентген-аппараты", id: 10101, children: [] },
                    { name: "МРТ-сканеры", id: 10102, children: [] },
                    { name: "УЗИ-аппараты", id: 10103, children: [] },
                ],
            },
            {
                name: "Лабораторное оборудование",
                id: 102,
                children: [
                    { name: "Химические анализаторы", id: 10201, children: [] },
                    { name: "Гематологические анализаторы", id: 10202, children: [] },
                    { name: "Микроскопы", id: 10203, children: [] },
                ],
            },
        ],
    },
    {
        name: "Хирургическое оборудование",
        id: 2,
        children: [
            {
                name: "Инструменты",
                id: 201,
                children: [
                    { name: "Скальпели и ножи", id: 20101, children: [] },
                    { name: "Зажимы и пинцеты", id: 20102, children: [] },
                    { name: "Электрохирургическое оборудование", id: 20103, children: [] },
                ],
            },
            {
                name: "Аппараты для хирургических вмешательств",
                id: 202,
                children: [
                    { name: "Хирургические лазеры", id: 20201, children: [] },
                    { name: "Эндоскопы", id: 20202, children: [] },
                    { name: "Хирургические столы", id: 20203, children: [] },
                ],
            },
        ],
    },
    {
        name: "Стационарное оборудование",
        id: 3,
        children: [
            {
                name: "Медицинские койки",
                id: 301,
                children: [
                    { name: "Электрические койки", id: 30101, children: [] },
                    { name: "Механические койки", id: 30102, children: [] },
                    { name: "Подъемные койки", id: 30103, children: [] },
                ],
            },
            {
                name: "Медицинские шкафы и стеллажи",
                id: 302,
                children: [
                    { name: "Шкафы для медикаментов", id: 30201, children: [] },
                    { name: "Стеллажи для медицинских документов", id: 30202, children: [] },
                ],
            },
        ],
    },
    {
        name: "Медицинское оборудование",
        id: 4,
        children: [
            // Уровень 2
            {
                name: "Диагностическое оборудование",
                id: 42,
                children: [
                    // Уровень 3
                    {
                        name: "Ультразвуковое оборудование",
                        id: 43,
                        children: []
                    },
                    {
                        name: "Рентгеновское оборудование",
                        id: 44,
                        children: []
                    },
                    {
                        name: "Кардиологическое оборудование",
                        id: 45,
                        children: []
                    },
                ],
            },
            // Уровень 2
            {
                name: "Терапевтическое оборудование",
                id: 46,
                children: [
                    // Уровень 3
                    {
                        name: "Аппараты для измерения давления",
                        id: 47,
                        children: []
                    },
                    {
                        name: "Фонендоскопы",
                        id: 48,
                        children: []
                    },
                    {
                        name: "Аппараты для кислородной терапии",
                        id: 49,
                        children: []
                    },
                ],
            },
            // Уровень 2
            {
                name: "Хирургическое оборудование",
                id: 410,
                children: [
                    // Уровень 3
                    {
                        name: "Скальпели",
                        id: 411,
                        children: []
                    },
                    {
                        name: "Ножницы",
                        id: 412,
                        children: []
                    },
                    {
                        name: "Шприцы",
                        id: 413,
                        children: []
                    },
                ],
            },
            // Уровень 2
            {
                name: "Лабораторное оборудование",
                id: 414,
                children: [
                    // Уровень 3
                    {
                        name: "Анализаторы крови",
                        id: 415,
                        children: []
                    },
                    {
                        name: "Микротомы",
                        id: 416,
                        children: []
                    },
                    {
                        name: "Инкубаторы",
                        id: 417,
                        children: []
                    },
                ],
            },
            // Уровень 2
            {
                name: "Транспортное оборудование",
                id: 418,
                children: [
                    // Уровень 3
                    {
                        name: "Кровати",
                        id: 419,
                        children: []
                    },
                    {
                        name: "Кушетки",
                        id: 420,
                        children: []
                    },
                    {
                        name: "Мебельные комплекты",
                        id: 421,
                        children: []
                    },
                ],
            },
        ],
    }
]
</script>