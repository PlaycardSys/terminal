<script lang="ts" setup>
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['headers', 'dataset', 'loading']);
</script>
<template>
  <v-card class="mb-5">
    <v-card-text>
      <v-data-table
        :headers="props.headers"
        :items="props.dataset"
        no-data-text="Nenhum dado encontrado"
        density="compact"
      />
    </v-card-text>
  </v-card>
</template>
