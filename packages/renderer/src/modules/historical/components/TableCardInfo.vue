<template>
  <VCard>
    <VCardText class="d-flex align-center justify-space-between bg-brown-lighten-5">
      <div>
        <div class="d-flex align-center flex-wrap">
          <span class="text-h5 font-weight-bold text-brown-darken-4">{{ info.amount }}</span>
        </div>
        <span class="text-body-2 text-brown-darken-1">{{ info.name }}</span>
      </div>
      <v-avatar
        color="bg-brown"
        variant="tonal"
        size="42"
        class="text-right"
      >
        <v-icon
          :icon="info.icon"
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
