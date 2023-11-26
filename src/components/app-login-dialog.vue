<template>
    <v-row justify="center">
        <v-card
            width="100%"
            max-width="400">
            <v-card-title class="d-flex align-center justify-space-between">
                <span>Login to Account</span>
                <v-btn
                    size="30"
                    variant="flat"
                    color="primary"
                    @click="$emit('close-login')">
                    <v-icon size="20">mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-row class="mt-2">
                            <v-col cols="12">
                                <v-text-field placeholder="Введите телефон" density="comfortable" variant="outlined" hide-details>
                                    <template #append>
                                        <v-btn
                                            @click="step++"
                                            size="50"
                                            variant="flat"
                                            color="primary">
                                            <v-icon>mdi-email-outline</v-icon>
                                        </v-btn>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-window-item>

                    <v-window-item :value="2">
                        <v-row class="mt-2" justify="center">
                            <v-col cols="8">
                                <v-otp-input @finish="step=1" class="pa-0" variant="outlined" density="comfortable" length="4" placeholder="-" />
                            </v-col>
                            <!-- <v-col cols="4" class="py-7">
                                <v-btn
                                    @click="step--"
                                    block
                                    variant="flat"
                                    color="primary">
                                    <v-icon size="25">mdi-login-variant</v-icon>
                                </v-btn>
                            </v-col> -->
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const phone = ref('')
const step = ref(1)
</script>