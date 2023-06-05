<template>
  <div class="table-container">
    <div class="v-responsive">
      <v-table theme="dark" class="border-radius">
        <thead>
          <tr class="back-color">
            <th class="text-center text-lg-h5 rows-boders">Data/Hora</th>
            <th class="text-center text-lg-h5 rows-boders">Playcard</th>
            <th class="text-center text-lg-h5 rows-boders">Operação</th>
            <th class="text-center text-lg-h5 rows-boders">Tipo</th>
            <th class="text-center text-lg-h5 rows-boders">Valor</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="item in jsonData" :key="item.created_at">
            <td class="rows-boders">{{ item.created_at }}</td>
            <td class="rows-boders">{{ item.card_id }}</td>
            <td class="rows-boders">{{ item.class }}</td>
            <td class="rows-boders">{{ item.event }}</td>
            <td class="rows-boders">{{ item.amount }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import NumberCard from '../components/NumberCard.vue';
import { ref } from 'vue';

const route = useRoute();
const jsonData = ref([]);

const json_response =
  '[{"created_at":"26/05/2023 14:00:37","card_id":123,"class":"Multi Cash","event":"Consumo Créditos","amount":"12.00"},{"created_at":"26/05/2023 14:00:23","card_id":123,"class":"Carrossel","event":"Consumo Créditos","amount":"0.00"},{"created_at":"26/05/2023 14:00:06","card_id":123,"class":"Carrossel","event":"Consumo Bônus","amount":"10.00"},{"created_at":"26/05/2023 13:59:46","card_id":123,"class":"Multi Cash","event":"Consumo Créditos","amount":"12.00"},{"created_at":"25/05/2023 13:59:23","card_id":123,"class":"Multi Cash","event":"Consumo Créditos","amount":"12.00"},{"created_at":"24/05/2023 13:59:10","card_id":123,"class":"Carrossel","event":"Consumo Créditos","amount":"0.00"},{"created_at":"24/05/2023 13:58:47","card_id":123,"class":"Carrossel","event":"Consumo Bônus","amount":"10.00"},{"created_at":"24/05/2023 13:58:29","card_id":123,"class":"Caixa 01","event":"Carga Bônus","amount":"100.00"},{"created_at":"24/05/2023 13:58:10","card_id":123,"class":"Caixa 01","event":"Carga Créditos","amount":"100.00"},{"created_at":"24/05/2023 13:57:53","card_id":123,"class":"Caixa 01","event":"Venda Cartão","amount":"5.00"}]';

jsonData.value = JSON.parse(json_response);
</script>

<style scoped>
.border-radius {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.rows-boders {
  border: 1px solid #e0e0e0;
  text-align: center;
}

.v-table {
  border: 1px solid #e0e0e0;
  background-color:   #313A46 ;
}

.back-color {
background-color:#F9F9FB ;
}
.text-center {
  color: #000 !important;
}
</style>