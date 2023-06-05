<script setup>
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";

const greetMsg = ref("");
const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("event_get_by_id", { card: name.value });

  const json_respose =
    '[{"created_at":"26/05/2023 14:00:37","card_id":123,"class":"Multi Cash","event":"Consumo Créditos","amount":"12.00"},{"created_at":"26/05/2023 14:00:23","card_id":123,"class":"Carrossel","event":"Consumo Créditos","amount":"0.00"},{"created_at":"26/05/2023 14:00:06","card_id":123,"class":"Carrossel","event":"Consumo Bônus","amount":"10.00"},{"created_at":"26/05/2023 13:59:46","card_id":123,"class":"Multi Cash","event":"Consumo Créditos","amount":"12.00"},{"created_at":"25/05/2023 13:59:23","card_id":123,"class":"Multi Cash","event":"Consumo Créditos","amount":"12.00"},{"created_at":"24/05/2023 13:59:10","card_id":123,"class":"Carrossel","event":"Consumo Créditos","amount":"0.00"},{"created_at":"24/05/2023 13:58:47","card_id":123,"class":"Carrossel","event":"Consumo Bônus","amount":"10.00"},{"created_at":"24/05/2023 13:58:29","card_id":123,"class":"Caixa 01","event":"Carga Bônus","amount":"100.00"},{"created_at":"24/05/2023 13:58:10","card_id":123,"class":"Caixa 01","event":"Carga Créditos","amount":"100.00"},{"created_at":"24/05/2023 13:57:53","card_id":123,"class":"Caixa 01","event":"Venda Cartão","amount":"5.00"}]';
  const json = JSON.parse(json_respose);
  console.log(json);
}
</script>

<template>
  <div class="card">
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="button" @click="greet()">Consultar cartão</button>
  </div>

  <p>{{ greetMsg }}</p>
</template>
