<script setup>
import { useRoute, useRouter } from 'vue-router';
import NumberCard from "../components/NumberCard.vue";

const route = useRoute();

</script>

<template>
  <v-container fluid class="fill-height">
    <NumberCard :card="route.params.card"  />
    <v-row no-gutters>
      <v-col cols="12" md="3" class="border">
        <v-sheet class="ma-2 pa-2">Lugar</v-sheet>
      </v-col>

      <v-col cols="12" md="3" class="border">
        <v-sheet class="ma-2 pa-2">Operação</v-sheet>
      </v-col>

      <v-col cols="12" md="3" class="border">
        <v-sheet class="ma-2 pa-2">Valor</v-sheet>
      </v-col>

      <v-col cols="12" md="3" class="border">
        <v-sheet class="ma-2 pa-2">Tipo</v-sheet>
      </v-col>

      <v-col v-for="n in 96" :key="n" cols="12" md="3" class="border">
        <v-sheet> Testando</v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>



<style scoped>

</style>