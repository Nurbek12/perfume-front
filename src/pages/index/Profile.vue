<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-card flat>
                <v-card-text class="py-2 px-2 px-sm-0">
                    <v-tabs
                        v-model="tab"
                        :direction="mobile?'horizontal':'vertical'"
                        color="primary">
                        <v-tab>
                            <v-icon start size="20">mdi-account</v-icon>
                            <span class="text-body-2">Профиль</span>
                        </v-tab>
                        <v-tab>
                            <v-icon start size="20">mdi-shopping</v-icon>
                            <span class="text-body-2">Покупки</span>
                        </v-tab>
                        <v-tab>
                            <v-icon start size="20">mdi-heart-outline</v-icon>
                            <span class="text-body-2">Избранные</span>
                        </v-tab>
                    </v-tabs>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="8">
            <v-window v-model="tab" :touch="false">
                <v-window-item>
                    <div  class="w-100 d-flex justify-center">
                        <app-profile v-if="getters.isLogged" />
                        <app-login v-else />
                    </div>
                </v-window-item>
                <v-window-item>
                    <app-profile-orders />
                </v-window-item>
                <v-window-item>
                    <app-saved />
                </v-window-item>
            </v-window>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from 'vue'
import AppLogin from '../../components/app-login-dialog.vue'
import { useDisplay } from 'vuetify'
import AppProfile from '../../components/app-profile.vue'
import AppProfileOrders from '../../components/app-profile-orders.vue'
import AppSaved from '../../components/app-saved.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const { query } = useRoute()
const tab = ref(query.tab ? parseInt(query.tab as string) : 0)
const { getters } = useStore()
const { mobile } = useDisplay()

watch(tab, (v) => {
    router.replace({ query: { tab: v } })
})

const emits = defineEmits(['loaded'])
onMounted(() => {
    emits('loaded')
})
</script>