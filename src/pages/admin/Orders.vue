<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
        <v-col cols="12" sm="6" md="4" class="pb-0">
            <v-text-field bg-color="surface" @update:modelValue="debounceSearch" placeholder="Search" append-inner-icon="mdi-magnify" hide-details flat density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-card flat border="">
                <v-card-title class="px-4 pt-3 font-weight-light">Покупки</v-card-title>
                <v-card-text class="px-0">
                    <div class="responsive-datatable">
                        <v-data-table-server v-model:items-per-page="perpage"
                            :search="search" :items-length="totalCount"
                            :loading="loading" no-data-text="Пусто" hover=""
                            :items="items" item-value="id" show-expand v-model:expanded="expanded"
                            :headers="localizedHeaders" density="comfortable">
                            <!-- @update:options="loadItems" -->
                            <template #bottom></template>
                            <template #item.date="{item}">{{ (new Date(Number(item.createdAt))).toDateString() }}</template>
                            <template #item.status="{item}">
                              <v-chip>{{ item.status }}</v-chip>
                            </template>
                            <template #expanded-row="{ columns, item }">
                              <tr>
                                <td :colspan="columns.length">
                                  <span class="mt-3 mb-2 pt-2">Продукты</span>
                                  <v-card density="compact">
                                    <v-card-text class="pb-0">Продукты</v-card-text>
                                    <v-card-text>
                                      <v-table density="compact">
                                        <thead>
                                          <tr>
                                            <th class="text-left">
                                              Но
                                            </th>
                                            <th class="text-left">
                                              Товар
                                            </th>
                                            <th class="text-left">
                                              Цена
                                            </th>
                                            <th class="text-left">
                                              Количество
                                            </th>
                                            <th class="text-left">
                                              Обшая цена
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr v-for="(pr, j) in item.raw.orderProducts" :key="j">
                                            <td>{{ j + 1 }}.</td>
                                            <td>{{ pr.product.name }}</td>
                                            <td>{{ pr.product.price }}.$</td>
                                            <td>{{ pr.count }}.шт</td>
                                            <td>{{ pr.product.price * pr.count }}.$</td>
                                          </tr>
                                        </tbody>
                                      </v-table>
                                    </v-card-text>
                                  </v-card>
                                </td>
                              </tr>
                            </template>
                            <template v-slot:item.actions="{item}">
                              <div class="d-flex justify-end">
                                <v-btn icon="mdi-eye" variant="text" size="40" color="primary"></v-btn>
                                <!-- <v-btn icon="mdi-delete" variant="text" 
                                size="40" color="primary" @click="deleteItem(item)"></v-btn> -->
                              </div>
                            </template>
                        </v-data-table-server>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="pt-0 pb-1 d-flex align-center">
            <v-select bg-color="surface" v-model="perpage" transition="fade-transition" hide-details flat density="compact" variant="outlined" :items="[10,25,50,100,150]"></v-select>
            <v-text-field bg-color="surface" class="ml-3" hide-details flat density="compact" variant="outlined" :model-value="perpagetext" readonly></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="pt-0 pl-0 pb-1 pr-2 d-flex justify-end align-center">
            <v-pagination bg-color="surface" v-model="page" :length="Math.ceil(totalCount / perpage)" @update:modelValue="loadItems" active-color="primary" size="40" total-visible="3" variant="flat"></v-pagination>
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { Ref, ref, nextTick, watch, computed } from "vue"
import { debounce } from 'lodash'
import { IOrder } from "../../interfaces"
// import axios from '../../api'

const headers = [
  { title: "Клиент", key: "customer.name" },
  { title: "Дата", key: "date", sortable: false },
  { title: "Обшая сумма", key: "price", sortable: false },
  { title: "Статус", key: "status", sortable: false },
  { title: "Действия", align: 'end', key: "actions", sortable: false },
];
const childheaders = [
  { title: "Товар", key: "product.name" },
  { title: "Цена", key: "product.price", sortable: false },
  { title: "Количество", key: "count", sortable: false },
  { title: "Обшая цена", key: "sum", sortable: false },
];
const search: Ref<string> = ref("");
const items: Ref<IOrder[]> = ref([]);
const dialogDelete: Ref<boolean> = ref(false);
const editedIndex: Ref<number> = ref(-1);
const editedId: Ref<number> = ref(-1);
const expanded = ref([])

const loading = ref(false)
const page = ref(1)
const perpage = ref(25)
const totalCount = ref(0)
const qs = computed(() => {
    const params = new URLSearchParams();

    if (page.value) 
        params.append('page', String(page.value))

    if (perpage.value) 
        params.append('perpage', String(perpage.value))

    if (search.value.trim())
        params.append('search', search.value)

    return params.toString()
})
const perpagetext = computed(() => {
    const page_1 = (page.value - 1) * perpage.value;
    return `${page_1 + 1}-${page_1 + items.value.length} / ${totalCount.value}`
})
const debounceSearch = debounce((e: string) => {
    search.value = e
    page.value = 1
}, 500)
const localizedHeaders = computed(() => {
    return headers.map(h => ({...h, title: h.title}))
})


const initialize = async () => {
  // const { data } = await axios.get('/order')
  // items.value = data
}

// deleteItemConfirm = async () => {
//   const { data } = await axios.delete(`/order/${editedId.value}`)
//   if(data){
//     items.value.splice(editedIndex.value, 1)
//     closeDelete()
//   }
// },

const loadItems = async () => {
  loading.value = true
  // const { data } = await roomApi.get_rooms(qs.value)

  // if(data.status === "ok") {
  //     items.value = data.result
      
  //     totalCount.value = data.totalCount
  // }
  loading.value = false
}

const save = async () => {
  // if (editedIndex.value > -1) {
  //   Object.assign(items.value[editedIndex.value], editedItem.value)
  // } else {
  //   items.value.push(editedItem.value)
  // }
  // close()
};

// initialize()
</script>