<template>
    <v-card flat max-width="500" width="100%">
        <v-card-title class="text-primary">Личное Данные</v-card-title>
        <v-card-text>
            <v-row class="pa-1">
                <v-col cols="12" class="pa-2">
                    <v-text-field v-model="formData.first_name" bg-color="background" hide-details placeholder="Имя и Фамилия" variant="solo" flat prepend-inner-icon="mdi-account-outline" />
                </v-col>
                <v-col cols="12" class="pa-2">
                    <v-text-field v-model="formData.mobile" bg-color="background" hide-details placeholder="Телефон" variant="solo" flat prepend-inner-icon="mdi-phone-outline" />
                </v-col>
                <v-col cols="12" class="pa-2 d-flex align-center justify-space-between">
                    <v-btn :disabled="disableButton" color="primary" variant="flat" height="40" class="text-none">Сохранить</v-btn>
                    <v-btn color="red" variant="flat" height="40" class="text-none" @click="handleLogout">Выйти из аккоунта</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { IUser } from '../interfaces';

const { getters, commit } = useStore()
const formData = reactive<IUser>({
    ...getters.user
})

const disableButton = computed(() => {
    if(!formData.first_name?.trim() || !formData.mobile?.trim()) return true
    else if(formData.first_name === getters.user.first_name && formData.mobile  === getters.user.mobile) return true
    return false
})

const handleLogout = () => {
    if(!confirm('You should be log out?')) return
    commit('LOGOUT')
    
}

const handleEditProfile = () => {
    
}
</script>