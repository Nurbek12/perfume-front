<template>
    <v-list
        max-height="500"
        class="rounded-sm py-0 scroll-normalize"
        density="compact"
        elevation="0"
        color="primary"
        variant="text"
        base-color="primary">
        <v-list-group v-for="c1,i in links" :key="i">
            <template #activator="{ props }">
                <v-list-item v-bind="props" class="text-body-2">
                    <template #append v-if="!c1.child" />
                    {{ c1.title }}
                </v-list-item>
            </template>

            <v-list-group v-for="c2,j in c1?.child||[]" :key="j">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" height="10" class="text-body-2">{{ c2.title }}</v-list-item>
                </template>

                <v-list-item class="text-body-2" link v-for="c3,k in c2?.child||[]" :key="k">
                    {{ c3.title }}
                </v-list-item>
            </v-list-group>
        </v-list-group>
    </v-list>
</template>

<script setup lang="ts">
import { links } from '../products'
</script>