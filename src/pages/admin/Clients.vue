<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
        <v-col cols="9" sm="6" md="4" class="pb-0">
            <v-text-field bg-color="surface" @update:modelValue="debounceSearch" placeholder="Search" append-inner-icon="mdi-magnify" hide-details flat density="compact" variant="outlined"></v-text-field>
        </v-col>
        <!-- <v-col cols="3" sm="4" md="2" class="pb-0 d-flex justify-end">
            <v-btn @click="dialog=true" flat color="primary" size="43" width="100%">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col> -->
        <v-col cols="12">
            <v-card flat border="">
                <v-card-title class="px-4 pt-3 font-weight-light">Пользователи</v-card-title>
                <v-card-text class="px-0">
                    <div class="responsive-datatable">
                        <v-data-table-server 
                            v-model:items-per-page="perpage"
                            :search="search"
                            :items-length="totalCount"
                            :loading="loading" hover=""
                            no-data-text="Пусто" 
                            :items="items" item-value="id"
                            :headers="localizedHeaders"
                            density="comfortable">
                            <!-- @update:options="loadItems" -->
                            <template #bottom></template>
                            <template #item.actions="{ item, index }">
                                <td :data-label="`t('actions')`" class="d-flex justify-space-between align-center">
                                    <span></span>
                                    <div>
                                        <v-btn @click="editItem(item)" color="light-blue-accent-4" size="30" flat class="mr-1"><v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn @click="deleteItem(index, item.id)" color="light-blue-accent-4" size="30" flat><v-icon>mdi-delete</v-icon></v-btn>
                                    </div>
                                </td>
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
    <!-- <v-dialog persistent="" v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="mt-2 ml-2 mb-0">
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  label="Имя" hide-details
                  color="primary" variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.email"
                  label="Электронная почта" hide-details
                  color="primary"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.phone"
                  label="Номер телефона" hide-details
                  color="primary"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select :items="[{text:'Клиент',value:'user'},{text:'Админ',value:'user'}]"
                 v-model="editedItem.role" item-title="text" item-value="value" label="Рол"
                 variant="outlined" hide-details>
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.address"
                  label="Адрес" hide-details
                  color="primary"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="4" sm="2">
                    <v-avatar size="100%">
                      <v-img cover :src="imagesrc"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="8" sm="10">
                    <v-file-input
                      v-model="image"
                      label="Фотография"
                      hide-details variant="outlined"
                      color="primary" prepend-icon="mdi-camera"
                    >
                    <template v-slot:selection="{ fileNames }">
                      <template v-for="fileName, ind in fileNames" :key="ind">
                        <v-chip color="light-blue-accent-4"
                          label size="x-small" class="me-2">
                          <span>
                            {{ fileName }}
                          </span>
                        </v-chip>
                      </template>
                    </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-btn color="primary"
                  block @click="save" height="45">
                  Сохранить
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script lang="ts" setup>
import { Ref, ref, computed, nextTick, watch } from "vue"
import { IUser } from "../../interfaces/index"
import axios from '../../api'
import { debounce } from 'lodash'

const headers = [
  { title: "Но", align: "start", key: "no", sortable: false },
  { title: "Фотография", key: "image", sortable: false },
  { title: "Имя", key: "name" },
  { title: "Номер телефона", key: "phone", sortable: false },
  { title: "Электронная почта", key: "email", sortable: false },
  { title: "Адрес", key: "address", sortable: false },
  { title: "Действия", align: 'end', key: "actions", sortable: false },
];
const search: Ref<string> = ref("");
const items: Ref<IUser[]> = ref([]);
const dialog: Ref<boolean> = ref(false);
const dialogDelete: Ref<boolean> = ref(false);
const editedIndex: Ref<number> = ref(-1);
const editedId: Ref<number> = ref(-1);
const editedItem: Ref<IUser> = ref({
  name: '',
  email: '',
  phone: '',
});
const defaultItem = {
  name: '',
  email: '',
  phone: '',
}
const image: Ref<File[]> = ref([])
const formTitle = computed(() => editedIndex.value === -1 ? "Добавить пользователя" : "Редактировать пользователя")

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

watch(dialog, (v)=>v||close())

const initialize = async () => {
  const { data } = await axios.get('/user')
  items.value = data
}

const editItem =  (item: IUser) => {
  editedIndex.value = items.value.indexOf(item)
  editedId.value = item.id!
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item: IUser) => {
  editedIndex.value= items.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  editedId.value = item.id!
  dialogDelete.value = true
}

const deleteItemConfirm = async () => {
  const { data } = await axios.delete(`/user/${editedId.value}`)
  if(data){
    items.value.splice(editedIndex.value, 1)
    // closeDelete()
  }
}

const close = () => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem as IUser)
    editedId.value = -1
    editedIndex.value = -1
    image.value.length = 0
  })
}

const save = async () => {
  // const formdata = new FormData()
  // Object.keys(editedItem.value).map((key) => {
  //   formdata.append(key, editedItem.value[key])
  // })
  // if(image.value[0]) formdata.append('image', image.value[0])
  // if (editedIndex.value > -1) {
  //   const { data } = await axios.put(`/user/${editedId.value}`, formdata)
  //   Object.assign(items.value[editedIndex.value], data)
  // } else {
  //   const { data } = await axios.post('/user', formdata)
  //   items.value.push(data)
  // }
  // close()
}

const loadItems = async () => {
  loading.value = true
  // const { data } = await roomApi.get_rooms(qs.value)

  // if(data.status === "ok") {
  //     items.value = data.result
      
  //     totalCount.value = data.totalCount
  // }
  loading.value = false
}
// initialize()
</script>