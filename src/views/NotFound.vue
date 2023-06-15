<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <v-card class="d-flex align-center justify-center card-height">
          <v-card-text class="text-center">Cartão não encontrado</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

setTimeout(() => {
  router.push("/");
}, 3000);
</script>

<style scoped>
.card-height {
  height: 100%;
}
</style>
