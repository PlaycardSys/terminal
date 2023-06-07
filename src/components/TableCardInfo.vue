<template>
  <v-card>
      <v-card-title>
        {{ info.name }}
      </v-card-title>
      <v-card-text>
        {{ info.amount }}
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  info: Object
})
</script>