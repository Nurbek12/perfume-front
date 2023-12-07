<template>
    <v-card flat>
        <v-card-title class="text-primary">Личное Данные</v-card-title>
        <v-card-text>
            <v-row class="pa-1">
                <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field bg-color="background" hide-details placeholder="Имя и Фамилия" variant="solo" flat prepend-inner-icon="mdi-account-outline" />
                </v-col>
                <v-col cols="12" sm="6" class="pa-2">
                    <v-text-field bg-color="background" hide-details placeholder="Телефон" variant="solo" flat prepend-inner-icon="mdi-phone-outline" />
                </v-col>
                <v-col cols="12" class="pa-2">
                    <v-textarea bg-color="background" hide-details placeholder="Адрес" variant="solo" flat prepend-inner-icon="mdi-map-marker-outline" no-resize />
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pa-2">
                    <v-btn color="primary" variant="flat" height="40" class="text-none">Сохранить</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formData = reactive({})
</script>