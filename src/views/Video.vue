<template>
  <div class="video-container">
    <video
      class="video"
      autoplay
      loop
      muted
      src="../assets/videos/video-terminal.mp4"
    ></video>
  </div>
  <v-text-field
    v-show="showTextField"
    autofocus
    v-model="cardNumber"
    @keydown.enter="checkAndRedirect"
  ></v-text-field>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const cardNumber = ref("");
const router = useRouter();
const showTextField = false;

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
  position: absolute;
}
</style>
