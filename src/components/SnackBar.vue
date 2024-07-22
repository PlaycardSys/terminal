<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useSnackbarStore} from '../stores/components/snackbar.store';

const snackbarStore = useSnackbarStore();
const {snackbar, isVisible} = storeToRefs(snackbarStore);
</script>
<template>
  <VSnackbar
    v-model="isVisible"
    location="top"
    :timeout="2000"
    variant="flat"
    transition="scale-transition"
    :color="snackbar.type"
  >
    <span class="text-center">{{ snackbar.message }}</span>

    <template #actions>
      <VBtn @click="snackbarStore.clear()"> x </VBtn>
    </template>
  </VSnackbar>
</template>
