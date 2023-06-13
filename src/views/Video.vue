<template>
  <div class="video-container">
    <video
      class="video"
      autoplay
      loop
      muted
      src="../videos/video-terminal.mp4"
    ></video>
  </div>
  <v-container>
    <v-text-field
      v-if="showTextField"
      autofocus
      v-model="cardNumber"
      @keydown.enter="checkAndRedirect"
    ></v-text-field>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const cardNumber = ref("");
const router = useRouter();
const showTextField = ref(true);

function checkAndRedirect() {
  if (cardNumber.value.trim() !== "") {
    router.push({
      name: "table",
      params: {
        cardId: cardNumber.value,
      },
    });
  }
}
</script>

<style>
.video-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
