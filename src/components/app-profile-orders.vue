<template>
    <v-card flat min-height="500">
        <v-card-title class="text-primary">Покупки</v-card-title>
        <v-card-text>
            <div class="responsive-datatable">
                <v-data-table
                    :items="items"
                    :headers="headers"
                    no-data-text="Пусто"
                    density="comfortable"
                    items-per-page="-1">
                    <template #bottom></template>
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
                </v-data-table>
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const headers = [
    // { title: 'Id', key: 'id', sortable: false },
    { title: 'Способ доставки', key: 'type_delevery', sortable: false },
    // { title: 'Время доставки', key: 'date_delevery', sortable: false },
    { title: 'Кол-во', key: 'count', sortable: false },
    { title: 'Время заказа', key: 'time', sortable: false },
    { title: 'Статус', key: 'status', sortable: false },
    { title: 'Обшая сумма', key: 'total', sortable: false },
]
const items = [
    { id: 1, type_delevery: 'Самовывоз', date_delevery: 'с 09:00 до 12:00', count: 4, time: '12.12.2023 12:12', status: 'в процессе', total: 3225000 },
    { id: 2, type_delevery: 'Не срочная', date_delevery: 'с 09:00 до 12:00', count: 1, time: '10.12.2023 12:12', status: 'отказано', total: 256800 },
]
</script>