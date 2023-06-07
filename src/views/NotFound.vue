<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <p>Cartão não encontrado</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  setTimeout(() => {
    router.push("/");
  }, 3000);
</script>