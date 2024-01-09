<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
        <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
            <v-text-field bg-color="surface" @update:modelValue="debounceSearch" :placeholder="t('admin.search')" append-inner-icon="mdi-magnify" hide-details flat density="compact" variant="solo" class="border rounded"></v-text-field>
        </v-col>
        <v-col cols="3" sm="4" md="2" class="pb-0 d-flex justify-end">
            <v-btn @click="dialog=true" flat color="primary" size="43" width="100%">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-card flat border="">
                <v-card-title class="px-4 pt-3 font-weight-light">{{ t('products.categories') }}</v-card-title>
                <v-card-text class="px-0">
                    <!-- <div class="responsive-datatable"> -->
                        <!-- @update:options="loadItems" 
                        :items-length="totalCount" -->
                        <!-- :search="search" 
                          :search="search"
                        -->
                        <v-data-table
                            :items-per-page="perpage"
                            :page="page"
                            :search="search"
                            :loading="loading" hover
                            :no-data-text="t('no_data')"
                            :loading-text="t('loading')+'...'" 
                            :items="items" item-value="id"
                            :headers="localizedHeaders"
                            :custom-filter="filterOnlyCapsText"
                            density="comfortable">
                            <template #bottom></template>
                            <template #item.actions="{ item, index,column }">
                                <td :data-label="column.title" class="d-flex justify-space-between align-center">
                                    <!-- <span></span> -->
                                    <div>
                                        <v-btn @click="editItem(item, index)" color="light-blue-accent-4" size="30" flat class="mr-1"><v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn @click="deleteItem(index, item.id!)" color="light-blue-accent-4" size="30" flat><v-icon>mdi-delete</v-icon></v-btn>
                                    </div>
                                </td>
                            </template>
                            <template #item.title="{ item, column }">
                              <td :data-label="column.title">{{ item[`name_${locale as "uz"|"en"|"ru"}`] }}</td>
                            </template>
                            <!-- <template #item.parent="{ item, column }">
                              <td :data-label="column.title">{{ item.parent?item.parent[`name_${locale as "uz"|"en"|"ru"}`]:'' }}</td>
                            </template> -->
                        </v-data-table>
                    <!-- </div> -->
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="pt-0 pb-1 d-flex align-center">
            <v-select bg-color="surface" v-model="perpage" transition="fade-transition" hide-details flat density="compact" variant="solo" class="border rounded" :items="[1,10,25,50,100,150]"></v-select>
            <v-text-field bg-color="surface" hide-details flat density="compact" variant="solo" class="border rounded ml-3" :model-value="perpagetext" readonly></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="pt-0 pl-0 pb-1 pr-2 d-flex justify-end align-center">
            <v-pagination bg-color="surface" v-model="page" :length="Math.ceil(totalCount / perpage)" @update:modelValue="loadItems" active-color="primary" size="40" total-visible="3" variant="flat"></v-pagination>
        </v-col>
    </v-row>
    <v-dialog persistent v-model="dialog" max-width="500px" transition="fade-transition">
      <v-card flat border="" color="background">
        <v-card-title class="px-4 py-3 d-flex justify-space-between align-center">
          <span class="font-weight-light">{{ t(editedId?'admin.edit_categories':'admin.add_categories') }}</span>
          <v-btn flat @click="dialog=false" size="32" color="primary"><v-icon size="small">mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text class="px-4 pt-2 pb-3">
          <v-row class="pa-2">
            <v-col cols="12" class="pa-2">
                <v-text-field v-model="editedItem.name_uz" :rules="nameRule"
                    placeholder="Nomi (uz)" hide-details density="compact" bg-color="surface"
                    color="primary" variant="solo" flat class="border rounded"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-2">
                <v-text-field v-model="editedItem.name_ru" :rules="nameRule"
                    placeholder="Название (ru)" hide-details density="compact" bg-color="surface"
                    color="primary" variant="solo" flat class="border rounded"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-2">
                <v-text-field v-model="editedItem.name_en" :rules="nameRule"
                    placeholder="Title (en)" hide-details density="compact" bg-color="surface"
                    color="primary" variant="solo" flat class="border rounded"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-2">
                <v-select v-model="editedItem.parent"
                  :items="items" :item-title="`name_${locale}`" item-value="id"
                  :placeholder="t('admin.parent_category')" hide-details density="compact" bg-color="surface"
                  color="primary" variant="solo" flat class="border rounded"
                />
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-btn color="primary"
                block @click="save" height="45">
                {{ t('admin.save') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { useI18n } from 'vue-i18n'
import { nameRule } from '../../plugins/rules'
import { Ref, ref, computed, nextTick, watch } from "vue"
import { ICategory } from "../../interfaces/index.variant"
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../../api/categories"

const { t, locale } = useI18n()
const headers = [
  { title: "products.title", key: "title" },
  // { title: "admin.parent", key: "parent" },
  { title: "admin.actions", key: "actions", sortable: false },
]
const page = ref(1)
const perpage = ref(25)
const totalCount = ref(0)
const loading = ref(false)
const editedId: Ref<any> = ref(-1)
const search: Ref<string> = ref("")
const dialog: Ref<boolean> = ref(false)
const items: Ref<ICategory[]> = ref([])
const editedIndex: Ref<number> = ref(-1)

const editedItem = ref<ICategory>({
  parent: null,
  name_uz: "",
  name_ru: "",
  name_en: "",  
});
const defaultItem = {
  parent: null,
  name_uz: "",
  name_ru: "",
  name_en: "",  
}
// const qs = computed(() => {
//   const params = new URLSearchParams();

//   if (page.value) 
//       params.append('page', String(page.value))

//   if (perpage.value) 
//       params.append('limit', String(perpage.value))

//   if (search.value.trim())
//       params.append('search', search.value)

//   return params.toString()
// })
const perpagetext = computed(() => {
  const page_1 = (page.value - 1) * perpage.value;
  return `${page_1 + 1}-${page_1 + items.value.length} / ${totalCount.value}`
})
const debounceSearch = debounce((e: string) => {
  search.value = e
  page.value = 1
  // loadItems()
}, 500)
const localizedHeaders = computed(() => {
  return headers.map(h => ({...h, title: t(h.title)}))
})

const filterOnlyCapsText: any = (value: string, query: string, item: {raw: ICategory}) => {
  query=query.toString().toLocaleLowerCase();
  return Object.values(item.raw).some(v => v && v.toString().toLocaleLowerCase().includes(query))
}

watch(dialog, (v)=>v||close())

const editItem =  (item: ICategory, index: number) => {
  editedIndex.value = index
  editedId.value = item.id!
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

const deleteItem = async (index: number, id: number) => {
  if(!confirm('Do you delete this item?')) return
  items.value.splice(index, 1)
  await deleteCategory(id)
}

const close = () => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedId.value = -1
    editedIndex.value = -1
  })
}

const save = async () => {
  if (editedIndex.value > -1) {
    console.log(editedItem.value);
    const { data } = await updateCategory(editedItem.value.id, editedItem.value)
    console.log(data);
    Object.assign(items.value[editedIndex.value], {
      ...data,
      parent: items.value.find(c => c.id === data.parent),
    })
  } else {
    const { data } = await createCategory(editedItem.value)
    items.value.push({
      ...data,
      parent: items.value.find(c => c.id === data.parent),
    })
  }
  close()
}

const loadItems = async () => {
  loading.value = true
  // const { data } = await getAllCategories('')
  // if(!data.results) return
  // console.log(data);
  // items.value = data.results
  // totalCount.value = data.results.length

  totalCount.value = 2
  items.value = [{
    id: 1,
    name_en: 'Hello',
    parent: null,
    name_ru: 'Привеет',
    name_uz: 'Salom'
  },{
    id: 2,
    name_en: 'What',
    parent: null,
    name_ru: 'Что',
    name_uz: 'Nima'
  }]

  loading.value = false
}

loadItems()
</script>