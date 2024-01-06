<template>
  <admin-nav />
  <admin-bar />
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import AdminBar from '../../components/app-admin-bar.vue'
import AdminNav from '../../components/app-admin-nav.vue'
</script>