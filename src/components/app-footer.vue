<template>
  <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column pb-15 pb-md-5" absolute>
    <v-container class="py-0">
      <div>
        <v-btn v-for="icon in ['mdi-facebook','mdi-twitter','mdi-linkedin','mdi-instagram','mdi-telegram',]"
          :key="icon" class="mx-2" :icon="icon" variant="text" ></v-btn>
      </div>
      <div class="pt-0 text-justify">
        Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Последний напоивший агентство инициал там города заглавных предложения текста за, страна имеет коварный переулка они дорогу вопроса выйти вершину. Составитель проектах заголовок взобравшись продолжил живет журчит выйти океана раз коварных! О журчит которой маленькая свою то составитель пунктуация инициал своего, диких семантика они прямо предупредила речью запятых на берегу родного рукописи.
      </div>
      <v-divider></v-divider>
      <div>{{ new Date().getFullYear() }} — <strong>Perfume Shop</strong></div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">

</script>