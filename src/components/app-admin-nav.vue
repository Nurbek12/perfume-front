<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent width="250" :expand-on-hover="mobile">
    <v-list :lines="false" nav variant="flat">
        <v-list-item link v-for="link, i in links" :key="i" :to="link.url" color="primary" base-color="transparent" exact>
            <template v-slot:prepend>
              <v-icon :icon="link.icon"></v-icon>
            </template>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
    </v-list>
    <v-btn position="absolute" elevation="1" v-if="!mobile" :icon="`mdi-chevron-${!rail ? 'left' : 'right'}`" size="x-small" @click="rail = !rail" style="right: -15px"></v-btn>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useDisplay, useTheme } from "vuetify";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n'

const store = useStore();
const { t } = useI18n()
const mobile = useDisplay().mobile;

watch(mobile, () => {
  if (mobile) rail.value = true;
});
const rail = ref(true);
const download = ref(false);
const drawer = ref(true)

const links = [
    { title: 'Dashboard', icon: 'mdi-chart-bar-stacked', url: '/admin' },
    { title: 'Products', icon: 'mdi-package-variant-closed', url: '/admin/products' },
    { title: 'Storage', icon: 'mdi-garage', url: '/admin/storage' },
    { title: 'Categories', icon: 'mdi-hexagon-multiple', url: '/admin/categories' },
    { title: 'Brands', icon: 'mdi-hexagon-slice-1', url: '/admin/brands' },
    // { title: 'Prices', icon: 'mdi-gift', url: '/admin/prices' },
    { title: 'Clients', icon: 'mdi-account-group', url: '/admin/clients' },
    { title: 'Orders', icon: 'mdi-shopping', url: '/admin/orders' },
    { title: 'Settngs', icon: 'mdi-settings', url: '/admin/settings' },
]
</script>