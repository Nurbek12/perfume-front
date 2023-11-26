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
                            <v-icon start size="20">mdi-magnify</v-icon>
                            <span class="text-body-2">Избранные</span>
                        </v-tab>
                    </v-tabs>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="8">
            <v-window v-model="tab" :touch="false">
                <v-window-item>
                    <app-profile />
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
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import AppProfile from '../../components/app-profile.vue'
import AppProfileOrders from '../../components/app-profile-orders.vue'
import AppSaved from '../../components/app-saved.vue'

const tab = ref(0)
const { mobile } = useDisplay()
</script>