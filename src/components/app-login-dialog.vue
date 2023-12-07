<template>
    <v-card class="text-center" flat>
        <v-card-title class="text-primary">Войти в аккоунт</v-card-title>
        <!-- <v-card-title class="d-flex align-center justify-space-between">
            <span>Login to Account</span>
            <v-btn
                size="30"
                variant="flat"
                color="primary"
                @click="$emit('close-login')">
                <v-icon size="20">mdi-close</v-icon>
            </v-btn>
        </v-card-title> -->
        <v-card-text class="d-flex items-center h-100 pt-0 justify-start">
            <v-sheet max-width="400" width="100%" class="pa-2 border-0 rounded">
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-row>
                            <v-col cols="12" class="pb-1">
                                <span class="text-subtitle-1">Введите телефон номера</span>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="loginData.mobile" :rules="phoneRules" placeholder="Телефон номер" density="comfortable" variant="solo" bg-color="background" flat hide-details />
                            </v-col>
                            <v-col cols="12">
                                <v-btn block @click="handleLogin" :disabled="disabledLoginButton" variant="flat" color="primary">Отправить смс</v-btn>
                            </v-col> 
                        </v-row>
                    </v-window-item>

                    <v-window-item :value="2">
                        <v-row>
                            <v-col cols="12" class="pb-1">
                                <span class="text-subtitle-1">Код отправлень на {{ loginData.mobile }}</span>
                            </v-col>
                            <v-col cols="12" class="py-1">
                                <v-otp-input v-model="loginData.token" class="pa-0 elevation-0" variant="solo" color="background" bg-color="background" flat density="comfortable" length="6" placeholder="-" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn block :disabled="disabledVerifyButton" @click="handleVerify" variant="flat" color="primary">Подтвердить код</v-btn>
                            </v-col>
                        </v-row>
                    </v-window-item>

                    <v-window-item :value="3">
                        <v-row>
                            <v-col cols="12" class="pb-1">
                                <span class="text-subtitle-1">Добро пожаловать, Введите имя</span>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="loginData.name" :rules="nameRule" placeholder="Имя и фамилия" density="comfortable" variant="solo" bg-color="background" flat hide-details />
                            </v-col>
                            <v-col cols="12">
                                <v-btn block @click="handleRegister" variant="flat" color="primary" :disabled="disabledRegisterButton">Зарегистрироваться</v-btn>
                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-sheet>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import { phoneRules, checkTextPhone, nameRule } from '../plugins/rules'
import { login, verify, register, me } from '../api/user'
import { useStore } from 'vuex'

const { commit } = useStore()
const step = ref(1)
const loginData = reactive({
    mobile: '',
    token: '',
    name: ''
})
const user = ref<any>(null)

const disabledLoginButton = computed(() => !loginData.mobile?.trim() || !checkTextPhone(loginData.mobile))
const disabledVerifyButton = computed(() => loginData.token?.length < 6)
const disabledRegisterButton = computed(() => !loginData.name?.trim())

const handleLogin = async () => {
    // await login({mobile: loginData.mobile})
    step.value += 1
}

const handleVerify = async () => {
    // const { data } = await verify(loginData)
    // console.log(data);
    // if(!data?.token) return
    // const i = await me(data.token)
    // if(i.data['IS_REGISTERED_PATH']) return commit('SET_TOKEN', data.token)

    // user.value = {...i.data, token: data.token}
    step.value += 1
}

const handleRegister = async () => {
    // const { data } = await register(user.value.id, {
    //     name: loginData.name,
    //     "IS_REGISTERED_PATH": true
    // })
    
    // commit('SET_USER', data)
    // commit('SET_TOKEN', user.value.token)
    // router.push()
    step.value = 1
}
</script>