<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
        <!-- <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
            <v-text-field bg-color="surface" v-model="search" :placeholder="t('admin.search')" append-inner-icon="mdi-magnify" hide-details flat density="compact" variant="solo" class="border rounded"></v-text-field>
        </v-col> -->
        <v-col cols="12" class="pb-0 d-flex justify-end">
            <v-btn @click="dialog=true" flat color="primary" size="43" width="100%">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-card flat border="">
                <v-card-title class="px-4 pt-3 font-weight-light">{{ t('products.categories') }}</v-card-title>
                <!-- <v-card-text class="px-0">
                  <v-data-table
                    hover
                    :items-per-page="perpage"
                    :page="page"
                    :search="search"
                    :loading="loading"
                    :no-data-text="t('no_data')"
                    :loading-text="t('loading')+'...'" 
                    :items="items" item-value="id"
                    :headers="localizedHeaders"
                    :custom-filter="filterOnlyCapsText"
                    density="comfortable">
                    <template #bottom></template>
                    <template #item.actions="{ item, index,column }">
                      <td :data-label="column.title" class="d-flex justify-space-between align-center">
                        <div>
                          <v-btn @click="editItem(item, index)" color="light-blue-accent-4" size="30" flat class="mr-1"><v-icon>mdi-pencil</v-icon></v-btn>
                          <v-btn @click="deleteItem(index, item.id!)" color="light-blue-accent-4" size="30" flat><v-icon>mdi-delete</v-icon></v-btn>
                        </div>
                      </td>
                    </template>
                    <template #item.title="{ item, column }">
                      <td :data-label="column.title">{{ item[`name_${locale as "uz"|"en"|"ru"}`] }}</td>
                    </template>
                    <template #item.children="{ item, column }">
                      <td :data-label="column.title">{{ item.children?.length }}</td>
                    </template>
                  </v-data-table>
                </v-card-text> -->
                <v-card-text>
                  <span v-show="items.length === 0 && !loading">{{ $t('no_data') }}</span>
                  <span v-show="loading">{{ $t('loading') }}...</span>
                  <Tree @addItem="addItem" @editItem="editItem" @deleteItem="deleteItem" :items="items" :locale="(locale as 'uz')" />
                </v-card-text>
            </v-card>
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
                  :items="all" :item-title="`name_${locale}`" item-value="id"
                  :placeholder="t('admin.parent_category')" hide-details density="compact" bg-color="surface"
                  color="primary" variant="solo" flat class="border rounded"
                />
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-btn color="primary" :disabled="save_loading"
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
import { useI18n } from 'vue-i18n'
import Tree from '../../components/tree.vue'
import { nameRule } from '../../plugins/rules'
import { Ref, ref, nextTick, watch } from "vue"
import { ICategory } from "../../interfaces/index.variant"
import { createCategory, getTree, updateCategory, deleteCategory, getAllCategories } from "../../api/categories"

const { t, locale } = useI18n()
const loading = ref(false)
const save_loading = ref(false)
const editedId: Ref<any> = ref(null)
const search: Ref<string> = ref("")
const dialog: Ref<boolean> = ref(false)
const items: Ref<ICategory[]> = ref([])
const all: Ref<ICategory[]> = ref([])
const indexes: Ref<number[]> = ref([])

const editedItem = ref<ICategory>({
  parent: null,
  name_uz: "",
  name_ru: "",
  name_en: "",
  children: [],
});
const defaultItem = {
  parent: null,
  name_uz: "",
  name_ru: "",
  name_en: "",  
}

watch(dialog, (v)=>v||close())

const addItem = (index: number[], parent: number) => {
  editedItem.value.parent = parent
  indexes.value = index
  dialog.value = true
}

const editItem = (item: ICategory, index: number[]) => {
  indexes.value = index
  editedId.value = item.id!
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = async (item: ICategory, index: number[]) => {
  if(!confirm('Do you delete this item?')) return
  if(index.length === 1)
    items.value.splice(index[0], 1)

  if(index.length === 2)
    items.value[index[0]].children.splice(index[1], 1)
      
  if(index.length === 3)
    items.value[index[0]].children[index[1]].children.splice(index[2], 1)

  await deleteCategory(item.id)
}

const close = () => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem) as any
    editedId.value = null
    indexes.value = []
  })
}

const save = async () => {
  save_loading.value = true
  if (editedId.value !== null) {
    const { data } = await updateCategory(editedItem.value.id, editedItem.value)
    
    if(data.children) delete data.children

    if(indexes.value.length === 1)
      Object.assign(items.value[indexes.value[0]], data)
      
    if(indexes.value.length === 2)
      Object.assign(items.value[indexes.value[0]].children[indexes.value[1]], data)
      
    if(indexes.value.length === 3)
      Object.assign(items.value[indexes.value[0]].children[indexes.value[1]].children[indexes.value[2]], data)
  
  } else {
    const { data } = await createCategory(editedItem.value)
    console.log(data);
    all.value.push(data)

    if(indexes.value.length === 0)
      items.value.push({...data, children: []})
    
    if(indexes.value.length === 1)
      items.value[indexes.value[0]].children.push({...data, children: []})
      
    if(indexes.value.length === 2)
      items.value[indexes.value[0]].children[indexes.value[1]].children.push({...data, children: []})

    if(indexes.value.length === 3)
      items.value[indexes.value[0]].children[indexes.value[1]].children[indexes.value[2]].children.push({...data, children: []})
  }
  save_loading.value = false
  close()
}

const loadItems = async () => {
  loading.value = true
  const { data } = await getTree()
  if(!data) return
  items.value = data
  loading.value = false
}

const init = async () => {
  const [tree,_] = await Promise.all([
    getAllCategories(''),
    loadItems()
  ])
  all.value = tree.data.results
}


init()
</script>