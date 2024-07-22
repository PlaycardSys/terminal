<script lang="ts" setup>
import SnackBar from './components/SnackBar.vue';
</script>

<template>
  <v-app>
    <SnackBar />
    <router-view />
  </v-app>
</template>

<style>
html {
  overflow: hidden;
}
</style>
