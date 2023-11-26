<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
        <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
            <v-text-field bg-color="surface" @update:modelValue="debounceSearch" placeholder="Search" append-inner-icon="mdi-magnify" hide-details flat density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="3" sm="4" md="2" class="pb-0 d-flex justify-end">
            <v-btn @click="dialog=true" flat color="primary" size="43" width="100%">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-card flat border="">
                <v-card-title class="px-4 pt-3">{{ 't("rooms.title")' }}</v-card-title>
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
    <v-dialog persistent="" v-model="dialog" width="500" transition="fade-transition">
        <v-card elevation="1" border="" color="background">
            <v-card-title class="px-4 py-3 d-flex justify-space-between align-center">
                <span>{{ 't("rooms.title")' }}</span>
                <v-btn flat @click="dialog=false" size="32" color="primary"><v-icon size="small">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text class="px-4 py-4">
                <v-form class="w-100 form-card" ref="form">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="product.title"
                                label="Название" hide-details density="comfortable" bg-color="surface"
                                color="primary" variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field  density="comfortable" bg-color="surface"
                                v-model="product.count"
                                label="Количество на складе" type="number" 
                                hide-details variant="outlined"
                                color="primary" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field  density="comfortable" bg-color="surface"
                                v-model="product.price"
                                label="Цена" type="number" 
                                hide-details variant="outlined"
                                color="primary"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select density="comfortable" bg-color="surface" v-model="product.category" :items="categories" label="Категория" item-title="name" hide-details item-value="id" variant="outlined" color="primary" ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-select density="comfortable" bg-color="surface" v-model="product.category" :items="categories" label="Подкатегория" item-title="name" hide-details item-value="id" variant="outlined" color="primary" ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-select density="comfortable" bg-color="surface" v-model="product.category" :items="categories" label="Подкатегория" item-title="name" hide-details item-value="id" variant="outlined" color="primary" ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-select density="comfortable" bg-color="surface" v-model="product.category" :items="categories" label="Бренд" item-title="name" hide-details item-value="id" variant="outlined" color="primary" ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                            <v-col cols="4" sm="2" class="pr-0">
                                <v-avatar rounded size="50">
                                    <v-img cover :src="image"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col cols="8" sm="10" class="pl-0">
                                <v-file-input density="comfortable" bg-color="surface" v-model="images" max="10" label="Фотография" multiple counter  hide-details variant="outlined" color="primary" prepend-icon="" >
                                    <template v-slot:selection="{ fileNames }">
                                        <template v-for="(fileName, index) in fileNames" :key="index">
                                            <v-chip v-if="index < 2" color="amber-accent-4" label size="x-small" class="me-2">
                                                <span style="max-width: 50px;">{{ fileName }}</span>
                                            </v-chip>

                                            <span v-else-if="index === 2" class="text-caption mx-2">
                                                +{{ images.length - 2 }} File(s)
                                            </span>
                                        </template>
                                    </template>
                                </v-file-input>
                            </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea density="comfortable" bg-color="surface" v-model="product.description" label="Описание" hide-details color="primary" variant="outlined"></v-textarea>
                        </v-col>
                        <v-col>
                            <v-btn color="primary" block @click="save" height="45">Сохранить</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import { namerules } from '../utils/rules'
// import { items_per_page } from '../utils/items'
// import * as roomTypeApi from '../api/roomtype'
// import * as roomApi from '../api/room'
import { debounce } from 'lodash'
import { IProduct, ICategory, IUser } from '../../interfaces'

const namerules = [(v: any) => !!v || "Required"]
const headers = [
    { title: "Фотография", key: "image", sortable: false },
    { title: "Название", key: "name" },
    { title: "Цена", key: "price" },
    { title: "Количество на складе", key: "quantity" },
    { title: "Оценка", key: "rate" },
    { title: "Категория", key: "category" },
    { title: "Действия", align: "end", key: "actions", sortable: false },
]

const { t, locale } = useI18n()

const er = ref(false)
const dialog = ref<boolean>(false)
const form = ref<HTMLFormElement|null>(null)
const items = ref<IProduct[]>([])
const images = ref<File[]>([])
const categories = ref<ICategory[]>([])

const product = ref<IProduct>({
    count: 0,
    description: "",
    discount: 0,
    price: 0,
    title: "",
    brand: "",
    child_category: "",
    d_child_category: ""
})
const image = computed(() => {
  if(images.value?.length > 0) return URL.createObjectURL(images.value[0])
  return '/img/nophoto.jpg'
})
const editedId = ref<number|null>(null)

const loading = ref(false)
const page = ref(1)
const perpage = ref(25)
const totalCount = ref(0)
const search = ref("")
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

// Types

const init = async () => {
    // const { data } = await roomTypeApi.get_types()
    // if(data.status === "ok") types.value = data.types
}

const validate = async () => {
    const { valid } = await form.value?.validate();
    if (valid) save()
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

const save = async () => {
    if(editedId.value) {
        // roomItem.value.type_id = roomItem.value.type.id
        // const { data } = await roomApi.update_room(editedRoomId.value, roomItem.value)
        // if(data.status !== "ok") return
        // const index = items.value.findIndex(t => t.id === editedRoomId.value)
        // Object.assign(items.value[index], data.result)
    }else {
        // const { data } = await roomApi.create_room(roomItem.value)
        // if(data.status !== "ok") return
        // items.value.push(data.result)
    }

    close()
}

const editItem = (item: IProduct) => {
    editedId.value = item.id!;
    product.value = Object.assign({}, item);
    dialog.value = true;
}

const deleteItem = async (i: number, id: number) => {
    if(!confirm("Ushbu malumotni o'chirmoqchimisiz?")) return

    // await roomApi.delete_room(id)
    items.value.splice(i, 1);
}

const close = () => {
    dialog.value = false;
    nextTick(() => {
        product.value = Object.assign({}, {
            count: 0,
            description: "",
            discount: 0,
            price: 0,
            title: "",
            brand: "",
            child_category: "",
            d_child_category: ""
        });
        editedId.value = null;
        form.value?.reset()
    });
}

// init()

watch(dialog, (v) => v || close())
</script>