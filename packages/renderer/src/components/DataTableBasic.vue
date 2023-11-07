<script lang="ts" setup>
import {VDataTable} from 'vuetify/labs/VDataTable';
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['headers', 'dataset', 'loading']);

const resolveStatusVariant = (status: string) => {
  if (status === 'Aberto')
    return {
      color: 'success',
      text: status,
    };
  else if (status === 'Fechado')
    return {
      color: 'error',
      text: status,
    };
  else if (status === 'Suspenso')
    return {
      color: 'warning',
      text: status,
    };
  else if (status === 'Finalizado')
    return {
      color: 'error',
      text: status,
    };
  else
    return {
      color: 'info',
      text: status,
    };
};
</script>
<template>
  <v-card class="mb-5">
    <v-card-text>
      <VDataTable
        :headers="props.headers"
        :items="props.dataset"
        no-data-text="Nenhum dado encontrado"
        density="compact"
      >
        <template #[`item.status`]="{item}">
          <VChip
            :color="resolveStatusVariant(item.raw.status).color"
            variant="outlined"
          >
            {{ resolveStatusVariant(item.raw.status).text }}
          </VChip>
        </template>
      </VDataTable>
    </v-card-text>
  </v-card>
</template>
