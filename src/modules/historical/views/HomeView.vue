<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {formatCardNumber, convert8h10dTo10h} from '../../../helpers/formatter';

const cardNumber = ref(null);
const dataCardFormInput = ref(null);
const router = useRouter();
const imgSrc = ref('');
const videoSrc = ref('');

const transformedCardNumber = computed(async () => {
  const config = await window.config.loadConfig();

  if (config.TYPE_READER == '8h10d') {
    return convert8h10dTo10h(cardNumber.value);
  }

  return cardNumber.value ? formatCardNumber(cardNumber.value) : '';
});

async function checkAndRedirect() {
  if (cardNumber.value.trim() !== '') {
    const transformedValue = await transformedCardNumber.value;
    router.push({
      name: 'historical',
      params: {
        cardId: `>${transformedValue}`,
      },
    });
  }
}
onMounted(async () => {
  
  const config = await window.config.loadConfig();

  if (config.IS_MOVIE) {
    videoSrc.value = await window.electron.getResourcePath('videos/video.mp4')
  } else {
    imgSrc.value = await window.electron.getResourcePath('images/image.png');
  }

  dataCardFormInput.value.focus();
});
</script>
<template>
  <v-container
    class="wrapper"
    fluid
  >
    <v-row no-gutters>
      <v-col class="d-flex justify-center">
        <img v-if="imgSrc" :src="imgSrc" alt="idle" />

        <video 
          v-if="videoSrc"
          no-controls 
          autoplay 
          muted 
          loop 
          class="videoPlayer"
          description="VideoPlayer"
          aria-labelledby="VideoPlayer"
        >
          <source 
            :src="videoSrc"
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
    img {
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
