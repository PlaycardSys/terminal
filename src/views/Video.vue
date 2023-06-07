<template>
  <v-container class="fill-height">
    <v-text-field
        autofocus
        v-model="cardNumber"
        @keydown.enter="checkAndRedirect"
    ></v-text-field>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const cardNumber = ref('');
const router = useRouter();

function checkAndRedirect() {
  if (cardNumber.value.trim() !== '') {
    router.push({
      name: 'table',
      params: {
        cardId: cardNumber.value
      }
    });
  }
}
</script>