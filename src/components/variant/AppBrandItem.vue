<template>
<v-card flat border theme="light" link @click="$emit('open-this')">
    <v-img height="150" :src="brand?.image.medium_square_crop"></v-img>
    <v-card-title class="text-primary text-subtitle-1">{{brand?.name}}</v-card-title>
    <v-card-text>
        <div class="d-flex gap-1 align-center">
            <v-avatar size="25" rounded>
                <v-img :src="countries[brand?.country]?.flag"></v-img>
            </v-avatar>
            <span>{{ countries[brand?.country]?.name }}</span>
        </div>
    </v-card-text>
</v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { countries } from '../../assets/countries'

const props = defineProps({
    brand: {
        type: Object
    }
})
</script>