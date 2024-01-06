<template>
    <v-main>
        <v-container class="h-screen">
            <v-row justify="center" align="center" class="h-100">
                <v-card border flat max-width="400" width="100%">
                    <v-card-title class="text-primary text-center">Login to Admin Panel</v-card-title>
                    <v-card-text class="text-red text-center py-0" v-if="err">Login or password incorret</v-card-text>
                    <v-card-text>
                        <v-form ref="form">
                            <v-row class="pa-2">
                                <v-col cols="12" class="pa-2">
                                    <v-text-field v-model="user_login.username" :rules="nameRule"
                                        placeholder="Логин" hide-details density="compact" bg-color="surface"
                                        color="primary" variant="solo" flat class="border rounded"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-2">
                                    <v-text-field v-model="user_login.password" :rules="nameRule"
                                        :append-inner-icon="show?'mdi-eye':'mdi-eye-off'"
                                        @click:append-inner="show=!show" :type="show?'text':'password'"
                                        placeholder="Пароль" hide-details density="compact" bg-color="surface"
                                        color="primary" variant="solo" flat class="border rounded"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-2">
                                    <v-btn @click="handleLogin" block color="primary" flat>Login</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { nameRule } from '../../plugins/rules'
import { login } from '../../api/auth'
import { checkToken } from '../../api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const { commit } = useStore()
const show = ref(false)
const err = ref(false)
const form = ref<any>(false)
const user_login = reactive({
    username: "",
    password: ""
})

const handleLogin = async () => {
    err.value = false
    const { valid } = await form.value?.validate();
    if (!valid) return
    try {
        const { data } = await login(user_login)
        if(data.access) {
            commit('SET_TOKEN', data.access)
            checkToken()
            router.push('/admin')
        }
    } catch (error) {
        err.value = true
    }
}
</script>