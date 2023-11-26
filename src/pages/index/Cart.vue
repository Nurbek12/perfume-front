<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="6" v-if="(getters.cart as any[]).length !== 0">
            <v-card variant="flat">
                <v-card-title class="text-primary">Форма заказа</v-card-title>
                <v-card-text>
                    <v-row class="pa-1">
                        <v-col cols="6" class="pa-2">
                            <v-text-field variant="solo" bg-color="background" flat hide-details density="comfortable" placeholder="Имя и Фамилия">
                                <template #prepend-inner>
                                    <v-icon size="20">mdi-account-outline</v-icon>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" class="pa-2">
                            <v-text-field variant="solo" bg-color="background" flat hide-details density="comfortable" placeholder="Телефон">
                                <template #prepend-inner>
                                    <v-icon size="20">mdi-phone</v-icon>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" class="pa-2">
                            <v-select transition="fade-transition" hide-details density="comfortable" variant="solo" bg-color="background" flat placeholder="Время доставки"
                                :items="['с 09:00 до 12:00','с 12:00 до 15:00','с 15:00 до 18:00','с 18:00 до 21:00']">
                                <template #prepend-inner>
                                    <v-icon size="20">mdi-clock-outline</v-icon>
                                </template>
                            </v-select>
                        </v-col>
                        <v-col cols="6" class="pa-2">
                            <v-select transition="fade-transition" variant="solo" bg-color="background" flat hide-details density="comfortable" placeholder="Способ доставки"
                                :items="['Срочная - 20000 сум (в течение дня)','Не срочная  - 0 сум (в течение 3-х дней)','Самовывоз - 0 сум']">
                                <template #prepend-inner>
                                    <v-icon size="20">mdi-truck-delivery</v-icon>
                                </template>
                            </v-select>
                        </v-col>
                        <v-col cols="12" class="pa-2">
                            <v-textarea variant="solo" bg-color="background" flat hide-details density="comfortable" no-resize placeholder="Адрес доставки">
                                <template #prepend-inner>
                                    <v-icon size="20">mdi-map-marker-outline</v-icon>
                                </template>
                            </v-textarea>
                        </v-col>
                        <v-col cols="12" class="pa-2">
                            <v-btn color="primary" variant="flat" class="text-none">Заказать</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" :sm="(getters.cart as any[]).length === 0 ? 12 : 6">
            <v-card variant="flat">
                <v-card-title class="text-primary">Корзина</v-card-title>
                <v-card-text class="px-0">
                    <div class="responsive-datatable">
                        <v-data-table
                            :headers="headers"
                            item-value="name"
                            items-per-page="-1"
                            no-data-text="Корзина пуста"
                            :items="(getters.cart as any[])"
                            >
                            <template #bottom></template> 
                            <template #item.product="{ item }">
                                <td data-label="Товар">
                                    <v-list-item class="px-0" density="compact" nav>
                                        <!-- <template #prepend>
                                            <v-avatar size="40" rounded>
                                                <v-img :src="item.image"></v-img>
                                            </v-avatar>
                                        </template> -->
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        <!-- <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle> -->
                                    </v-list-item>
                                </td>
                            </template>
                            <template #item.price="{ item }">
                                <td data-label="Цена">
                                    <div class="d-flex">
                                        {{ item.price }}.{{ t('sum') }}<span v-show="!!item.discount" class="text-primary">-{{ item.discount }}%</span>
                                        &nbsp;x{{ item.quantity }}=
                                        {{ (item.discount?item.price - (item.price * item.discount / 100):item.price) * item.quantity }}.{{ t('sum') }}
                                    </div>
                                </td>
                            </template>
                            <template #item.count="{ item }">
                                <td data-label="Кол-во">
                                    <!-- <div class="d-flex gap-1">
                                        <v-btn flat color="primary" size="40" @click="commit('REMOVE_TO_CART', item)"><v-icon>mdi-minus</v-icon></v-btn>
                                        <v-chip flat variant="outlined" color="primary" size="40" class="px-4" label>
                                            {{ item.quantity }}
                                        </v-chip>
                                        <v-btn flat color="primary" size="40" @click="commit('ADD_TO_CART', item)"><v-icon>mdi-plus</v-icon></v-btn>
                                    </div> -->
                                    <div class="d-flex gap-1">
                                        <v-btn flat color="primary" size="40" @click="commit('ADD_TO_CART', item)"><v-icon>mdi-plus</v-icon></v-btn>
                                        <v-btn flat color="primary" size="40" @click="commit('REMOVE_TO_CART', item)"><v-icon>mdi-minus</v-icon></v-btn>
                                        <!-- <v-sheet flat size="40" class="px-4 d-flex justify-center align-center gap-1 rounded" border="">
                                            <div>
                                                {{ item.quantity }}x =
                                                {{ (item.discount?item.price - (item.price * item.discount / 100):item.price) * item.quantity }}$
                                            </div>
                                        </v-sheet> -->
                                    </div>
                                </td>
                            </template>
                            <!-- <template #item.sum="{ item }">
                                <td data-label="Обшая">
                                    <div>
                                        {{ item.quantity }}x =
                                        {{ (item.discount?item.price - (item.price * item.discount / 100):item.price) * item.quantity }} {{ t('sum') }}
                                    </div>
                                    {{ (item.discount?item.price - (item.price * item.discount / 100):item.price) * item.quantity }} $
                                </td>
                            </template> -->
                        </v-data-table>
                    </div>
                </v-card-text>
                <v-card-text class="pt-0 d-flex justify-end">
                    <div class="text-body-1">
                        {{ t('total_sum') }}: {{ getters.total_cart_sum }} {{ t('sum') }}
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { IProduct } from '../../interfaces'

const { t } = useI18n()
const { getters, commit } = useStore()
const headers = [
  { title: "Товар", key: "product", sortable: false },
  { title: "Цена", key: "price", sortable: false },
//   { title: "Обшая", key: "sum", sortable: false },
  { title: "Кол-во", key: "count", sortable: false },
];
</script>

<style>
/* @media screen and (max-width: 768px) {
  .responsive-table .v-table {
    width: 100%;
    overflow-x: auto;
  }

  .responsive-table .v-table-header {
    display: none;
  }

  .responsive-table .v-table-body {
    display: block;
  }

  .responsive-table .v-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  .responsive-table .v-table-cell {
    flex: 1 0 100%;
    padding: 8px;
  }
} */
</style>