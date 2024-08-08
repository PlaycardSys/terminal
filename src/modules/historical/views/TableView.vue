<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { msToTime, currencyEncode, integerEncode, } from "../../../helpers/formatter";
import TableCardInfo from "../components/TableCardInfo.vue";
import { getEvents, getPartyInfo, getType, } from "../repositories/historical.repository";
import IdleDetector from "../../../helpers/idle";

const router = useRouter();
const route = useRoute();
const dataSet = ref([]);
const dataSetLoading = ref(false);
const infoList = ref([]);
const returnMsg = ref("");
const messageColor = ref("");

function isTicketsEvent(eventName: string): boolean {
  return (
    eventName.trim() === "Tickets Acumulados" ||
    eventName.trim() === "Tickets Promo"
  );
}

const getCardType = async (card_id: string) => {
  infoList.value = [];
  const card = await getType(card_id);

  if (card.length > 0) {
    infoList.value.push(
      {
        name: "Crédito",
        amount: currencyEncode(card[0].credits),
        icon: "mdi-cash",
      },
      {
        name: "Bônus",
        amount: currencyEncode(card[0].bonus),
        icon: "mdi-cash-multiple",
      },
      {
        name: "CredPromo",
        amount: currencyEncode(card[0].credpromo),
        icon: "mdi-cash-multiple",
      },
      {
        name: "Tickets",
        amount: card[0].tickets.toString(),
        icon: "mdi-ticket",
      }
    );

    return card[0];
  }

  return [];
};

const submitDataCardType = async (card_id: string) => {
  const cardData = await getCardType(card_id);

  if (cardData.length == 0) {
    returnMsg.value = "Cartão não existe !";
    messageColor.value = "error";
  }

  return cardData;
};

const submitDataBlockedCard = async (cardData: { [key: string]: string }) => {
  if (cardData.blocked_at != null && cardData.blocked_at != "") {
    returnMsg.value = "Cartão bloqueado !";
    messageColor.value = "error";
  }
};

const submitDataPlaycard = async (
  cardData: { [key: string]: string | number },
  card_id: string
) => {
  if (cardData.clase == 1) {
    dataSet.value = await getEvents(card_id);
  }
};

const submitDataTimecard = async (
  cardData: { [key: string]: string | number },
  card_id: string
) => {
  if (cardData.clase == 2) {
    const partyInfo = await getPartyInfo(card_id);

    if (partyInfo.length == 0) {
      returnMsg.value = "Cartão não existe !";
      messageColor.value = "warning";
    }

    const dateEndedAt = new Date(partyInfo.ended_at);
    const dateNow = new Date();

    if (!partyInfo.is_started) {
      const timeLeft = msToTime(partyInfo.time * 60000);
      returnMsg.value = `Cartão não utilizado. Você tem ${timeLeft}h para se divertir !`;
      messageColor.value = "warning";
    }

    if (partyInfo.is_started && dateEndedAt < dateNow) {
      returnMsg.value = "Acabou a diversão !";
      messageColor.value = "warning";
    }

    if (partyInfo.is_started && dateEndedAt >= dateNow) {
      let timeLeft: number = dateEndedAt.getTime() - dateNow.getTime();
      returnMsg.value = `Você ainda tem ${msToTime(
        timeLeft
      )}h para se divertir !`;
      messageColor.value = "warning";
    }
  }
};

const idleDetector = new IdleDetector(() => {
  router.push("/historical/home");
}, 10000);

onMounted(async () => {
  let card_id: string = route.params.cardId as string;

  dataSetLoading.value = true;
  returnMsg.value = "";
  dataSet.value = [];

  // Card Type
  const cardData = await submitDataCardType(card_id);

  // Blocked Card
  await submitDataBlockedCard(cardData);

  // Playcard
  await submitDataPlaycard(cardData, card_id);

  //Timecard
  await submitDataTimecard(cardData, card_id);

  dataSetLoading.value = false;

  idleDetector.start();
});
</script>

<template>
  <v-container fluid class="mb-5">
    <!-- Row Info -->
    <v-row v-if="infoList.length > 0">
      <v-col v-for="item in infoList" :key="item.name" cols="12" sm="3">
        <TableCardInfo :key="item.name" :info="item" />
      </v-col>
    </v-row>

    <!-- Row Alert -->
    <v-row v-if="returnMsg !== ''">
      <v-col>
        <VAlert
          :color="messageColor"
          variant="tonal"
          class="text-center text-uppercase font-weight-bold"
        >
          <span>{{ returnMsg }}</span>
        </VAlert>
      </v-col>
    </v-row>

    <!-- Row Table -->
    <v-row v-if="dataSetLoading">
      <v-col>
        <v-skeleton-loader class="mx-auto" type="table" height="83vh" />
      </v-col>
    </v-row>

    <v-row v-if="dataSet.length > 0">
      <v-col>
        <v-card>
          <v-card-text class="bg-brown-lighten-5">
            <v-table fixed-header density="compact">
              <thead>
                <tr>
                  <th id="headerDateTime">Data/Hora</th>
                  <th id="headerCashier">Caixa</th>
                  <th id="headerEvent">Evento</th>
                  <th id="headerAmount">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in dataSet" :key="event.created_at">
                  <td>{{ event.created_at }}</td>
                  <td>{{ event.class }}</td>
                  <td>{{ event.event }}</td>
                  <td>
                    {{ isTicketsEvent(event.event) ? integerEncode(event.amount.toString()) : currencyEncode(event.amount) }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-table__wrapper {
  overflow: hidden !important;
  height: 83vh;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  font-weight: bold;
  color: #3e2723;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > tbody > tr > td {
  color: #795548;
}

p {
  color: #7367f0;
}
</style>
