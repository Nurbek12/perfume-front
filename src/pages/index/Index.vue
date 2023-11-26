<template>
  <app-bar @open-login="loginDialog=true" />
  <v-main>
    <router-view />
  </v-main>
  <app-footer />
  <app-nav-bottom />
  <v-dialog v-model="loginDialog" persistent>
    <app-login-dialog  @close-login="loginDialog=false" />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '../../components/app-bar.vue'
import AppNavBottom from '../../components/app-nav-bottom.vue'
import AppFooter from '../../components/app-footer.vue'
import AppLoginDialog from '../../components/app-login-dialog.vue'

const loginDialog = ref(false)
</script>