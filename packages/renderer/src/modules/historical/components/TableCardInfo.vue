<template>
  <VCard>
    <VCardText class="d-flex align-center justify-space-between">
      <div>
        <div class="d-flex align-center flex-wrap">
          <span class="text-h5">{{ info.amount }}</span>
        </div>
        <span class="text-body-2">{{ info.name }}</span>
      </div>
      <v-avatar
        color="success"
        variant="tonal"
        size="42"
        class="text-right"
      >
        <v-icon
          icon="mdi-cash"
          size="32"
        ></v-icon>
      </v-avatar>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
defineProps({
  info: {
    type: Object,
    required: true,
  },
});
</script>
