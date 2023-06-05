<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const inputText = ref('');
const router = useRouter();

function checkAndRedirect() {
  if (inputText.value.trim() !== '') {
    router.push({ name: 'table', params: { card: inputText.value } });
  } else {
    alert('Por favor, escreva algo no campo.');
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-text-field
      label="Escreva aqui"
      v-model="inputText"
      @keydown.enter="checkAndRedirect"
    ></v-text-field>
  </v-container>
</template>


<style>


</style>