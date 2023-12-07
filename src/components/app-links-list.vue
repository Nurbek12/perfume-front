<template>
    <v-list
        max-height="500"
        class="rounded-sm py-0 scroll-normalize"
        density="compact"
        elevation="0"
        color="primary"
        variant="text"
        base-color="primary"
        :items="getters.categories"
        item-children="children"
        v-bind="({ 'onClick:open': openCategory } as any)"
        :item-props="item_props"
        :item-value="`id`"
        :item-title="`name_${locale}`">
    </v-list>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { locale } = useI18n()
const { getters } = useStore()

const openCategory = (e: {event: any, path: string[]}) => {
    const cl = e?.event?.target?.className
    
    if(cl !== 'v-list-item-title' || !e.path) return
    
    const query: any = {};
    e.path.map((c, i) => {
        query[['category', 'category_1', 'category_2'][i]] = c
    })
    // console.log(e);
    
    router.push({
        path: '/products',
        query: query
    })
}

const item_props = (item: any) => {
    const iprops: any = {
        link: true
    }
    if(item.level >= 2 || item?.children?.length === 0) iprops.appendIcon = ''
    return iprops
}
</script>