<template>
<v-footer v-if="!!mobile" class="py-0" app>
    <v-bottom-navigation mandatory mode="shift" color="primary">
        <v-btn v-for="l,i in links" :key="i" density="compact" :to="l.url" exact>
            <v-icon>{{l.icon}}</v-icon>
            <!-- <span>{{l.title}}</span> -->
        </v-btn>
    </v-bottom-navigation>
</v-footer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const mobile = useDisplay().mobile
const links = [
    { icon: "mdi-home-outline", title: "Главная", url: "/" },
    { icon: "mdi-magnify", title: "Искать", url: "/products" },
    // { icon: "mdi-heart-outline", title: "Избранные", url: "/saved" },
    { icon: "mdi-gift-outline", title: "Подарки", url: "/gifts" },
    { icon: "mdi-cart-outline", title: "Корзинка", url: "/cart" },
    { icon: "mdi-account-outline", title: "Профайл", url: "/profile" },
    // { icon: "mdi-bookmark-outline", title: "Избранные", url: "/cart" },
    // { icon: "mdi-account-outline", title: "Профиль", url: "/cart" },
]
</script>