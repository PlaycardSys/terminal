<script setup>
import { useRoute, useRouter } from "vue-router";
import NumberCard from "../components/NumberCard.vue";

const route = useRoute();
</script>

<template>
  <NumberCard :card="route.params.card" />
  <div class="table-container">
    <v-table theme="dark"  class="border-radius"> 
      <thead>
        <tr class="back-color">
          <th class="text-center text-lg-h5 rows-boders">Operação</th>
          <th class="text-center text-lg-h5 rows-boders">Operação</th>
          <th class="text-center text-lg-h5 rows-boders">Operação</th>
          <th class="text-center text-lg-h5 rows-boders">Operação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 8" :key="item.name">
          <td class="rows-boders">{{ item.name }}</td>
          <td class="rows-boders">{{ item.name }}</td>
          <td class="rows-boders">{{ item.name }}</td>
          <td class="rows-boders">{{ item.name }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "Teste",
        },
      ],
    };
  },
};
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
}

.v-table {
  border: 1px solid #e0e0e0;
  background-color:   #313A46 ;
}

.back-color {
background-color: ;
}
.text-center {#F9F9FB
  color:black !important;
}


</style>
