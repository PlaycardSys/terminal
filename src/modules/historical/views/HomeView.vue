<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {formatCardNumber} from '../../../helpers/formatter';
import config from '../../../../public/json/config.json'


const cardNumber = ref(null);
const dataCardFormInput = ref(null);
const router = useRouter();
const imgSrc = ref('');
const videoSrc = ref('');

function checkAndRedirect() {
  if (cardNumber.value.trim() !== '') {
    router.push({
      name: 'historical',
      params: {
        cardId: `>${formatCardNumber(cardNumber.value)}`,
      },
    });
  }
}
onMounted(() => {
  const isDev = process.env.NODE_ENV === 'development';
  
  // let jsonFile =  isDev ? '/json/config.json' : '../../../../json/config.json';
  // jsonFile = JSON.parse(JSON.stringify(config));
  if (config.IS_MOVIE) {
    videoSrc.value = isDev ? '/videos/video.mp4' : `../../../../videos/videos.mp4`;
  } else {
    imgSrc.value = isDev ? '/images/image.png' : `../../../../images/image.png`;
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
        <video v-if="videoSrc" :src="videoSrc"></video>
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
