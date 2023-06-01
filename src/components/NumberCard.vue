<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-center align-center">
      <v-col cols="12" md="3" class="border">
        <v-sheet class="ma-2 pa-2">{{ inputText }}</v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  card: {
    type: String,
    required: false,
  },
});


const inputText = ref("");
const router = useRouter();

onMounted(() => {
  inputText.value = router.currentRoute.value.params.card || "";
});

setTimeout(() => {
  router.push("/");
}, 60000); // 60000 milissegundos = 60 segundos
</script>
