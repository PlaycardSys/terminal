<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="item in infoList">
        <TableCardInfo :info="item" :key="item.name" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">

 
    <v-card v-if="returnMsg !== ''" class="d-flex align-center" height="710">
      <v-card-text class="text-center">{{ returnMsg }}</v-card-text>
    </v-card>


        <v-card v-if="events.length > 0">
          <v-card-text>
            <v-table fixed-header :height="viewportHeight" density="compact">
              <thead>
                <tr>
                  <th class="text-center">Data/Hora</th>
                  <th class="text-center">Playcard</th>
                  <th class="text-center">Operação</th>
                  <th class="text-center">Tipo</th>
                  <th class="text-center">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in events" :key="event.created_at">
                  <td>{{ event.created_at }}</td>
                  <td>{{ event.card_id }}</td>
                  <td>{{ event.class }}</td>
                  <td>{{ event.event }}</td>
                  <td>{{ event.amount }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import TableCardInfo from "../components/TableCardInfo.vue";

const router = useRouter();
const route = useRoute();

const events = ref([]);
const infoList = ref([]);
const returnMsg = ref("");
const viewportHeight = ref(0);

const updateViewportHeight = () => {
  const headerHeight = document.querySelector(
    "#app > div > div > div > div:nth-child(1)"
  ).offsetHeight;
  const viewHeight = window.innerHeight;

  viewportHeight.value = viewHeight - (headerHeight + 64);
};

window.addEventListener("resize", updateViewportHeight);

async function getCardType(cardId) {
  const response = await invoke("card_get_by_id", { card: cardId });
  const card = await JSON.parse(response);

  if (card.length > 0) {
    infoList.value.push(
      { name: "Crédito", amount: card[0].credits },
      { name: "Bônus", amount: card[0].bonus },
      { name: "CredPromo", amount: card[0].credpromo },
      { name: "Tickets", amount: card[0].tickets }
    );

    return card[0];
  }

  return [];
}

async function getEvents(cardId) {
  return await invoke("event_get_by_id", { card: cardId });
}

async function getPartyInfo(cardId) {
  const response = await invoke("timecard_get_by_id", { card: cardId });
  const party = await JSON.parse(response);

  if (party.length > 0) {
    return party[0];
  }

  return [];
}

function msToTime(duration) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes;
}

onMounted(async () => {
  const cardId = route.params.cardId;
  console.log(cardId);

  // Card Type
  const cardData = await getCardType(cardId);
  if (cardData.length == 0) {
    await router.push({
      name: "not-found",
    });
  }

  if (cardData.blocked_at != null && cardData.blocked_at != "") {
    returnMsg.value = `Cartão bloqueado !`;
  }

  // Playcard
  if (cardData.type_card == 1) {
    const cardEvents = await getEvents(cardId);
    events.value = JSON.parse(cardEvents);
    updateViewportHeight();
  }

  //Timecard
  if (cardData.type_card == 2) {
    const partyInfo = await getPartyInfo(cardId);

    if (partyInfo.length == 0) {
      await router.push({
        name: "not-found",
      });
    }

    const dateEndedAt = new Date(partyInfo.ended_at);
    const dateNow = new Date();

    if (!partyInfo.is_started) {
      const timeLeft = msToTime(partyInfo.time * 60000);
      returnMsg.value = `Cartão não utilizado. Você tem ${timeLeft}h para se divertir !`;
    }

    if (partyInfo.is_started && dateEndedAt < dateNow) {
      returnMsg.value = `Acabou a diversão !`;
    }

    if (partyInfo.is_started && dateEndedAt >= dateNow) {
      const timeLeft = msToTime(dateEndedAt - dateNow);
      returnMsg.value = `Você ainda tem ${timeLeft}h para se divertir !`;
    }
  }
});

setTimeout(() => {
  router.push("/");
}, 8000);
</script>

<style>
.v-table--fixed-height > .v-table__wrapper {
  overflow: hidden !important;
}
</style>
