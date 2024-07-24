<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {formatCardNumber} from '../../../helpers/formatter';

const cardNumber = ref(null);
const dataCardFormInput = ref(null);
const router = useRouter();
const imgSrc = ref('');

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

  imgSrc.value = isDev ? '/images/display_idle_1.png' : `../../../../images/display_idle_1.png`;
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
        <img :src="imgSrc" alt="idle" />
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
