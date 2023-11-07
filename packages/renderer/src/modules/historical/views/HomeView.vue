<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {formatCardNumber} from '/@/helpers/formatter';

const cardNumber = ref(null);
const dataCardFormInput = ref(null);
const router = useRouter();

function checkAndRedirect() {
  if (cardNumber.value.trim() !== '') {
    router.push({
      name: 'historicalTableView',
      params: {
        cardId: formatCardNumber(cardNumber.value),
      },
    });
  }
}
onMounted(() => {
  dataCardFormInput.value.focus();
});
</script>
<template>
  <v-container
    class="wrapper"
    fluid
  >
    <v-row no-gutters>
      <v-col>
        <video 
          no-controls 
          autoplay 
          muted 
          loop 
          class="videoPlayer"
          description="VideoPlayer"
          aria-labelledby="VideoPlayer"
        >
          <source 
            src="../../../../assets/videos/video-terminal.mp4" 
            type="video/mp4"
          >
        </video>
        <v-text-field
          ref="dataCardFormInput"
          v-model="cardNumber"
          hide-details
          @keydown.enter="checkAndRedirect"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.v-container {
  &.wrapper {
    padding: 0;
    height: 100vh;
    .videoPlayer {
      height: 100vh;
      width: auto;
      display: block;
    }
  }
}
.v-input {
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
}
</style>
