<template>
    <div class="d-flex flex-column justify-start" style="max-width: 200px;">
        <span>{{ props.title }}</span>
        <div class="inline-flex mt-2">
            <v-btn
                v-for="s,i in props.links"
                :prepend-icon="s.icon"
                :key="i"
                height="25"
                variant="flat"
                color="transparent"
                class="text-caption text-right mt-1"
                >{{ s.title }}</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: String,
    links: [Object]
})
</script>