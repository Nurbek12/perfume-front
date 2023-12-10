<template>
    <v-card flat min-height="500">
        <v-card-title class="text-primary">Покупки</v-card-title>
        <v-card-text class="px-0">
            <div class="responsive-datatable">
                <v-data-table
                    :items="items"
                    :headers="headers"
                    no-data-text="Пусто"
                    density="comfortable"
                    items-per-page="-1">
                    <template #bottom></template>
                    <template #item.type_delevery="{ item, column }">
                        <td :data-label="column.title">
                            {{ item.type_delevery }}
                        </td>
                    </template>
                    <template #item.date_delevery="{ item, column }">
                        <td :data-label="column.title">
                            {{ item.date_delevery }}
                        </td>
                    </template>
                    <template #item.count="{ item, column }">
                        <td :data-label="column.title">
                            <v-btn color="primary" density="comfortable" flat @click="dialog=!dialog">
                                <!-- <div class="d-flex align-center gap-1"> -->
                                    {{ item.count }}
                                    <v-icon style="margin-top: 2px;" class="ml-1">mdi-view-list</v-icon>
                                <!-- </div> -->
                            </v-btn>
                        </td>
                    </template>
                    <template #item.time="{ item, column }">
                        <td :data-label="column.title">
                            {{ item.time }}
                        </td>
                    </template>
                    <!-- <template #item.address="{ item, column }">
                        <td :data-label="column.title">
                            {{ item.count }}
                        </td>
                    </template> -->
                    <template #item.status="{ item, column }">
                        <td :data-label="column.title">
                            <v-chip label :color="item.status[0]==='в'?'green':'red'" variant="flat" density="comfortable">
                                {{ item.status }}
                            </v-chip>
                        </td>
                    </template>
                    <template #item.total="{ item, column }">
                        <td :data-label="column.title">
                            {{ item.total }} {{ t('sum') }}
                        </td>
                    </template>
                    <template #item.cancel="{ item, column }">
                        <td :data-label="column.title">
                            <v-btn color="red" size="35" flat>
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </div>
        </v-card-text>
        <v-dialog v-model="dialog" max-width="500" width="100%">
            <v-card>
                <v-card-title class="text-primary">Продукты</v-card-title>
                <v-card-text class="pa-0">
                <div class="responsive-datatable">
                    <v-data-table
                        density="compact"
                        :headers="productHeaders"
                        :items="products"
                        :no-data-text="t('no_data')"
                        items-per-page="-1">
                        <template #bottom></template>
                        <template #item.color="{ item, column }">
                            <td :data-label="column.title">
                                <v-chip v-if="item.color" density="comfortable" :color="item.color?.hex" variant="flat" label>{{ item.color.name }}</v-chip>
                            </td>
                        </template>
                        <template #item.title="{ item, column }">
                            <td :data-label="column.title">{{ item.title }}</td>
                        </template>
                        <template #item.count="{ item, column }">
                            <td :data-label="column.title">{{ item.count }}</td>
                        </template>
                    </v-data-table>
                </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { getMyOrders } from '../api/orders'

const dialog = ref(false)
const { getters } = useStore()
const { t } = useI18n()
const headers = [
    { title: 'Способ доставки', key: 'type_delevery', sortable: false },
    // { title: 'Время доставки', key: 'date_delevery', sortable: false },
    { title: 'Продукты', key: 'count', sortable: false },
    { title: 'Время заказа', key: 'time', sortable: false },
    { title: 'Статус', key: 'status', sortable: false },
    { title: 'Обшая сумма', key: 'total', sortable: false },
    { title: 'Отказать', key: 'cancel', sortable: false },
]
const productHeaders = [
    { title: 'Продукт', key: 'title', sortable: false },
    { title: 'Кол-во', key: 'count', sortable: false },
    { title: 'Цвет', key: 'color', sortable: false },
]
const products = [
    { title: "Dior J'adore", count: 4, color: {"name": "Red", "hex": "#FF0000"} },
    { title: 'Yves Saint Laurent Black Opium', count: 2, color: {"name": "Yellow", "hex": "#FFFF00"} },
    { title: 'Gucci Guilty Pour Femme', count: 1, color: null },
    { title: 'Calvin Klein Euphoria', count: 2, color: {"name": "Blue", "hex": "#0000FF"} },
]
const items = ref([
    { id: 1, type_delevery: 'Самовывоз', date_delevery: 'с 09:00 до 12:00', count: 4, time: '12.12.2023 12:12', status: 'в процессе', total: 3225000 },
    { id: 2, type_delevery: 'Не срочная', date_delevery: 'с 09:00 до 12:00', count: 1, time: '10.12.2023 12:12', status: 'отказано', total: 256800 },
])

const init = async () => {
    const { data } = await getMyOrders(getters.user.id)

    console.log(data);
}

// if(!!getters.user?.id) init()
</script>